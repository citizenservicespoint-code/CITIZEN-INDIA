/**
 * CITIZEN SERVICES POINT (CITIZEN INDIA)
 * SECURE GOOGLE APPS SCRIPT STATUS LOOKUP BACKEND (Code.gs)
 *
 * SECURITY ARCHITECTURE:
 * 1. Authenticates server-to-server requests from the Netlify Function proxy using
 *    HMAC-SHA256 over (ts + ":" + nonce + ":" + lookupType + ":" + query) with
 *    APPS_SCRIPT_SHARED_SECRET stored in Script Properties.
 *    Does NOT rely on HTTP headers (which Google Apps Script strips from `e`).
 * 2. Enforces global atomic single-use nonce replay protection and global rate limiting
 *    using CacheService.getScriptCache() and LockService.getScriptLock() across all
 *    stateless Netlify Function instances.
 * 3. Supports exact matching on Official Application Number / Govt. Reference No. OR
 *    10-digit Indian Registered Mobile Number.
 * 4. Rejects ambiguous mobile matches (when >1 application shares a mobile number)
 *    with `errorCode: "mobile_ambiguous"` and zero personal data.
 * 5. Redacts sensitive PII (Applicant Name, Application ID, Govt. Ref. No., Full Address,
 *    and Mobile No.) when searched by Mobile Number alone.
 * 6. Never logs citizen queries, mobile numbers, or status results.
 *
 * DEPLOYMENT STEPS (ONLY AFTER YOU REVIEW AND APPROVE):
 * 1. Open your Application Status Google Sheet -> Extensions -> Apps Script.
 * 2. Go to Project Settings (gear icon) -> Script Properties -> Add script property:
 *    - Property: APPS_SCRIPT_SHARED_SECRET
 *    - Value: (Same 64-character hex secret set in Netlify Environment Variables)
 * 3. Paste this code into Code.gs and click Save.
 * 4. Click Deploy -> New deployment -> Web app:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the new Web App URL into Netlify Environment Variable `APPS_SCRIPT_STATUS_URL`
 *    and set `APPS_SCRIPT_ENFORCE_STRICT_POST="true"`.
 */

var MAX_REQUESTS_PER_MINUTE = 60;
var TIMESTAMP_TOLERANCE_MS = 60000; // 60 seconds

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function computeHmacHex(message, secret) {
  var rawSig = Utilities.computeHmacSha256Signature(
    String(message),
    String(secret),
    Utilities.Charset.UTF_8
  );
  var hex = "";
  for (var i = 0; i < rawSig.length; i++) {
    var b = rawSig[i];
    if (b < 0) b += 256;
    var h = b.toString(16);
    if (h.length === 1) h = "0" + h;
    hex += h;
  }
  return hex;
}

function constantTimeEqual(a, b) {
  var strA = String(a || "");
  var strB = String(b || "");
  if (!strA || !strB || strA.length !== strB.length) return false;
  var diff = 0;
  for (var i = 0; i < strA.length; i++) {
    diff |= strA.charCodeAt(i) ^ strB.charCodeAt(i);
  }
  return diff === 0;
}

function normalizeId(str) {
  return String(str || "").trim().toUpperCase().replace(/[\s\-_/.]/g, "");
}

function normalizeMob(str) {
  var digits = String(str || "").replace(/\D/g, "");
  return digits.length >= 10 ? digits.slice(-10) : digits;
}

function maskName(name) {
  var clean = String(name || "").trim();
  if (!clean || clean === "N/A") return "Protected";
  var parts = clean.split(/\s+/);
  var masked = [];
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];
    if (p.length <= 1) {
      masked.push("*");
    } else {
      var stars = "";
      var count = Math.min(4, p.length - 1);
      for (var j = 0; j < count; j++) stars += "*";
      masked.push(p.charAt(0) + stars);
    }
  }
  return masked.join(" ");
}

