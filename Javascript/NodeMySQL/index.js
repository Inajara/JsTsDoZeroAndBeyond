const http = require('http')
const app = require('./app')
const PORT = process.env.PORT || 3000

const server = http.createServer(app)
console.log(`Api rodando na porta ${PORT}`)

server.listen(PORT)