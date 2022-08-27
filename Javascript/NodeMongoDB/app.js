const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

//imports
const database = require('./database/database')
const postRoutes = require('./routes/posts.routes')

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
app.get('/', (req, res) => {
    res.json({message: 'ok'})
})

app.use('/posts', postRoutes)

module.exports = app