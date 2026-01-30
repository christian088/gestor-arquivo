/**
 * Cabeçalhos de segurança "essenciais" sem libs externas.
 * Se preferir, pode trocar depois por `helmet` e remover isto.
 */
function securityHeaders(req, res, next) {
  // Oculta tecnologia
  if (res.removeHeader) {
    res.removeHeader("X-Powered-By");
  }

  // Evita MIME sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Clickjacking
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  // Referrer Policy conservadora
  res.setHeader("Referrer-Policy", "no-referrer");

  // HSTS apenas em produção (requer HTTPS)
  if (process.env.NODE_ENV === "production") {
    // 6 meses
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=15552000; includeSubDomains"
    );
  }

  next();
}

module.exports = {
  securityHeaders,
};
