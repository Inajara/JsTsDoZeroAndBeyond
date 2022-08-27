const { Router } = require('express')
const express = require('express')
const router = express.Router()
const Post = require('../models/Posts')

//get e getby
router.get('/', async (req, res) => {
    const postsList = await Post.find()
    try {
        res.status(200).json(postsList)
    } catch (error) {
        res.status(501).json({message: error.message})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findOne({_id: id})
        res.status(200).json(post)
        if (!post) {
            res.status(422).json({message: 'Não encontrado'})
            return
        }
    } catch (error) {
        res.status(501).json({message: error.message})
    }
})

//post
router.post('/', async (req, res) => {
    const { titulo, autor, texto } = req.body
    if (!titulo || !autor || !texto) {
        res.status(422).json({error: 'Os dados requeridos são obrigatórios!'})
        return
    }
    const post = {
        titulo,
        autor,
        texto
    }
    try {
        await Post.create(post)
        res.status(201).json(post)
    } catch (error) {
        res.status(501).json({message: error.message})
    }
})

//put - patch
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { titulo, autor, texto } = req.body
    const post = {
        titulo,
        autor,
        texto
    }
    try{
        const updatePost = await Post.updateOne({_id: id}, post)
        if(updatePost.matchedCount === 0){
            res.status(422).json({error: 'Não resolvido!'})
            return
        }
        res.status(200).json(updatePost)
    }catch (error){
        res.status(500).json({ error: error })
    }
})

//delete
router.delete('/:id', async (req,res) => {
    const id = req.params.id
    const post = await Post.findOne({_id: id})
    if (!post) {
        res.status(422).json({message: 'Não encontrado'})
        return
    }
    try {
        await Post.deleteOne({_id: id})
        res.status(200).json({message: 'Postagem deletada'})
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router