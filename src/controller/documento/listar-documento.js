const Documento = require("../models/documento");

class ListarDocumentosController {
  async handle(httpRequest) {
    try {
      const { categoria, ativo } = httpRequest.query || {};

      const where = {};

      if (categoria) {
        where.categoria = categoria;
      }

      if (ativo !== undefined) {
        where.ativo = ativo === "true";
      }

      const documentos = await Documento.findAll({
        where,
        order: [["createdAt", "DESC"]],
      });

      return {
        statusCode: 200,
        body: documentos,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Erro ao listar documentos",
      };
    }
  }
}

module.exports = ListarDocumentosController;
