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

// acessa a tela index
app.get('/', (req, res)=>{
    res.render("index")
})

// acessa a tela login
app.get('/login', (req, res)=>{
    res.render("login")
})
