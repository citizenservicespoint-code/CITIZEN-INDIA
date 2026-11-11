/**
 * CITIZEN SERVICES POINT (CITIZEN INDIA)
 * SWACHHTAR POTHE — CITIZEN PLEDGE CARD SECURE GOOGLE APPS SCRIPT BACKEND (Code.gs)
 * Active Deployed Web App URL:
 * https://script.google.com/macros/s/AKfycbzqkfXXHV2ZIRBOtFIdTwnxP0QhNVrDFIbe6DnRI9qG3u9QHY-2nCudupKr4W8ahdQ7dw/exec
 *
 * ============================================================================
 * STRICT DATABASE PRESERVATION & SECURITY ARCHITECTURE
 * ============================================================================
 * 1. EXISTING DATABASE PRESERVATION (100% NON-DESTRUCTIVE):
 *    - Connects ONLY to your existing Google Sheets Database and existing Sheet Tab.
 *    - NEVER creates a new Spreadsheet (`SpreadsheetApp.create` is forbidden).
 *    - NEVER creates a new Sheet Tab (`insertSheet` is forbidden).
 *    - NEVER modifies, overwrites, or reformats existing Column Headers (Row 1),
 *      existing rows, or cell formatting.
 *    - Dynamically inspects Row 1 Column Headers of your existing sheet so records
 *      are read from and appended into your exact existing column structure.
 *
 * 2. DUAL-LAYER SERVER-TO-SERVER SECURITY & ABUSE PROTECTION:
 *    - Authenticates requests from the Netlify Server-Side Proxy (`/api/pledge-card`)
 *      using HMAC-SHA256 over `ts + ":" + nonce + ":" + action + ":" + canonicalTarget`
 *      when `APPS_SCRIPT_PLEDGE_SECRET` (or `APPS_SCRIPT_SHARED_SECRET`) is set in
 *      Script Properties, blocking direct unauthorized requests to the public URL.
 *    - Enforces global per-action rate limiting (including strict throttling on
 *      `verifyByDetails` and `createCard`) and single-use `nonce` replay protection
 *      using `CacheService.getScriptCache()`.
 *
 * 3. ATOMIC DUPLICATE MOBILE & UNIQUE ID PROTECTION:
 *    - Uses `LockService.getScriptLock()` (`tryLock(10000)`) so concurrent submissions
 *      can never register the same 10-digit mobile number twice (`DUPLICATE_MOBILE`)
 *      or generate colliding `CITIZEN-XXXXXXXX` IDs.
 *
 * 4. STRICT PII REDACTION:
 *    - Never returns `guardianName`, `dateOfBirth`, or full `mobileNumber` in any
 *      API response. Returns only `uniqueCitizenId`, `fullName`, `gender`,
 *      `mobileLast4` (`XXXXXX1234`), `state`, `district`, and `status: "ACTIVE"`.
 *
 * ============================================================================
 * HOW TO CONNECT YOUR EXISTING GOOGLE SHEET (FIXES DATABASE_ERROR / COUNTER_ERROR):
 * ============================================================================
 * Option A (Recommended — via Script Properties):
 *   1. In your Google Apps Script project, click Project Settings (Gear Icon ⚙️).
 *   2. Scroll to "Script Properties" -> Click "Add script property":
 *      - Property: `SPREADSHEET_ID`
 *        Value: (Paste the Spreadsheet ID from your existing Google Sheet URL:
 *                `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit`)
 *      - Property: `SHEET_NAME` (Optional — leave blank to use the first existing tab,
 *        or enter your exact existing tab name).
 *      - Property: `APPS_SCRIPT_PLEDGE_SECRET` (Optional but recommended — paste the
 *        same 64-char secret configured in Netlify `APPS_SCRIPT_PLEDGE_SECRET`).
 *
 * Option B (If this script is bound directly inside your Google Sheet via Extensions -> Apps Script):
 *   - `SpreadsheetApp.getActiveSpreadsheet()` will automatically use your bound Sheet.
 */

