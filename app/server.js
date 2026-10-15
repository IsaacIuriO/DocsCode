// server.js

const express = require('express');
const session = require('express-session');
const path = require('path');

const router = require('./mvc/routes/config');

const sessionConfig = {
    name: 'docscode.sid',
    secret: 'segredo',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // Caso for HTTPS, true
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60
    }
};

class Server
{
    app;
    port;

    constructor(port)
    {
        this.app = express();
        this.port = port;

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(express.static(path.join(__dirname, 'public')));

        // Sessão antes das rotas
        this.app.use(session(sessionConfig));

        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, 'mvc/views'));

        this.app.use(router);
    }

    listen()
    {
        this.app.listen(this.port, () => {
            console.log('Servidor Online! Porta: ' + this.port);
        });
    }
}

module.exports = new Server();
