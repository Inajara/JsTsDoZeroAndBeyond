const express = require('express')
const router = express.Router()

//imports
const database = require('../Data/db')
const palavra = require('../Models/Palavra')

database.sync()

    //Get e Get por id
    router.get('/', async (req, res, next) => {
        const listaPalavras = await palavra.findAll()
        res.status(200).send(
            listaPalavras
        )
    })

    router.get('/:id', async (req, res, next) => {
        const palavraId = await palavra.findByPk(req.params.id)
        if(palavraId === "null"){
            res.status(404).send({
                message: "Palavra não cadastrada"
            })
        }
        res.status(200).send(
            palavraId
        )
    })

    //Post
    router.post('/', (req, res, next) => {
        const novaPalavra = palavra.create({
            termo: req.body.termo
        })
        res.status(201).send({
           message: "Palavra cadastrada com sucesso"
        })
        novaPalavra.save()
    })

    //Put
    router.put('/:id', (req, res, next) => {
        const palavraId = req.params.id
        if(palavraId === "null"){
            res.status(404).send({
                message: "Palavra não cadastrada"
            })
        }
        res.status(200).send({
            message: "Palavras",
            id: palavraId
        })
    })

    //Delete
    router.delete('/:id', (req, res, next) => {
        const palavraId = req.params.id
        if(palavraId === "null"){
            res.status(404).send({
                message: "Palavra não existe"
            })
        }
        res.status(200).send({
            message: "Apagado",
            id: palavraId
        })
        palavraId.destroy()
    })

module.exports = router