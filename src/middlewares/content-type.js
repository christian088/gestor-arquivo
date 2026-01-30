/**
 * Define "application/json" como padrão APENAS quando:
 * - ainda não há Content-Type definido, e
 * - o cliente aceita JSON (Accept contém application/json)
 * Evita quebrar downloads (CSV, PDF, imagens etc.).
 */
function contentType(req, res, next) {
  const alreadySet = res.getHeader("Content-Type");

  if (!alreadySet) {
    const accept = (req.headers["accept"] || "")
      .toString()
      .toLowerCase();

    if (accept.includes("application/json") || accept.includes("*/*")) {
      res.type("application/json");
    }
  }

  return next();
}

module.exports = contentType;
