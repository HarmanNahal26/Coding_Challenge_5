import helmet from "helmet";

/**
 * Helmet configuration for our JSON API.
 *
 * Helmet sets security-related HTTP headers to protect the API.
 * Since this is a JSON API (not a browser-rendered app), some headers
 * designed for HTML content are disabled or adjusted.
 */
export const helmetConfig = helmet({
    // Disable Content-Security-Policy because this API returns JSON, not HTML.
    // CSP is meant to prevent XSS attacks in browser-rendered pages that load
    // scripts, styles, and images. Our API has no HTML content so CSP adds
    // no security benefit here and could interfere with clients.
    contentSecurityPolicy: false,

    // HSTS (HTTP Strict Transport Security) tells browsers to only use HTTPS.
    // In development we turn it off so we can test over plain HTTP.
    // In production this should be enabled to protect data in transit.
    hsts: process.env.NODE_ENV === "production"
        ? {
              maxAge: 31536000,        // 1 year in seconds
              includeSubDomains: true, // Apply to all subdomains too
              preload: true,           // Allow browser preload lists
          }
        : false,

    // Prevent other sites from embedding our API responses in an iframe.
    // This stops clickjacking attacks. "deny" means no framing allowed at all.
    frameguard: { action: "deny" },

    // Remove the X-Powered-By header that Express adds by default.
    // This hides that we are using Express/Node so attackers have less
    // information about our tech stack to exploit.
    hidePoweredBy: true,

    // Prevent browsers from guessing (sniffing) the content type of responses.
    // Without this a browser might misinterpret a JSON response, causing issues.
    noSniff: true,
});
 