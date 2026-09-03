// Entidades e Regras de Negócio

// Usuário é uma entidade do sistema.
// Seus atributos são privados, e só podem ser acessados através de métodos públicos (getters e setters).
// id (automático), nome, email e senha são atributos do usuário.
class Usuario
{
    #id
    #nome
    #email
    #senha

    constructor(nome, email, senha)
    {
        this.#nome = nome
        this.#email = email
        this.#senha = senha
        this.#validarEmail(email)
    }

    get id(){ return this.#id }
    get nome(){ return this.#nome }
    get email(){ return this.#email }
    get senha(){ return this.#senha }

    set id(valor) { this.#id = valor } // Alteração para verificação "se número, valide"
    set email(valor){ this.#email = valor }

    // Lógica de validação de email (RegExp)
    #validarEmail(email)
    {
        const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        // Se o email não estiver no padrão, lança um erro
        if(!pattern.test(email))
        {
            throw new Error("Email está fora do padrão")
        }
    }
    
}

// Exporta para outros arquivos usarem a classe
module.exports = Usuario
