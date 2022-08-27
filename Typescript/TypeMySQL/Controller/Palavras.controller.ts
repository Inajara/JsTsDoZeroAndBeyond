import { Request, Response } from "express";
import { PalavrasModel } from "../Models/Palavras.model";

class PalavraController{
    async findAll(req: Request, res: Response){
        const listaPalavras = await PalavrasModel.findAll()
        return listaPalavras.length > 0 ? res.status(200).json(listaPalavras) : res.status(204).json()
    }
    async findById(req: Request, res: Response){
        const umaPalavra = await PalavrasModel.findOne({
            where: {
                id: req.params.id
            }
        })
        return umaPalavra ? res.status(200).json(umaPalavra) : res.status(204).json()
    }
    async createPalavra(req: Request, res: Response){
        const novaPalavra = await PalavrasModel.create({
            where: {
                termo: req.body.termo
            }
        })
        return res.status(201).json(novaPalavra)
    }
    async updatePalavra(req: Request, res: Response){
        const PalavraId = req.params
        const editaPalavra = await PalavrasModel.update(req.body, {where: {
            id: PalavraId
        }})
        return res.status(204).json(editaPalavra)
    }
    async deletePalavra(req: Request, res: Response){
        const PalavraId = req.params
        const deletaPalavra = await PalavrasModel.destroy({where: {
            id: PalavraId
        }})
        return res.status(204).json(deletaPalavra)

    }
}

export default new PalavraController()