const express = require("express");

/**
 * Handler de 404
 */
function notFoundHandler(_req, res) {
  res.status(404).json({ message: "Rota não encontrada" });
}

/**
 * Handler de erro global
 */
function errorHandler(err, _req, res, _next) {
  const isProd = process.env.NODE_ENV === "production";
  const status = err && err.statusCode ? err.statusCode : 500;

  const payload = {
    message: (err && err.message) || "Erro interno",
  };

  if (!isProd) {
    payload.stack = err && err.stack;
  }

  res.status(status).json(payload);
}

/**
 * Setup dos handlers de erro
 */
function setupErrorHandlers(app) {
  // 404 e erros SEMPRE por último
  app.use(notFoundHandler);
  app.use(errorHandler);
}

module.exports = setupErrorHandlers;
