import express, { json, Request, Response, NextFunction } from 'express'
import "express-async-errors"
import { AppDbSettings } from '../database/db'
import router from '../routes/routes'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'

const PORT = process.env.PORT || 8080
const app = express()

//conexao com banco
AppDbSettings

app.listen(PORT)
app.use(json())
app.use("/public", express.static(path.join(__dirname, '../public')))

//permissoes cors
var corsOptions = {
    origin: ['http://localhost:4200', 'http://localhost:8080/docs'],
    optionsSuccessStatus: 200,
    methods: "GET, PATCH, POST, DELETE, PUT, OPTIONS"
}
app.use(cors(corsOptions))

console.log(`Servidor rodando na porta ${PORT}`)
app.use(bodyParser.urlencoded({extended: true,}))
app.use(bodyParser.json())

//rotas
app.use(router)

//tratamento de erros
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	return res.json({
		status: "Error",
		message: error.message
	})
})

//documentação
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Desafio Fórum Interaktion",
      version: "1.0.0",
      description: "Aplicação para o desafio do curso de extensão usando Nodejs, Angular e MongoDB(Atlas)"
    },
    servers: [
      {
        url: "http://localhost:8080/"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
  },
  apis: ["./controllers/*.ts", "./auth/*.ts"]
}
const specs = swaggerJSDoc(options)
router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs))