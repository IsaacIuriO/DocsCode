const express = require('express')
const session = require('express-session');

const sessionConfig = {
    secret: 'segredo',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hora em milissegundos
};

const router = require('./mvc/routes/config');

class Server
{
    app
    port

    constructor(port)
    {
        this.app = express();
        this.port = port;

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.static("public"));

        this.app.use(session(sessionConfig));

        this.app.use(router);
        this.app.set("view engine", "ejs");
        this.app.set("views", "mvc/views");
    }

    listen()
    {
        this.app.listen(this.port, () => {
            console.log("Servidor Online...");
        });
    }
}

// module.exports -> serve para exportar objetos de um arquivo para outros 
module.exports = new Server(3000);
