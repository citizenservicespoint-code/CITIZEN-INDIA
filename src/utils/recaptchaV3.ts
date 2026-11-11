/**
 * CITIZEN SERVICES POINT (CITIZEN INDIA)
 * Google reCAPTCHA v3 Frontend Token Generator Utility
 *
 * SECURITY NOTICE:
 * - Contains ONLY the public Google reCAPTCHA v3 Site Key.
 * - The Secret Key is stored exclusively in the server-side environment
 *   and is NEVER included in any frontend file or browser bundle.
 */

export const RECAPTCHA_V3_SITE_KEY: string =
  (typeof import.meta !== 'undefined' &&
    (import.meta as unknown as { env?: Record<string, string | undefined> }).env
      ?.VITE_RECAPTCHA_SITE_KEY) ||
  '6LcZxwsuAAAAAAfSer968O7pBhQzWmRhtQ4sX-DO';

export type RecaptchaV3Action =
  | 'status_check'
  | 'submit_service_request'
  | 'pledge_create_card'
  | 'pledge_verify_id'
  | 'pledge_verify_details';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let scriptLoadPromise: Promise<boolean> | null = null;

/**
 * Ensures the official Google reCAPTCHA v3 script is loaded once in the document head.
 */
export function ensureRecaptchaV3Loaded(): Promise<boolean> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.resolve(false);
  }

  if (window.grecaptcha && typeof window.grecaptcha.execute === 'function') {
    return Promise.resolve(true);
  }

  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise<boolean>((resolve) => {
    const existingScript = document.getElementById('google-recaptcha-v3-script') as HTMLScriptElement | null;
    if (existingScript) {
      if (window.grecaptcha && typeof window.grecaptcha.execute === 'function') {
        resolve(true);
        return;
      }
      existingScript.addEventListener('load', () => resolve(true), { once: true });
      existingScript.addEventListener('error', () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-recaptcha-v3-script';
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_V3_SITE_KEY)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      scriptLoadPromise = null;
      resolve(false);
    };
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

/**
 * Requests a fresh single-use Google reCAPTCHA v3 token bound to the specific action.
 * Never throws; returns an empty string if the external Google script cannot be reached
 * within the timeout window so the server can evaluate fallback security policies.
 */
export async function executeRecaptchaV3(
  action: RecaptchaV3Action,
  timeoutMs = 4500
): Promise<string> {
  if (typeof window === 'undefined') return '';

  const timeoutPromise = new Promise<string>((resolve) => {
    window.setTimeout(() => resolve(''), timeoutMs);
  });

  const tokenPromise = (async (): Promise<string> => {
    try {
      const loaded = await ensureRecaptchaV3Loaded();
      if (!loaded || !window.grecaptcha) return '';

      return await new Promise<string>((resolve) => {
        window.grecaptcha!.ready(() => {
          window
            .grecaptcha!.execute(RECAPTCHA_V3_SITE_KEY, { action })
            .then((token) => resolve(typeof token === 'string' ? token.trim() : ''))
            .catch(() => resolve(''));
        });
      });
    } catch {
      return '';
    }
  })();

  return Promise.race([tokenPromise, timeoutPromise]);
}
