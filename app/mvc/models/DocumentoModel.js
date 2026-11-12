// DocumentoModel.js

class Documento
{
    #id
    #pergunta
    #resposta
    #tipo
    #codigoUML

    constructor(pergunta, resposta, tipo, codigoUML = null)
    {
        this.#pergunta = pergunta;
        this.#resposta = resposta;
        this.#tipo = tipo;
        this.#codigoUML = codigoUML;
    }

    get id() { return this.#id; }
    get pergunta() { return this.#pergunta; }
    get resposta() { return this.#resposta; }
    get tipo() { return this.#tipo; }
    get codigoUML() { return this.#codigoUML; }

    set id(valor)
    {
        this.#id = valor;
    }
}

module.exports = Documento;
