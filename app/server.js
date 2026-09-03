const express = require('express')
const router = require('./mvc/routes/config')

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
