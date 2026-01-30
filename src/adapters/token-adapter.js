const jwt = require("jsonwebtoken");
const { ENV } = require("../config/env");

class TokenAdapter {
  verifyRefreshToken(token) {
    return jwt.verify(token, ENV.JWT_REFRESH_SECRET);
  }

  verifyToken(token) {
    return jwt.verify(token, ENV.JWT_SECRET);
  }

  generateToken(payload) {
    const expiresIn = ENV.JWT_EXPIRES_IN || "15m";
    return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn });
  }

  generateRefreshToken(payload) {
    const expiresIn = ENV.JWT_REFRESH_EXPIRES_IN || "7d";
    return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, { expiresIn });
  }
}

module.exports = {
  TokenAdapter,
};
