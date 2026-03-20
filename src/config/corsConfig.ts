import cors from "cors";

// Read allowed origins from the environment variable and split by comma.
// This way we can control which frontends can call our API without
// changing code — just update the .env file.
const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS?.split(",") || [];

/**
 * CORS (Cross-Origin Resource Sharing) configuration.
 *
 * CORS controls which domains are allowed to make requests to this API
 * from a browser. Without this, browsers block cross-origin requests
 * by default (same-origin policy).
 */
export const corsConfig = cors({
    // Only allow requests from origins listed in our environment variable.
    // This prevents random websites from calling our API on behalf of users.
    origin: allowedOrigins,

    // Allow these HTTP methods for CRUD operations.
    methods: ["GET", "POST", "PUT", "DELETE"],

    // Allow these headers in requests.
    // Content-Type is needed so clients can send JSON bodies.
    // Authorization is included for future authentication support.
    allowedHeaders: ["Content-Type", "Authorization"],

    // Cache the preflight response for 10 minutes (600 seconds).
    // A preflight is the OPTIONS request browsers send before a real request
    // to check if CORS is allowed. Caching reduces unnecessary round trips.
    maxAge: 600,
});
 