function verificarLogin(req, res, next)
{
    if (req.session && req.session.usuarioLogado)
    {
        return next();
    }

    return res.redirect('/usuario/login');
}

module.exports = verificarLogin;