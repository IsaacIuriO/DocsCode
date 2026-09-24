// usa as importações do model e do schema para manipular os dados do usuário
const Usuario = require('../mvc/models/UsuarioModel');
const UsuarioSchema = require('../schemas/UsuarioSchema');

// instala biblioteca de criptografia
const bcrypt = require("bcrypt");

// manipula os dados do usuário, usando o model e o schema
// cria FUNÇÕES para cadastrar, buscar, editar e deletar usuários
class UsuarioService
{
    #usuarioSchema

    constructor()
    {
        this.#usuarioSchema = UsuarioSchema;
    }

    async cadastrarUsuario(username, email, senha)
    {
        const usuario = new Usuario(username, email, senha);

        const senhaHash = await bcrypt.hash(usuario.senha, 10);

        const id = await this.#usuarioSchema.create(
            {
                username: usuario.username,
                email: usuario.email,
                password: senhaHash
            }
        );

        return id;
    }

    async buscarTodosUsuarios()
    {
        const usuarios = []
        const dados = await this.#usuarioSchema.findAll();

        for(const usuario of dados)
        {
            const u = new Usuario(
                usuario.username,
                usuario.email,
                usuario.senha
            );

            u.id = usuario.id;
            usuarios.push(u);
        }

        return usuarios
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

// exporta para outros arquivos
module.exports = UsuarioService;
