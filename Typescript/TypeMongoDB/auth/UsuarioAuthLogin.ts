import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import usuarioModel from "../models/UsuarioModel";
require('dotenv').config()

const UsuarioAuthLogin = {
/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - nome_usuario
 *         - senha
 *       properties:
 *         nome_usuario:
 *           type: string
 *         senha:
 *           type: string
 */

 /**
  * @swagger
  * tags:
  *   name: Login
  */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Login'
 *       404:
 *         description: Usuário não encontrado!
 *       422:
 *         description: Senha ou usuário inválidos!
 */
    async usuarioLogin(req: Request, res: Response) {
        const { nome_usuario, senha } = req.body
        //checa se usuario ja existe
        const usuarioJaExiste = await usuarioModel.findOne({ nome_usuario: nome_usuario })
        if(!usuarioJaExiste){
            return res.status(404).json({ message: "Usuário não encontrado!" })
        }
        //verificação da senha
        const checaSenha = await bcryptjs.compare(senha, usuarioJaExiste.senha)
        if (!checaSenha) {
            return res.status(422).json({ message: "Senha ou usuário inválidos!" });
        }
        //refresh token
        const segredoUsuario = process.env.SECRET
        const tokenUsuario = jwt.sign({ id: usuarioJaExiste._id }, segredoUsuario)
        return res.status(200).json(tokenUsuario)
    }
}

export default UsuarioAuthLogin