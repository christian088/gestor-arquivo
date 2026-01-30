const Documento = require("../models/documento");

class BuscarDocumentoController {
  async handle(httpRequest) {
    try {
      const { id } = httpRequest.params;

      if (!id) {
        return {
          statusCode: 400,
          body: "ID do documento é obrigatório",
        };
      }

      const documento = await Documento.findByPk(id);

      if (!documento) {
        return {
          statusCode: 404,
          body: "Documento não encontrado",
        };
      }

      return {
        statusCode: 200,
        body: documento,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Erro ao buscar documento",
      };
    }
  }
}

module.exports = BuscarDocumentoControllerDocumentoController;
