import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import usuarioModel from "../models/UsuarioModel";

const UsuarioController = {
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuários:
 *       type: object
 *       required:
 *         - nome
 *         - nome_usuario
 *         - email
 *         - senha
 *         - data_nasc
 *         - localizado_em
 *       properties:
 *         nome:
 *           type: string
 *         nome_usuario:
 *           type: string
 *         email:
 *           type: string
 *         senha:
 *          type: string
 *         data_nasc:
 *          type: string
 *         localizado_em:
 *          type: string
 *         especialidade:
 *          type: string
 *         moderador:
 *          type: boolean
 */

 /**
  * @swagger
  * tags:
  *   name: Usuários
  */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuários'
 *       404:
 *          description: Parece que não tem ninguém...
 */
    async listaUsuarios(req: Request, res: Response) {
        try {
            let usuarios = await usuarioModel.find()
            return res.json(usuarios)
        } catch (error) {
            return res.status(404).send({ message: error.message })
        }
    },
/**
 * @swagger
 * /usuarios/{_id}:
 *   get:
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuários'
 *       404:
 *         description: Parece que não tem ninguém...
 */
    async usuarioId(req: Request, res: Response) {
        try {
            const { id } = req.params
            let usuario = await usuarioModel.findById(id)
            return res.json(usuario)
        } catch (error) {
            return res.status(404).send({ message: error.message })
        }
    },
/**
 * @swagger
 * /usuarios/nome_usuario/{nome_usuario}:
 *   get:
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: nome_usuario
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuários'
 *       404:
 *         description: Parece que não tem ninguém...
 */
 async usuarioNickname(req: Request, res: Response) {
    try {
        const { nome_usuario } = req.params
        let usuario = await usuarioModel.findOne({nome_usuario: nome_usuario})
        return res.json(usuario)
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
},
/**
 * @swagger
 * /usuarios:
 *   post:
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuários'
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuários'
 *       422:
 *          description: Por algum motivo, não foi possível cadastrar
 *       500:
 *         description: Ocorreu um erro
 */
    async novoUsuario(req: Request, res: Response) {
        try {
            const { nome, nome_usuario, email, senha, data_nasc, moderador, especialidade, localizado_em } = req.body

            const basePath = `${req.protocol}://${req.get("host")}/public/`
            let filename = req.file.filename
            
            let dataCheck = new Date(data_nasc)
            if( !(dataCheck.getTime() <= Date.now() - 6570 * (24 * 60 * 60 * 1000) )) {
                return res.send("Menor de idade proibido")
            }
            
            const usuarioJaExiste = await usuarioModel.findOne({ nome_usuario: nome_usuario })
            if(usuarioJaExiste){
                return res.status(422).json({ message: "Usuário já cadastrado" })
            }
            
            const senhaCrypta = await bcryptjs.genSalt(12)
            const senhaHash = await bcryptjs.hash(senha, senhaCrypta)
            
            const novoUsuario = new usuarioModel({ 
                nome, 
                nome_usuario, 
                email, 
                senha: senhaHash,
                moderador,
                especialidade, 
                data_nasc, 
                localizado_em,
                imagem: `${basePath}${filename}`
            })
            let usuario = await novoUsuario.save()
            return res.json(usuario)
        } catch (error) {
            return res.status(422).send({ message: error.message })
        }
    },
/**
 * @swagger
 * /usuarios/{_id}:
 *  patch:
 *    tags: [Usuários]
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
 *            $ref: '#/components/schemas/Usuários'
 *    responses:
 *      200:
 *        description: Atualização bem sucedida
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuários'
 *      422:
 *        description: Por algum motivo, não foi possível atualizar os dados
 *      500:
 *        description: Ocorreu um erro
 */
    async atualizaUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { nome, nome_usuario, email, senha, moderador, especialidade, localizado_em } = req.body
            
            const usuarioExistente = await usuarioModel.findById(id)

            if(!usuarioExistente) {
                return res.sendStatus(404).send({ message: Error })
            }

            let usuario = await usuarioModel.findByIdAndUpdate(id, {
                nome: nome,
                nome_usuario: nome_usuario,
                email: email,
                senha: senha,
                moderador: moderador,
                especialidade: especialidade,
                localizado_em: localizado_em,
                imagem: usuarioExistente.imagem
            })
            return res.json(usuario)
        } catch (error) {
            return res.status(422).send({ message: error.message })
        }
    },
/**
 * @swagger
 * /usuarios/{_id}:
 *   delete:
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Usuário foi excluído
 *       422:
 *         description: O usuário em questão ou não existe, ou não foi possível excluir
 */
    async excluiUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params
            let usuario = await usuarioModel.findByIdAndDelete(id)
            return res.json(usuario)
        } catch (error) {
            return res.status(422).send({ message: error.message })
        }
    }
}

export default UsuarioController