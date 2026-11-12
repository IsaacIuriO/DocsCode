//IAController.js

const IAService = require('../../services/IAService');

class IAController
{
    constructor()
    {
        this.iaService = new IAService();
    }

    // Gera documentação técnica utilizando IA
    async iaGerarDocumentacaoAsync(req, res)
    {
        try
        {
            const { pergunta, tipo } = req.body;

            if (!pergunta || !pergunta.trim())
            {
                return res.status(400).json({
                    mensagem: 'Informe uma solicitação.'
                });
            }

            const documento = await this.iaService.gerarDocumentacao(
                pergunta,
                tipo || 'geral'
            );

            return res.status(201).json({
                mensagem: 'Documentação gerada com sucesso!',

                documento: {
                    id: documento.id,
                    pergunta: documento.pergunta,
                    resposta: documento.resposta,
                    tipo: documento.tipo,
                    codigoUML: documento.codigoUML
                }
            });
        }
        catch (erro)
        {
            console.error('Erro ao gerar documentação:', erro);

            return res.status(500).json({
                mensagem: 'Não foi possível gerar a documentação.'
            });
        }
    }

    // Lista os documentos gerados
    async iaListarDocumentosAsync(req, res)
    {
        try
        {
            const documentos =
                await this.iaService.buscarTodosDocumentos();

            return res.json({
                documentos: documentos
            });
        }
        catch (erro)
        {
            console.error('Erro ao listar documentos:', erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar documentos.'
            });
        }
    }

    // Busca documento por ID
    async iaBuscarDocumentoAsync(req, res)
    {
        try
        {
            const documento =
                await this.iaService.buscarDocumentoPorId(req.params.id);

            if (!documento)
            {
                return res.status(404).json({
                    mensagem: 'Documento não encontrado.'
                });
            }

            return res.json({
                documento: documento
            });
        }
        catch (erro)
        {
            console.error('Erro ao buscar documento:', erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar documento.'
            });
        }
    }

    // Deleta documento
    async iaDeletarDocumentoAsync(req, res)
    {
        try
        {
            const affectedRows =
                await this.iaService.deletarDocumento(req.params.id);

            return res.json({
                affectedRows: affectedRows
            });
        }
        catch (erro)
        {
            console.error('Erro ao deletar documento:', erro);

            return res.status(500).json({
                mensagem: 'Erro ao deletar documento.'
            });
        }
    }
}

module.exports = new IAController();
