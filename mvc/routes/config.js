// routes/config.js

// Importa função do express para criar rotas
const { Router } = require("express");
const verificarLogin = require("../middlewares/AuthMiddleware");

// Cria uma instância do roteador do express
const router = Router();

// -----------------------------------
// USUARIO
// -----------------------------------

// Importa o controller do usuário para ter acesso às funções de cadastro, listagem e deleção de usuários
const UsuarioController = require("../controllers/UsuarioController");

// Página inicial
router.get("/", (req, res) => UsuarioController.index(req, res));

// Página de cadastro do usuário
router.get("/usuario/criar", (req, res) => UsuarioController.usuarioCadastrar(req, res));
router.post("/usuario/criar", (req, res) => UsuarioController.usuarioPostarAsync(req, res));

// Página de login do usuário
router.get("/usuario/login", (req, res) => UsuarioController.usuarioLogin(req, res));
router.post("/usuario/login", (req, res) => UsuarioController.usuarioLogarAsync(req, res));

// Página de conversa do usuário
router.get("/usuario/conversa", verificarLogin, (req, res) => UsuarioController.usuarioConversa(req, res));
router.post('/logout', verificarLogin, (req, res) => UsuarioController.usuarioLogout(req, res));

// Página de listagem de usuários
router.get("/usuario/listar", (req, res) => UsuarioController.usuarioLista(req, res));

// Deleta usuário do banco de dados (função)
router.delete("/usuario/deletar/:id", (req, res) => UsuarioController.usuarioDeletarAsync(req, res));

// -----------------------------------
// DOCSCODE AI
// -----------------------------------

const IAController = require('../controllers/DocumentoController');

// Gera documentação técnica
router.post("/usuario/conversa/gerar", verificarLogin, (req, res) => IAController.iaGerarDocumentacaoAsync(req, res));

// Lista documentos gerados
router.get("/usuario/documentos", verificarLogin, (req, res) => IAController.iaListarDocumentosAsync(req, res));

// Busca documento por ID
router.get("/usuario/documentos/:id", verificarLogin, (req, res) => IAController.iaBuscarDocumentoAsync(req, res));

// Deleta documento
router.delete("/usuario/documentos/:id", verificarLogin, (req, res) => IAController.iaDeletarDocumentoAsync(req, res));

// Daqui vai para 'server.js'
module.exports = router;
