// UsuarioController.js

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
        req.session.usuarioLogado = false;
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

    usuarioConversa(req, res)
    {
        if (!req.session.usuarioLogado) {
            return res.redirect('/usuario/login');
        }

        res.render('Usuario/conversa');
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

    // Acessa a tela de login do usuário
    
    async usuarioLogarAsync(req, res)
    {
        try
        {
            const resultados = await this.usuarioService.logarUsuario(
                req.body.email,
                req.body.senha
            );

            if (!resultados)
            {
                return res.status(401).json({
                    mensagem: "E-mail ou senha incorretos."
                });
            }

            req.session.usuarioLogado = true;
            req.session.usuarioId = resultados.id;

            return res.json({
                mensagem: "Login realizado com sucesso!",
                usuario: resultados
            });
        }
        catch (erro)
        {
            console.error("Erro ao realizar login:", erro);

            return res.status(500).json({
                mensagem: "Erro interno ao realizar login."
            });
        }
    }

    // Deleta usuário do banco de dados
    async usuarioDeletarAsync(req, res)
    {
        const affectedRows = await this.usuarioService.deletarUsuario(req.params.id)

        res.json({ affectedRows: affectedRows })
    }
}

module.exports = new UsuarioController();
