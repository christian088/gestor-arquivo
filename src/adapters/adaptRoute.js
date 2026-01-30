const adaptRoute = (controller) => {
  return async function (req, res) {
    const httpRequest = {
      body: req.body,
      params: req.params,
      pathParams: req.params,
      query: req.query,
    };

    try {
      const httpResponse = await controller.handle(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  };
};

module.exports = adaptRoute;
