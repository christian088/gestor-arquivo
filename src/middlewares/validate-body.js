const { ZodError } = require("zod");

const validateBody =
  (schema) =>
  async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.issues.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }

      // Passa outros erros para o error handler global
      next(error);
    }
  };

module.exports = {
  validateBody,
};
