const jwt = require("jsonwebtoken");

/**
 * Middleware de autenticação JWT
 */
function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const parts = authHeader.split(" ");

    const scheme = parts[0] || "";
    const token = parts[1];

    if (!token || !/^Bearer$/i.test(scheme)) {
      return res
        .status(401)
        .json({ message: "Credenciais ausentes ou inválidas" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      // Falha cedo: sem segredo não dá pra validar
      return res
        .status(500)
        .json({ message: "Configuração de autenticação ausente" });
    }

    const decoded = jwt.verify(token, secret, {
      algorithms: ["HS256"],
    });

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    };

    return next();
  } catch (err) {
    // Evita vazar detalhes (expiração, assinatura etc.)
    return res.status(401).json({ message: "Não autorizado" });
  }
}

module.exports = authMiddleware;
