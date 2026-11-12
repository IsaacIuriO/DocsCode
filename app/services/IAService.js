// IAService.js

const OpenAI = require('openai');

// Importa a entidade e o schema
const Documento = require('../mvc/models/DocumentoModel');
const DocumentoSchema = require('../mvc/schemas/DocumentoSchema');

// Instancia a API da OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

class IAService
{
    #documentoSchema

    constructor()
    {
        this.#documentoSchema = DocumentoSchema;
    }

    // Gera documentação técnica utilizando IA
    async gerarDocumentacao(pergunta, tipo = 'geral')
    {
        if (!pergunta || !pergunta.trim())
        {
            throw new Error('A pergunta não pode estar vazia.');
        }

        const instrucoes = `
            Você é o DocsCode AI, um assistente especializado
            em Engenharia de Software e documentação técnica.

            Sua função é auxiliar no desenvolvimento de projetos
            de software, utilizando conceitos técnicos corretos.

            Você deve:

            1. Interpretar os requisitos do projeto.
            2. Identificar requisitos funcionais e não funcionais.
            3. Identificar entidades, atributos e relacionamentos.
            4. Gerar diagramas UML quando solicitado.
            5. Explicar as decisões técnicas.
            6. Organizar a documentação de maneira profissional.

            REGRAS:

            - Não invente informações não fornecidas.
            - Informe quando faltarem requisitos.
            - Faça perguntas quando necessário.
            - Utilize notação UML corretamente.
            - Explique os diagramas gerados.
            - Não apresente informações incertas como fatos.

            FORMATAÇÃO:

            - Utilize Markdown para organizar a documentação.
            - Quando gerar diagramas compatíveis com Mermaid,
              utilize blocos de código Mermaid.
            - Separe explicações dos códigos dos diagramas.
        `;

        const resposta = await openai.responses.create({
            model: process.env.OPENAI_MODEL,
            instructions: instrucoes,
            input: `
                Tipo de documentação: ${tipo}

                Solicitação do usuário:
                ${pergunta}
            `
        });

        const textoResposta = resposta.output_text;

        if (!textoResposta)
        {
            throw new Error('A IA não retornou uma resposta.');
        }

        // Identifica um possível diagrama Mermaid
        const diagrama = textoResposta.match(
            /```mermaid\s*([\s\S]*?)```/i
        );

        const codigoUML = diagrama
            ? diagrama[1].trim()
            : null;

        // Cria a entidade Documento
        const documento = new Documento(
            pergunta,
            textoResposta,
            tipo,
            codigoUML
        );

        // Salva no banco de dados
        const registro = await this.#documentoSchema.create({
            pergunta: documento.pergunta,
            resposta: documento.resposta,
            tipo: documento.tipo,
            codigoUML: documento.codigoUML
        });

        documento.id = registro.id;

        return documento;
    }

    // Busca todos os documentos gerados
    async buscarTodosDocumentos()
    {
        const dados = await this.#documentoSchema.findAll({
            order: [['createdAt', 'DESC']]
        });

        const documentos = [];

        for (const dado of dados)
        {
            const documento = new Documento(
                dado.pergunta,
                dado.resposta,
                dado.tipo,
                dado.codigoUML
            );

            documento.id = dado.id;

            documentos.push(documento);
        }

        return documentos;
    }

    // Busca um documento específico
    async buscarDocumentoPorId(id)
    {
        const dado = await this.#documentoSchema.findByPk(id);

        if (!dado)
        {
            return null;
        }

        const documento = new Documento(
            dado.pergunta,
            dado.resposta,
            dado.tipo,
            dado.codigoUML
        );

        documento.id = dado.id;

        return documento;
    }

    // Deleta um documento
    async deletarDocumento(id)
    {
        return await this.#documentoSchema.destroy({
            where: { id: id }
        });
    }
}

module.exports = IAService;