function maskAppId(appId) {
  var clean = String(appId || "").trim();
  if (!clean || clean === "N/A") return "Protected";
  var parts = clean.split("-");
  if (parts.length === 3) {
    return parts[0] + "-****-" + parts[2];
  }
  if (clean.length > 6) {
    return clean.slice(0, 3) + "****" + clean.slice(-3);
  }
  return "Protected";
}

function handleVerifiedLookup(params) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
    return jsonOut({
      success: false,
      status_code: 503,
      errorCode: "server_busy",
      message: "Service is temporarily busy. Please try again shortly."
    });
  }

  try {
    var cache = CacheService.getScriptCache();
    var now = new Date().getTime();

    // 1. Global per-minute rate limit across all Netlify Function instances
    var minuteBucket = "rl_" + Math.floor(now / 60000);
    var currentCount = parseInt(cache.get(minuteBucket) || "0", 10);
    if (currentCount >= MAX_REQUESTS_PER_MINUTE) {
      return jsonOut({
        success: false,
        status_code: 429,
        errorCode: "rate_limited",
        message: "Too many status requests. Please wait a moment and try again."
      });
    }
    cache.put(minuteBucket, String(currentCount + 1), 90);

    // 2. Verify HMAC-SHA256 signature & nonce replay if APPS_SCRIPT_SHARED_SECRET is configured
    var props = PropertiesService.getScriptProperties();
    var sharedSecret = props.getProperty("APPS_SCRIPT_SHARED_SECRET");

    var rawQuery = String(params.query || params.appId || params.appNo || params.applicationNo || "").trim().toUpperCase();
    var lookupType = String(params.lookupType || "").trim();
    if (!lookupType) {
      var digitsOnly = rawQuery.replace(/[\s\-+()]/g, "");
      lookupType = /^(?:91|0)?[6-9]\d{9}$/.test(digitsOnly) ? "mobile_number" : "application_number";
    }

    if (sharedSecret) {
      var ts = String(params.ts || "");
      var nonce = String(params.nonce || "");
      var sig = String(params.sig || "");
      var tsNum = Number(ts);

      if (!ts || isNaN(tsNum) || Math.abs(now - tsNum) > TIMESTAMP_TOLERANCE_MS) {
        return jsonOut({
          success: false,
          status_code: 401,
          errorCode: "unauthorized",
          message: "Unauthorized or expired request signature."
        });
      }

      if (!nonce || nonce.length < 8 || cache.get("nonce_" + nonce)) {
        return jsonOut({
          success: false,
          status_code: 403,
          errorCode: "captcha_expired",
          message: "Security token has already been used."
        });
      }

      var expectedSig = computeHmacHex(ts + ":" + nonce + ":" + lookupType + ":" + rawQuery, sharedSecret);
      if (!constantTimeEqual(expectedSig, sig)) {
        return jsonOut({
          success: false,
          status_code: 401,
          errorCode: "unauthorized",
          message: "Unauthorized request."
        });
      }

      // Mark nonce as consumed globally for 120 seconds
      cache.put("nonce_" + nonce, "1", 120);
    }

    if (!rawQuery || rawQuery.length < 4 || rawQuery.length > 32) {
      return jsonOut({
        success: false,
        status_code: 400,
        errorCode: "invalid_query_format",
        message: "Invalid query format."
      });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var data = sheet.getDataRange().getDisplayValues();
    if (!data || data.length < 2) {
      return jsonOut({
        success: false,
        status_code: 404,
        message: "No matching record found for the provided ID."
      });
    }

    var headers = data[0];
    var targetIdNorm = normalizeId(rawQuery);
    var targetMobNorm = normalizeMob(rawQuery);
    var matchedObjects = [];

    for (var r = 1; r < data.length; r++) {
      var row = data[r];
      var rowObj = {};
      for (var c = 0; c < headers.length; c++) {
        var key = String(headers[c] || ("col_" + c)).trim();
        rowObj[key] = String(row[c] || "").trim();
      }

      var rowAppId = rowObj["Application ID"] || rowObj["Application No"] || rowObj["Application Number"] || row[0] || "";
      var rowGovtRef = rowObj["Govt. Reference No."] || rowObj["Govt Reference No"] || row[1] || "";
      var rowMobile = rowObj["Mobile No."] || rowObj["Mobile No"] || rowObj["Mobile Number"] || row[3] || "";

      if (lookupType === "application_number") {
        if (
          (rowAppId && normalizeId(rowAppId) === targetIdNorm) ||
          (rowGovtRef && normalizeId(rowGovtRef) === targetIdNorm)
        ) {
          matchedObjects.push(rowObj);
          break;
        }
      } else if (lookupType === "mobile_number") {
        if (rowMobile && normalizeMob(rowMobile) === targetMobNorm && targetMobNorm.length === 10) {
          matchedObjects.push(rowObj);
        }
      }
    }

    if (lookupType === "mobile_number" && matchedObjects.length > 1) {
      return jsonOut({
        success: false,
        status_code: 409,
        errorCode: "mobile_ambiguous",
        message: "Multiple applications are registered with this mobile number. Please search using your specific Official Application Number."
      });
    }

    if (matchedObjects.length === 0) {
      return jsonOut({
        success: false,
        status_code: 404,
        message: "No matching record found for the provided ID."
      });
    }

    var match = matchedObjects[0];
    var isMobLookup = (lookupType === "mobile_number");
    var rawAppIdOut = match["Application ID"] || match["Application No"] || match["Application Number"] || "";
    var rawRefOut = match["Govt. Reference No."] || match["Govt Reference No"] || "N/A";
    var rawNameOut = match["Applicant Name"] || match["Applicant's Name"] || "N/A";
    var rawMobOut = normalizeMob(match["Mobile No."] || match["Mobile No"] || "");
    var maskedMobOut = rawMobOut.length >= 4 ? ("******" + rawMobOut.slice(-4)) : "N/A";
    var rawAddrOut = match["Full Address"] || match["Address"] || "N/A";
    var rawSchemeOut = match["Scheme / Service Name"] || match["Scheme/Service Name"] || match["Scheme Name"] || "N/A";
    var rawDateOut = match["Application Date"] || match["Date"] || "N/A";
    var rawStatusOut = match["Application Status"] || match["Status"] || "Pending";
    var rawRemarksOut = match["Remarks"] || match["Remark"] || "";

    return jsonOut({
      success: true,
      data: {
        "Application ID": isMobLookup ? maskAppId(rawAppIdOut) : rawAppIdOut,
        "Govt. Reference No.": isMobLookup ? "Protected (Enter Official Application Number to view)" : rawRefOut,
        "Applicant Name": isMobLookup ? maskName(rawNameOut) : rawNameOut,
        "Mobile No.": maskedMobOut,
        "Full Address": isMobLookup ? "Protected (Enter Official Application Number to view full address)" : rawAddrOut,
        "Scheme / Service Name": rawSchemeOut,
        "Application Date": rawDateOut,
        "Application Status": rawStatusOut,
        "Remarks": rawRemarksOut
      }
    });
  } catch (err) {
    return jsonOut({
      success: false,
      status_code: 500,
      errorCode: "server_error",
      message: "Unable to process status lookup."
    });
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    var body = JSON.parse(raw);
    if (body && body.action === "status_check") {
      return handleVerifiedLookup(body);
    }
    return jsonOut({
      success: false,
      status_code: 400,
      error: "Unsupported action."
    });
  } catch (err) {
    return jsonOut({
      success: false,
      status_code: 400,
      error: "Invalid request payload."
    });
  }
}

function doGet(e) {
  var props = PropertiesService.getScriptProperties();
  var enforceStrictPost = String(props.getProperty("APPS_SCRIPT_ENFORCE_STRICT_POST") || "").toLowerCase() === "true";
  if (enforceStrictPost) {
    return jsonOut({
      success: false,
      status_code: 405,
      errorCode: "method_not_allowed",
      message: "Direct GET status lookups are disabled. Please use the official portal."
    });
  }
  var params = (e && e.parameter) ? e.parameter : {};
  return handleVerifiedLookup(params);
}
