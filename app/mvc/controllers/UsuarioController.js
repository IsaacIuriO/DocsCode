const UsuarioService = require('../../services/UsuarioService');

class UsuarioController
{
    constructor()
    {
        this.usuarioService = new UsuarioService();
    }

    // Acessa a tela inicial do usuário
    index(req, res)
    {
        res.render('Usuario/index');
    }

    // Acessa a tela de cadastro do usuário
    usuarioCadastrar(req, res)
    {
        res.render('Usuario/cadastro');
    }

    // Acessa a tela de login do usuário
    usuarioLogin(req, res)
    {
        res.render('Usuario/login');
    }

    // Acessa a tela de listagem de usuários
    async usuarioLista(req, res)
    {
        const usuarios = await this.usuarioService.buscarTodosUsuarios()
        res.render("Usuario/lista", { usuarios: usuarios }) 
    }

    // Cadastra usuário no banco de dados
    async usuarioPostarAsync(req, res)
    {
        const id = await this.usuarioService.cadastrarUsuario(
            req.body.username,
            req.body.email,
            req.body.senha
        )

        res.json({ id: id })
    }

    // Deleta usuário do banco de dados
    async usuarioDeletarAsync(req, res)
    {
        const affectedRows = await this.usuarioService.deletarUsuario(req.params.id)

        res.json({ affectedRows: affectedRows })
    }
}

module.exports = new UsuarioController();
