const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

//analise de execução
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extends: false }))
app.use(bodyParser.json())

app.use((req,res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header, Origin, X-Requrested-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET')
        return res.status(200).send({})
    }
    next()
})

//rotas
const rotaPalavras = require('./Routes/Palavras')
app.use('/palavras', rotaPalavras)

//tratamento de erros de rota
app.use((req,res,next) => {
    const erro = new Error('Palavra não encontrada')
    erro.status = 404
    next(erro)
})

app.use((error,req,res,next) => {
    res.status(error.status || 500)
    return res.send({
        message: error.message
    })
})

module.exports = app