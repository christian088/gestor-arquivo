/**
 * Middleware de autorização por roles
 * @param {string[]} roles
 */
function authorizeRoles(roles) {
  const allowed = new Set(roles.map((r) => r.toLowerCase()));

  return (req, res, next) => {
    const role = ((req.user && req.user.role) || "").toLowerCase();

    if (!role || !allowed.has(role)) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    next();
  };
}

module.exports = authorizeRoles;
