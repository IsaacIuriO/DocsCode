// Importa função do express para criar rotas
const { Router } = require("express");

// Importa o controller do usuário para ter acesso às funções de cadastro, listagem e deleção de usuários
const UsuarioController = require("../controllers/UsuarioController");

// Cria uma instância do roteador do express
const router = Router();

// USUARIO
router.get("/", (req, res) => UsuarioController.index(req, res));
router.get("/usuario/criar", (req, res) => UsuarioController.usuarioCadastrar(req, res));
router.post("/usuario/criar", (req, res) => UsuarioController.usuarioPostarAsync(req, res));
router.get("/usuario/listar", (req, res) => UsuarioController.usuarioLista(req, res));
router.delete("/usuario/deletar/:id", (req, res) => UsuarioController.usuarioDeletarAsync(req, res));

module.exports = router;
