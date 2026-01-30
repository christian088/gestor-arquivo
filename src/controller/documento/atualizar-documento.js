const Documento = require("../models/documento-model");

class AtualizaDocumentoControllercumentoController {
  async handle(httpRequest) {
    try {
      const { id } = httpRequest.params;
      const dadosAtualizados = httpRequest.body;

      if (!id) {
        return {
          statusCode: 400,
          body: { message: "ID do documento é obrigatório" },
        };
      }

      const documento = await Documento.findByPk(id);

      if (!documento) {
        return {
          statusCode: 404,
          body: { message: "Documento não encontrado" },
        };
      }

      await documento.update(dadosAtualizados);

      return {
        statusCode: 200,
        body: {
          message: "Documento atualizado com sucesso",
          documento,
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          message: "Erro ao atualizar documento",
          error: error.message,
        },
      };
    }
  }
}

module.exports = AtualizaDocumentoController;
