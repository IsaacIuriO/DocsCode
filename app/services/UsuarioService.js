// UsuarioService.js

// usa as importações do model e do schema para manipular os dados do usuário
const Usuario = require('../mvc/models/UsuarioModel');
const UsuarioSchema = require('../schemas/UsuarioSchema');

// conexão com o banco de dados
const sequelize = require('../database/dbconfig');

// instala biblioteca de criptografia
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

        const senhaHash = await bcrypt.hash(usuario.senha, saltRounds);

        const id = await this.#usuarioSchema.create(
            {
                username: usuario.username,
                email: usuario.email,
                password: senhaHash
            }
        );

        return id;
    }


    async logarUsuario(email, senha)
    {
        // Busca o usuário pelo e-mail
        const usuario = await this.#usuarioSchema.findOne({
            where: { email: email }
        });

        // Verifica se o usuário existe
        if (!usuario) { return null; }

        // Compara a senha digitada com o hash armazenado
        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.password
        );

        // Verifica se a senha está correta
        if (!senhaCorreta) { return null; }

        // Login válido
        return {
            id: usuario.id,
            username: usuario.username,
            email: usuario.email
        };
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

    async buscarUsuarioPorId(id)
    {
        const usuario = await this.#usuarioSchema.findOne({
            where: { id: id }
        });

        if (!usuario) { return null; }

        return usuario.username;
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

// Daqui vai para 'controllers'
module.exports = UsuarioService;
