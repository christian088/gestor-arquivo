const { Router } = require("express");
const fg = require("fast-glob");
const { resolveRuntimePath } = require("./paths");
const path = require("node:path");

module.exports = (app) => {
  const router = Router();
  app.use("/api", router);

  const routesDir = resolveRuntimePath("routes");
  const patterns =
    process.env.NODE_ENV === "production"
      ? ["**/*.js"]
      : ["**/*.js", "**/*.ts"];

  const files = fg.sync(patterns, {
    cwd: routesDir,
    absolute: true,
  });

  for (const file of files) {
    if (file.endsWith(".d.ts")) continue;

    const mod = require(file);
    const mount = mod.default || mod;

    if (typeof mount === "function") {
      mount(router);
    } else {
      console.warn(
        `[routes] O arquivo ${path.basename(file)} não exporta uma função padrão.`
      );
    }
  }
};
