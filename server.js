const porta = 3000

const express = require("express");
const app = express();

// uso do ejs para gerar páginas html
app.set("view engine", "ejs");
app.set("views", __dirname + '/mvc/views');

// uso do json
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// consulta no banco de dados
const bd = require("./database/db");

// fica de olho na porta
app.listen(porta);

// acessa a tela index na pasta Usuario
app.get('/', (req, res)=>{
    res.render("Usuario/index")
})

// acessa a tela login na pasta Usuario
app.get('/login', (req, res)=>{
    res.render("Usuario/login")
})

// acessa a tela cadastro na pasta Usuario
app.get('/cadastro', (req, res)=>{
    res.render("Usuario/cadastro")
});
