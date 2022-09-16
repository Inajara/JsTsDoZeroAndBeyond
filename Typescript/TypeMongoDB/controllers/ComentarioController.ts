import { Request, Response } from "express";
import comentarioModel from "../models/ComentarioModel";
import PostModel from "../models/PostModel";
import UsuarioModel from "../models/UsuarioModel";

const ComentarioController = {
/**
 * @swagger
 * components:
 *   schemas:
 *     Comentários:
 *       type: object
 *       required:
 *         - nome_usuario
 *         - texto
 *         - post
 *       properties:
 *         nome_usuario:
 *           type: string
 *         texto:
 *           type: string
 *         post:
 *          type: string
 */

 /**
  * @swagger
  * tags:
  *   name: Comentários
  */

/**
 * @swagger
 * /comentarios:
 *   get:
 *     tags: [Comentários]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentários'
 *       404:
 *         description: Nada aqui...
 */
    async listaComentarios(req: Request, res: Response) {
        try {
            let comentarios = await comentarioModel.find().populate('nome_usuario').populate('post')
            return res.json(comentarios)
        } catch (error) {
            return res.status(404).send({ message: error.message })
        }
    },
/**
 * @swagger
 * /comentarios/{_id}:
 *   get:
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Comentário encontrado
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentários'
 *       404:
 *         description: Nada aqui...
 */
    async comentarioId(req: Request, res: Response) {
        try {
            const { id } = req.params
            let comentario = await comentarioModel.findById(id).populate('nome_usuario').populate('post')
            return res.json(comentario)
        } catch (error) {
            return res.status(404).send({ message: error.message })
        }
    },
/**
 * @swagger
 * /comentarios/nome_usuario/{nome_usuario}:
 *   get:
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: nome_usuario
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Comentário encontrado
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentários'
 *       404:
 *         description: Nada aqui...
 */
 async comentarioPorUsuario(req: Request, res: Response) {
    try {
        const { nome_usuario } = req.params
        const usuario = await UsuarioModel.findOne({ nome_usuario: nome_usuario })
        let comentario = await comentarioModel.find({ nome_usuario: usuario._id }).populate('nome_usuario').populate('post')
        return res.json(comentario)
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
},
/**
 * @swagger
 * /comentarios/post/{post}:
 *   get:
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: post
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Comentário encontrado
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentários'
 *       404:
 *         description: Nada aqui...
 */
 async comentarioPorPost(req: Request, res: Response) {
    try {
        const { post } = req.params
        //const postagem = await PostModel.findOne({ post: post })
        let comentario = await comentarioModel.find({ post: post }).populate('nome_usuario').populate('post')
        return res.json(comentario)
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
},
/**
 * @swagger
 * /comentarios:
 *   post:
 *     tags: [Comentários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentários'
 *     responses:
 *       201:
 *         description: Comentário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentários'
 *       422:
 *         description: Por algum motivo, não foi possível cadastrar
 *       500:
 *         description: Ocorreu um erro
 */
    async novoComentario(req: Request, res: Response) {
        try {
            const { nome_usuario, texto, post } = req.body
            let comentario = await comentarioModel.create(req.body)
            return res.json(comentario)
        } catch (error) {
            return res.status(422).send({ message: error.message })
        }
    },
/**
 * @swagger
 * /comentarios/{_id}:
 *  patch:
 *    tags: [Comentários]
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
 *            $ref: '#/components/schemas/Comentários'
 *    responses:
 *      200:
 *        description: Atualização bem sucedida
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comentários'
 *      422:
 *        description: Por algum motivo, não foi possível atualizar os dados
 *      500:
 *        description: Ocorreu um erro
 */
    async atualizaComentario(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { nome_usuario, texto, post } = req.body
            let comentario = await comentarioModel.findByIdAndUpdate(id, {
                nome_usuario: nome_usuario,
                texto: texto,
                post: post
            })
        return res.json(comentario)
        } catch (error) {
            return res.status(422).send({ message: error.message })
        }
    },
/**
 * @swagger
 * /comentarios/{_id}:
 *   delete:
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Comentário foi excluído
 *       422:
 *         description:  O comentário em questão ou não existe, ou não foi possível excluir
 */
    async excluiComentario(req: Request, res: Response) {
        try {
            const { id } = req.params
            let comentario = await comentarioModel.findByIdAndDelete(id)
            return res.json(comentario)
        } catch (error) {
            return res.status(422).send({ message: error.message })
        }
    }
}

export default ComentarioController