const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const setupMiddlewares = require("./middlewares");
const setupRoutes = require("./routes");
const { resolveRuntimePath } = require("./paths");
const { ENV } = require("./env");
const { setupErrorHandlers } = require("./middlewares");

const app = express();

// Swagger opcional
if (ENV.SWAGGER_ENABLED) {
  const swaggerFile = resolveRuntimePath("docs/api/swagger.yaml");
  const swaggerDocument = YAML.load(swaggerFile);

  app.get("/", (_req, res) => res.redirect("/api-docs"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  app.get("/", (_req, res) => res.status(204).end());
}

// Middlewares **antes** das rotas
setupMiddlewares(app);

// Rotas
setupRoutes(app);

// Error handlers (por último)
setupErrorHandlers(app);

module.exports = app;