var TIMESTAMP_TOLERANCE_MS = 60000; // 60 seconds window for signed proxy requests
var RATE_LIMITS_PER_MINUTE = {
  getPledgeCount: 60,
  createCard: 15,
  verifyById: 30,
  verifyByDetails: 15
};

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function computeHmacSha256Hex(message, secret) {
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

function constantTimeEquals(a, b) {
  var strA = String(a || "");
  var strB = String(b || "");
  if (!strA || !strB || strA.length !== strB.length) return false;
  var diff = 0;
  for (var i = 0; i < strA.length; i++) {
    diff |= strA.charCodeAt(i) ^ strB.charCodeAt(i);
  }
  return diff === 0;
}

function sanitizeText(val, maxLen) {
  var s = String(val || "")
    .trim()
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "");
  // Prevent formula injection (=, +, -, @)
  s = s.replace(/^[=+\-@]+/, "").trim();
  return maxLen ? s.slice(0, maxLen) : s;
}

function normalizeTenDigitMobile(val) {
  var digits = String(val || "").replace(/\D/g, "");
  return digits.length >= 10 ? digits.slice(-10) : digits;
}

function maskMobileLast4(val) {
  var digits = normalizeTenDigitMobile(val);
  if (digits.length >= 4) {
    return "XXXXXX" + digits.slice(-4);
  }
  return "XXXXXX••••";
}

/**
 * Opens ONLY the existing Google Spreadsheet and existing Sheet Tab.
 * Never creates a new Spreadsheet or new Sheet Tab.
 */
function openExistingPledgeSheet() {
  var props = PropertiesService.getScriptProperties();
  var spreadsheetId = String(
    props.getProperty("SPREADSHEET_ID") ||
    props.getProperty("PLEDGE_SPREADSHEET_ID") ||
    ""
  ).trim();
  var sheetName = String(
    props.getProperty("SHEET_NAME") ||
    props.getProperty("PLEDGE_SHEET_NAME") ||
    ""
  ).trim();

  var ss = null;
  if (spreadsheetId) {
    ss = SpreadsheetApp.openById(spreadsheetId);
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!ss) {
    throw new Error("EXISTING_SPREADSHEET_NOT_LINKED");
  }

  var sheet = null;
  if (sheetName) {
    sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      throw new Error("EXISTING_SHEET_TAB_NOT_FOUND");
    }
  } else {
    var sheets = ss.getSheets();
    if (!sheets || sheets.length === 0) {
      throw new Error("NO_EXISTING_SHEET_TAB");
    }
    sheet = sheets[0];
  }

  return sheet;
}

/**
 * Dynamically maps existing Row 1 headers without modifying them.
 * Supports any column order in the existing Google Sheet.
 */
function resolveColumnMap(headers) {
  var map = {
    citizenId: -1,
    fullName: -1,
    guardianName: -1,
    gender: -1,
    dateOfBirth: -1,
    state: -1,
    district: -1,
    mobileNumber: -1,
    status: -1,
    timestamp: -1,
    declaration: -1
  };

  for (var i = 0; i < headers.length; i++) {
    var h = String(headers[i] || "").trim().toLowerCase();
    if (!h) continue;

    if (map.citizenId === -1 && (h.indexOf("citizen") !== -1 || h === "id" || h.indexOf("card id") !== -1 || h.indexOf("unique") !== -1)) {
      map.citizenId = i;
    } else if (map.fullName === -1 && (h === "full name" || h === "fullname" || h === "name" || h === "applicant name" || h === "citizen name")) {
      map.fullName = i;
    } else if (map.guardianName === -1 && (h.indexOf("guardian") !== -1 || h.indexOf("father") !== -1 || h.indexOf("parent") !== -1)) {
      map.guardianName = i;
    } else if (map.gender === -1 && (h.indexOf("gender") !== -1 || h.indexOf("sex") !== -1)) {
      map.gender = i;
    } else if (map.dateOfBirth === -1 && (h.indexOf("birth") !== -1 || h === "dob" || h.indexOf("d.o.b") !== -1)) {
      map.dateOfBirth = i;
    } else if (map.state === -1 && h.indexOf("state") !== -1) {
      map.state = i;
    } else if (map.district === -1 && h.indexOf("district") !== -1) {
      map.district = i;
    } else if (map.mobileNumber === -1 && (h.indexOf("mobile") !== -1 || h.indexOf("phone") !== -1 || h.indexOf("contact") !== -1)) {
      map.mobileNumber = i;
    } else if (map.status === -1 && h.indexOf("status") !== -1) {
      map.status = i;
    } else if (map.timestamp === -1 && (h.indexOf("time") !== -1 || h.indexOf("created") !== -1 || h.indexOf("date") !== -1)) {
      map.timestamp = i;
    } else if (map.declaration === -1 && (h.indexOf("declar") !== -1 || h.indexOf("pledge") !== -1 || h.indexOf("consent") !== -1)) {
      map.declaration = i;
    }
  }

  return map;
}

