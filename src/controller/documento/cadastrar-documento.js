const Documento = require("../models/documento");

class CadastrarDocumentoController {
  async handle(httpRequest) {
    try {
      const {
        nome,
        descricao,
        tipo,
        tamanho,
        caminho,
        categoria,
        ativo,
      } = httpRequest.body;

      // validação básica
      if (!nome || !tipo || !tamanho || !caminho) {
        return {
          statusCode: 400,
          body: "Campos obrigatórios não informados",
        };
      }

      const documento = await Documento.create({
        nome,
        descricao,
        tipo,
        tamanho,
        caminho,
        categoria,
        ativo,
      });

      return {
        statusCode: 201,
        body: documento,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Erro ao cadastrar documento",
      };
    }
  }
}

module.exports = CadastrarDocumentoController;
