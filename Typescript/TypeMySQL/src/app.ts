import { ApplicationDbSettings } from './database';
import express, { Application, json } from 'express'
import morgan from 'morgan'
//rotas
import { router } from '../Routes/Palavras.routes'

const PORT = process.env.PORT || 5000

export class App{
    private app: Application
    constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
    }
    async listen(){
        this.app.listen(PORT)
        console.log(`Servidor rodando na porta ${PORT}`)
        await ApplicationDbSettings.sync()
        this.app.use(json())
    }
    middlewares(){
        this.app.use(morgan('dev'))
    }
    routes(){
        this.app.use(router)
    }
}