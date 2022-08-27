const mongoose = require('mongoose')
require('dotenv').config()

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@testeapi.rj3xxbj.mongodb.net/testeapi?retryWrites=true&w=majority`)
.then(() => { console.log("Conectado ao banco com sucesso") })
.catch((err) => { console.log(err) })

module.exports = mongoose