/**
 * Extracts a normalized internal record from an existing sheet row.
 */
function parseRowRecord(row, colMap) {
  function pick(idx, fallbackIdx) {
    var target = idx >= 0 ? idx : fallbackIdx;
    return target >= 0 && target < row.length ? String(row[target] || "").trim() : "";
  }

  // Fallback positional indices if a column header uses custom wording
  var rawCitizenId = pick(colMap.citizenId, 0);
  var rawFullName = pick(colMap.fullName, 1);
  var rawGender = pick(colMap.gender, 3);
  var rawState = pick(colMap.state, 5);
  var rawDistrict = pick(colMap.district, 6);
  var rawMobile = pick(colMap.mobileNumber, 7);

  // Also scan row cells for CITIZEN-XXXXXXXX or 10-digit mobile if headers were custom
  if (!/^CITIZEN-\d{8}$/i.test(rawCitizenId)) {
    for (var c = 0; c < row.length; c++) {
      var cellVal = String(row[c] || "").trim().toUpperCase();
      if (/^CITIZEN-\d{8}$/.test(cellVal)) {
        rawCitizenId = cellVal;
        break;
      }
    }
  }

  var normMob = normalizeTenDigitMobile(rawMobile);
  if (!/^[6-9]\d{9}$/.test(normMob)) {
    for (var m = 0; m < row.length; m++) {
      var candidateMob = normalizeTenDigitMobile(row[m]);
      if (/^[6-9]\d{9}$/.test(candidateMob) && String(row[m]).replace(/\D/g, "").length <= 12) {
        normMob = candidateMob;
        break;
      }
    }
  }

  return {
    uniqueCitizenId: rawCitizenId.toUpperCase(),
    fullName: rawFullName,
    gender: rawGender || "Other",
    state: rawState,
    district: rawDistrict,
    mobileNumber: normMob
  };
}

/**
 * Verifies optional HMAC-SHA256 proxy signature and enforces per-action rate limits.
 */
function verifyProxySecurityAndRateLimit(body, action, canonicalTarget) {
  var cache = CacheService.getScriptCache();
  var now = new Date().getTime();

  // 1. Per-action rate limit
  var maxPerMin = RATE_LIMITS_PER_MINUTE[action] || 20;
  var bucketKey = "pledge_rl_" + action + "_" + Math.floor(now / 60000);
  var count = parseInt(cache.get(bucketKey) || "0", 10);
  if (count >= maxPerMin) {
    return {
      ok: false,
      response: jsonResponse({
        success: false,
        code: "RATE_LIMITED",
        message: "Too many requests. Please wait a minute and try again."
      })
    };
  }
  cache.put(bucketKey, String(count + 1), 90);

  // 2. Verify HMAC-SHA256 signature if APPS_SCRIPT_PLEDGE_SECRET or APPS_SCRIPT_SHARED_SECRET is set
  var props = PropertiesService.getScriptProperties();
  var sharedSecret = String(
    props.getProperty("APPS_SCRIPT_PLEDGE_SECRET") ||
    props.getProperty("APPS_SCRIPT_SHARED_SECRET") ||
    ""
  ).trim();

  if (sharedSecret) {
    var ts = String(body.ts || "");
    var nonce = String(body.nonce || "");
    var sig = String(body.sig || "");
    var tsNum = Number(ts);

    if (!ts || isNaN(tsNum) || Math.abs(now - tsNum) > TIMESTAMP_TOLERANCE_MS) {
      return {
        ok: false,
        response: jsonResponse({
          success: false,
          code: "UNAUTHORIZED",
          message: "Unauthorized or expired request signature."
        })
      };
    }

    if (!nonce || nonce.length < 8 || cache.get("pledge_nonce_" + nonce)) {
      return {
        ok: false,
        response: jsonResponse({
          success: false,
          code: "NONCE_REPLAYED",
          message: "Security token has already been used."
        })
      };
    }

    var expectedSig = computeHmacSha256Hex(
      ts + ":" + nonce + ":" + action + ":" + canonicalTarget,
      sharedSecret
    );
    if (!constantTimeEquals(expectedSig, sig)) {
      return {
        ok: false,
        response: jsonResponse({
          success: false,
          code: "UNAUTHORIZED",
          message: "Unauthorized direct request blocked."
        })
      };
    }

    cache.put("pledge_nonce_" + nonce, "1", 120);
  }

  return { ok: true };
}

