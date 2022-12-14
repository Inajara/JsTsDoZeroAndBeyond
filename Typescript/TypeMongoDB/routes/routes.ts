import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import PostController from "../controllers/PostController";
import ComentarioController from "../controllers/ComentarioController";
import UsuarioController from "../controllers/UsuarioController";
import UsuarioAuthLogin from "../auth/UsuarioAuthLogin";
import { uploadOptions }  from '../middleware/uploadImagem';
require('dotenv').config()

const router = Router()

router.use((req: Request, res: Response, next) => {
    console.log(req.method, req.url, res.statusCode)
    next()
})

//homePage e autenticacao
router.get('/', (req: Request, res: Response, next) =>{
    res.json({message: "Bem-vindo à API"})
})
router.post('/login', UsuarioAuthLogin.usuarioLogin)

//protecao das rotas
function checaToken(req: Request, res: Response, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" })
    }
    try {
      const secret = process.env.SECRET
      jwt.verify(token, secret)
      next()
    } catch (err) {
      res.status(400).json({ msg: "O Token é inválido!" })
    }
}

router.get('/usuarios', checaToken, UsuarioController.listaUsuarios)
router.get('/posts', checaToken, PostController.listaPosts)
router.get('/comentarios', checaToken, ComentarioController.listaComentarios)
router.get('/usuarios/:id', checaToken, UsuarioController.usuarioId)
router.get('/posts/:id', checaToken, PostController.postId)
router.get('/comentarios/:id', checaToken, ComentarioController.comentarioId)
router.get('/usuarios/nome_usuario/:nome_usuario', checaToken, UsuarioController.usuarioNickname)
router.get('/posts/nome_usuario/:nome_usuario', checaToken, PostController.postPorUsuario)
router.get('/posts/titulo/:titulo', checaToken, PostController.postPorTitulo)
router.get('/comentarios/nome_usuario/:nome_usuario', checaToken, ComentarioController.comentarioPorUsuario)
router.get('/comentarios/post/:post', checaToken, ComentarioController.comentarioPorPost)

router.post('/usuarios', uploadOptions.single('imagem'), UsuarioController.novoUsuario)
router.post('/posts', checaToken, uploadOptions.single('imagem'), PostController.novoPost)
router.post('/comentarios', checaToken, ComentarioController.novoComentario)

router.patch('/usuarios/:id', checaToken, uploadOptions.single('imagem'), UsuarioController.atualizaUsuario)
router.patch('/posts/:id', checaToken, uploadOptions.single('imagem'), PostController.atualizaPost)
router.patch('/comentarios/:id', checaToken, ComentarioController.atualizaComentario)

router.delete('/usuarios/:id', checaToken, UsuarioController.excluiUsuario)
router.delete('/posts/:id', checaToken, PostController.excluiPost)
router.delete('/comentarios/:id', checaToken, ComentarioController.excluiComentario)

export default router