const UsuarioModel = require('../mvc/models/UsuarioModel');
const UsuarioSchema = require('../schemas/UsuarioSchema');

class UsuarioService
{
    #usuarioSchema

    constructor()
    {
        this.#usuarioSchema = UsuarioSchema;
    }

    async cadastrarUsuario(username, email, senha)
    {
        const usuario = new UsuarioModel(username, email, senha);

        const id = await this.#usuarioSchema.create({
            username: usuario.nome,
            email: usuario.email,
            password: usuario.senha
        });

        return id;
    }

    async buscarUsuario(id)
    {
        const dado = await this.#usuarioSchema.findOne
        ({
            where:{ id: id }
        });

        if(!dado){
            return null;
        }

        const usuario = new UsuarioModel(dado.email, dado.password, dado.username);

        usuario.id = dado.id;
        
        return usuario;
    }

    async deletarUsuario(id)
    {
        const usuario = await this.#usuarioSchema.findOne
        ({
            where:{ id: id }
        });

        const affectedRows = await usuario.destroy()

        return affectedRows;
    }
}

module.exports = UsuarioService;
