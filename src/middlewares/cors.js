const parseOrigins = (raw) =>
  (raw || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const ALLOWED_ORIGINS = parseOrigins(process.env.CORS_ORIGINS);
// ex: "https://app.com,https://admin.app.com"

const ALLOW_CREDENTIALS =
  (process.env.CORS_CREDENTIALS || "false").toLowerCase() === "true";

function isOriginAllowed(origin) {
  if (!origin) return true; // non-CORS ou same-origin
  if (ALLOWED_ORIGINS.length === 0) return true; // fallback (dev)
  return ALLOWED_ORIGINS.includes(origin);
}

function cors(req, res, next) {
  const origin = req.headers.origin;

  if (isOriginAllowed(origin)) {
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
    } else {
      // requisições sem Origin
      res.setHeader("Access-Control-Allow-Origin", "*");
    }

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization,Content-Type"
    );

    if (ALLOW_CREDENTIALS) {
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    // cache do preflight (24h)
    res.setHeader("Access-Control-Max-Age", "86400");
  }

  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  return next();
}

module.exports = cors;
