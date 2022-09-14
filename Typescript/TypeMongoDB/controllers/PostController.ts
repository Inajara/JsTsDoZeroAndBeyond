import { Request, Response } from "express";
import postModel from "../models/PostModel";
import UsuarioModel from "../models/UsuarioModel";

const PostController = {
/**
 * @swagger
 * components:
 *   schemas:
 *     Posts:
 *       type: object
 *       required:
 *         - titulo
 *         - texto
 *         - nome_usuario
 *       properties:
 *         titulo:
 *           type: string
 *         texto:
 *           type: string
 *         imagem:
 *           type: string
 *         nome_usuario:
 *          type: string
 */

 /**
  * @swagger
  * tags:
  *   name: Posts
  */

/**
 * @swagger
 * /posts:
 *   get:
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 *       404:
 *         description: Nada aqui...
 */
    async listaPosts(req: Request, res: Response) {
        try {
            let posts = await postModel.find().populate('nome_usuario')
        return res.json(posts)
        } catch (error) {
            return res.status(404).send({ message: error.message })
        }
    },
/**
 * @swagger
 * /posts/{_id}:
 *   get:
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Post encontrado
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Posts'
 *       404:
 *         description: Nada aqui...
 */
    async postId(req: Request, res: Response) {
        try {
            const { id } = req.params
            let post = await postModel.findById(id).populate('nome_usuario')
            return res.json(post)
        } catch (error) {
            return res.status(404).send({ message: error.message })
        }
    },
/**
 * @swagger
 * /posts/{_id}:
 *   get:
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Post encontrado
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Posts'
 *       404:
 *         description: Nada aqui...
 */
 async postPorTitulo(req: Request, res: Response) {
    try {
        const { titulo } = req.params
        let post = await postModel.findOne({ titulo: titulo }).populate('nome_usuario')
        return res.json(post)
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
},
/**
 * @swagger
 * /posts/nome_usuario/{nome_usuario}:
 *   get:
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: nome_usuario
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Posts encontrados
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Posts'
 *       404:
 *         description: Nada aqui...
 */
 async postPorUsuario(req: Request, res: Response) {
    try {
        const { nome_usuario } = req.params
        const usuario = await UsuarioModel.findOne({ nome_usuario: nome_usuario })
        let post = await postModel.find({ nome_usuario: usuario._id })
        return res.json(post)
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
},
/**
 * @swagger
 * /posts:
 *   post:
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Posts'
 *     responses:
 *       201:
 *         description: Post cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Posts'
 *       422:
 *         description: Por algum motivo, não foi possível cadastrar
 *       500:
 *         description: Ocorreu um erro
 */
    async novoPost(req: Request, res: Response) {
        try {
            const { titulo, nome_usuario, texto } = req.body
            const basePath = `${req.protocol}://${req.get("host")}/public/`
            let filename = req.file.filename
            let post = await postModel.create({
                titulo,
                nome_usuario,texto,
                imagem: `${basePath}${filename}`
            })
            return res.json(post) 
        } catch (error) {
            return res.status(422).send({ message: error.message })
        }
    },
/**
 * @swagger
 * /posts/{_id}:
 *  patch:
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: _id
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Posts'
 *    responses:
 *      200:
 *        description: Atualização bem sucedida
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
 *      422:
 *        description: Por algum motivo, não foi possível atualizar os dados
 *      500:
 *        description: Ocorreu um erro
 */
    async atualizaPost(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { titulo, texto } = req.body
            const basePath = `${req.protocol}://${req.get("host")}/public`
            let filename = req.file.filename
            let post = await postModel.findByIdAndUpdate(id, {
                titulo: titulo,
                texto: texto,
                imagem: `${basePath}${filename}`
            })
        return res.json(post)
        } catch (error) {
            return res.status(422).send({ message: error.message })
        }
    },
/**
 * @swagger
 * /posts/{_id}:
 *   delete:
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: O post foi excluído
 *       422:
 *         description: O post em questão ou não existe, ou não foi possível excluir
 */
    async excluiPost(req: Request, res: Response) {
        try {
            const { id } = req.params
            let post = await postModel.findByIdAndDelete(id)
            return res.json({ message: "Post apagado" })
        } catch (error) {
            return res.status(422).send({ message: error.message })
        }
    }
}

export default PostController