function doGet() {
  return jsonResponse({
    success: true,
    service: "Citizen India Pledge Card Backend",
    status: "ONLINE"
  });
}

function doPost(e) {
  var body = {};
  try {
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    body = JSON.parse(raw);
  } catch (err) {
    return jsonResponse({
      success: false,
      code: "INVALID_JSON",
      message: "Invalid request payload."
    });
  }

  var action = String(body.action || "").trim();
  var reqData = body.data && typeof body.data === "object" ? body.data : {};

  // =========================================================================
  // ACTION 1: getPledgeCount
  // =========================================================================
  if (action === "getPledgeCount") {
    var secCount = verifyProxySecurityAndRateLimit(body, "getPledgeCount", "count");
    if (!secCount.ok) return secCount.response;

    try {
      var sheetForCount = openExistingPledgeSheet();
      var values = sheetForCount.getDataRange().getDisplayValues();
      if (!values || values.length <= 1) {
        return jsonResponse({
          success: true,
          count: 0
        });
      }

      var headerMap = resolveColumnMap(values[0]);
      var validPledgeRows = 0;
      for (var r = 1; r < values.length; r++) {
        var row = values[r];
        var hasContent = false;
        for (var c = 0; c < row.length; c++) {
          if (String(row[c] || "").trim() !== "") {
            hasContent = true;
            break;
          }
        }
        if (hasContent) {
          var parsed = parseRowRecord(row, headerMap);
          if (parsed.uniqueCitizenId || parsed.fullName || parsed.mobileNumber) {
            validPledgeRows++;
          }
        }
      }

      return jsonResponse({
        success: true,
        count: validPledgeRows
      });
    } catch (err) {
      return jsonResponse({
        success: false,
        code: "COUNTER_ERROR",
        message: "Unable to fetch pledge count."
      });
    }
  }

  // =========================================================================
  // ACTION 2: createCard
  // =========================================================================
  if (action === "createCard") {
    var fullName = sanitizeText(reqData.fullName, 80);
    var guardianName = sanitizeText(reqData.guardianName, 80);
    var gender = String(reqData.gender || "").trim();
    var dateOfBirth = sanitizeText(reqData.dateOfBirth, 20);
    var state = sanitizeText(reqData.state, 60);
    var district = sanitizeText(reqData.district, 60);
    var mobileNumber = normalizeTenDigitMobile(reqData.mobileNumber);
    var declarationAccepted = reqData.declarationAccepted === true;

    if (
      fullName.length < 2 ||
      guardianName.length < 2 ||
      (gender !== "Male" && gender !== "Female" && gender !== "Other") ||
      !/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) ||
      state.length < 2 ||
      district.length < 2 ||
      !/^[6-9]\d{9}$/.test(mobileNumber) ||
      !declarationAccepted
    ) {
      return jsonResponse({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Please provide valid details for all mandatory fields."
      });
    }

    var secCreate = verifyProxySecurityAndRateLimit(body, "createCard", mobileNumber);
    if (!secCreate.ok) return secCreate.response;

    var lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) {
      return jsonResponse({
        success: false,
        code: "SERVER_BUSY",
        message: "Server is busy processing requests. Please try again in a few seconds."
      });
    }

    try {
      var sheet = openExistingPledgeSheet();
      var allData = sheet.getDataRange().getDisplayValues();
      var headers = allData && allData.length > 0 ? allData[0] : [];
      var colMap = resolveColumnMap(headers);

      var existingIds = {};
      if (allData && allData.length > 1) {
        for (var i = 1; i < allData.length; i++) {
          var rowRec = parseRowRecord(allData[i], colMap);
          if (rowRec.uniqueCitizenId) {
            existingIds[rowRec.uniqueCitizenId] = true;
          }
          if (rowRec.mobileNumber && rowRec.mobileNumber === mobileNumber) {
            return jsonResponse({
              success: false,
              code: "DUPLICATE_MOBILE",
              message: "Only one Citizen Pledge Card can be issued per registered mobile number."
            });
          }
        }
      }

      // Generate unique CITIZEN-XXXXXXXX ID guaranteed not to collide with existing records
      var newCitizenId = "";
      for (var attempt = 0; attempt < 25; attempt++) {
        var randEight = String(Math.floor(10000000 + Math.random() * 90000000));
        var candidateId = "CITIZEN-" + randEight;
        if (!existingIds[candidateId]) {
          newCitizenId = candidateId;
          break;
        }
      }

      if (!newCitizenId) {
        throw new Error("ID_GENERATION_FAILED");
      }

      var nowIso = new Date().toISOString();
      var numCols = Math.max(headers.length, 10);
      var newRow = new Array(numCols);
      for (var k = 0; k < numCols; k++) newRow[k] = "";

      function setCol(mappedIdx, fallbackIdx, value) {
        var idx = mappedIdx >= 0 ? mappedIdx : fallbackIdx;
        if (idx >= 0) {
          while (newRow.length <= idx) newRow.push("");
          if (newRow[idx] === "") {
            newRow[idx] = value;
          }
        }
      }

      // Map into existing columns without altering Row 1 headers
      setCol(colMap.citizenId, 0, newCitizenId);
      setCol(colMap.fullName, 1, fullName);
      setCol(colMap.guardianName, 2, guardianName);
      setCol(colMap.gender, 3, gender);
      setCol(colMap.dateOfBirth, 4, dateOfBirth);
      setCol(colMap.state, 5, state);
      setCol(colMap.district, 6, district);
      setCol(colMap.mobileNumber, 7, mobileNumber);
      setCol(colMap.status, 8, "ACTIVE");
      setCol(colMap.timestamp, 9, nowIso);
      if (colMap.declaration >= 0) {
        setCol(colMap.declaration, -1, "YES");
      }

      sheet.appendRow(newRow);

      // Return strictly sanitized card fields (NO guardianName, NO dateOfBirth, NO full mobile)
      return jsonResponse({
        success: true,
        data: {
          uniqueCitizenId: newCitizenId,
          fullName: fullName,
          gender: gender,
          mobileLast4: maskMobileLast4(mobileNumber),
          state: state,
          district: district,
          status: "ACTIVE"
        }
      });
    } catch (err) {
      return jsonResponse({
        success: false,
        code: "DATABASE_ERROR",
        message: "An unexpected server error occurred. Please try again later."
      });
    } finally {
      lock.releaseLock();
    }
  }

  // =========================================================================
  // ACTION 3: verifyById
  // =========================================================================
  if (action === "verifyById") {
    var targetId = String(reqData.uniqueCitizenId || reqData.citizenId || "")
      .trim()
      .toUpperCase();
    if (!/^CITIZEN-\d{8}$/.test(targetId)) {
      return jsonResponse({
        success: false,
        code: "INVALID_CITIZEN_ID",
        message: "Please enter a valid Citizen ID in the format CITIZEN-12345678."
      });
    }

    var secVerifyId = verifyProxySecurityAndRateLimit(body, "verifyById", targetId);
    if (!secVerifyId.ok) return secVerifyId.response;

    try {
      var sheetById = openExistingPledgeSheet();
      var rowsById = sheetById.getDataRange().getDisplayValues();
      if (!rowsById || rowsById.length <= 1) {
        return jsonResponse({
          success: false,
          code: "NOT_FOUND",
          message: "No matching Citizen Pledge Card was found for this Citizen ID."
        });
      }

      var mapById = resolveColumnMap(rowsById[0]);
      for (var rId = 1; rId < rowsById.length; rId++) {
        var recById = parseRowRecord(rowsById[rId], mapById);
        if (recById.uniqueCitizenId === targetId) {
          return jsonResponse({
            success: true,
            data: {
              uniqueCitizenId: recById.uniqueCitizenId,
              fullName: recById.fullName,
              gender: recById.gender,
              mobileLast4: maskMobileLast4(recById.mobileNumber),
              state: recById.state,
              district: recById.district,
              status: "ACTIVE"
            }
          });
        }
      }

      return jsonResponse({
        success: false,
        code: "NOT_FOUND",
        message: "No matching Citizen Pledge Card was found for this Citizen ID."
      });
    } catch (err) {
      return jsonResponse({
        success: false,
        code: "DATABASE_ERROR",
        message: "An unexpected server error occurred. Please try again later."
      });
    }
  }

  // =========================================================================
  // ACTION 4: verifyByDetails
  // =========================================================================
  if (action === "verifyByDetails") {
    var targetMobile = normalizeTenDigitMobile(reqData.mobileNumber);
    var targetState = sanitizeText(reqData.state, 60);
    var targetDistrict = sanitizeText(reqData.district, 60);

    if (!/^[6-9]\d{9}$/.test(targetMobile) || targetState.length < 2 || targetDistrict.length < 2) {
      return jsonResponse({
        success: false,
        code: "INVALID_RECOVERY_DETAILS",
        message: "Please provide a valid 10-digit mobile number, state, and district."
      });
    }

    var canonicalKey =
      targetMobile + ":" + targetState.toLowerCase() + ":" + targetDistrict.toLowerCase();
    var secVerifyDetails = verifyProxySecurityAndRateLimit(body, "verifyByDetails", canonicalKey);
    if (!secVerifyDetails.ok) return secVerifyDetails.response;

    try {
      var sheetByDet = openExistingPledgeSheet();
      var rowsByDet = sheetByDet.getDataRange().getDisplayValues();
      if (!rowsByDet || rowsByDet.length <= 1) {
        return jsonResponse({
          success: false,
          code: "NOT_FOUND",
          message: "No Citizen Pledge Card matching this Mobile Number, State, and District was found."
        });
      }

      var mapByDet = resolveColumnMap(rowsByDet[0]);
      var targetStateLower = targetState.toLowerCase();
      var targetDistrictLower = targetDistrict.toLowerCase();

      for (var rDet = 1; rDet < rowsByDet.length; rDet++) {
        var recDet = parseRowRecord(rowsByDet[rDet], mapByDet);
        if (
          recDet.mobileNumber === targetMobile &&
          recDet.state.toLowerCase() === targetStateLower &&
          recDet.district.toLowerCase() === targetDistrictLower &&
          /^CITIZEN-\d{8}$/.test(recDet.uniqueCitizenId)
        ) {
          return jsonResponse({
            success: true,
            data: {
              uniqueCitizenId: recDet.uniqueCitizenId,
              fullName: recDet.fullName,
              gender: recDet.gender,
              mobileLast4: maskMobileLast4(recDet.mobileNumber),
              state: recDet.state,
              district: recDet.district,
              status: "ACTIVE"
            }
          });
        }
      }

      return jsonResponse({
        success: false,
        code: "NOT_FOUND",
        message: "No Citizen Pledge Card matching this Mobile Number, State, and District was found."
      });
    } catch (err) {
      return jsonResponse({
        success: false,
        code: "DATABASE_ERROR",
        message: "An unexpected server error occurred. Please try again later."
      });
    }
  }

  return jsonResponse({
    success: false,
    code: "UNSUPPORTED_ACTION",
    message: "Unsupported action."
  });
}
