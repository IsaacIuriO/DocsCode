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
        if (req.session.usuarioLogado)
        {
            return res.redirect('/usuario/conversa');
        }

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

    usuarioLogout(req, res)
    {
        res.render('Usuario/index');
    }

    usuarioConversa(req, res)
    {
        try
        {
            const username = req.session.username || 'Visitante';

            if (!req.session.usuarioLogado) {
                return res.redirect('/usuario/login');
            }

            res.render('Usuario/conversa', { username: username });
        }
        catch (erro)
        {
            res.status(500).send('Erro ao acessar a tela de conversa.');
        }
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
            const usuario = await this.usuarioService.logarUsuario(
                req.body.email,
                req.body.senha
            );

            if (!usuario)
            {
                return res.status(401).json({
                    mensagem: "E-mail ou senha incorretos."
                });
            }

            // Evita reutilizar o identificador anterior
            req.session.regenerate((erro) =>
            {
                if (erro)
                {
                    console.error(erro);

                    return res.status(500).json({
                        mensagem: "Não foi possível iniciar a sessão."
                    });
                }

                // Dados do usuário autenticado
                req.session.usuarioLogado = true;
                req.session.usuarioId = usuario.id;
                req.session.username = usuario.username;

                req.session.save((erro) =>
                {
                    if (erro)
                    {
                        console.error(erro);

                        return res.status(500).json({
                            mensagem: "Não foi possível salvar a sessão."
                        });
                    }

                    return res.json({
                        mensagem: "Login realizado com sucesso!",
                        usuario: {
                            id: usuario.id,
                            username: usuario.username
                        }
                    });
                });
            });
        }
        catch (erro)
        {
            console.error("Erro no login:", erro);

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

// Daqui vai para 'routes'
module.exports = new UsuarioController();
