/**
 * Security headers for every response. The Worker applies them in
 * src/server.ts; static files that Cloudflare serves without running the
 * Worker get the same set from public/_headers (a test keeps the two in sync).
 *
 * CSP notes:
 * - script-src needs 'unsafe-inline' for TanStack Start's inline hydration
 *   scripts; JSON-LD blocks are data, not script, and are unaffected.
 * - img-src allows https: because docs pages render images referenced by the
 *   GitHub Markdown (raw.githubusercontent.com and similar hosts).
 * - Cloudflare Web Analytics is enabled on the zone: Cloudflare injects its
 *   beacon script (static.cloudflareinsights.com), which reports to
 *   cloudflareinsights.com. Both must stay allowed or the beacon breaks.
 * - Everything else — scripts, styles, fonts, data fetches — is same-origin.
 */
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://cloudflareinsights.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

export const SECURITY_HEADERS: Readonly<Record<string, string>> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // No includeSubDomains: not every diceframe.com subdomain is confirmed to
  // serve HTTPS, and HSTS cannot be withdrawn quickly once browsers cache it.
  "Strict-Transport-Security": "max-age=31536000",
  "Content-Security-Policy": CONTENT_SECURITY_POLICY,
};
