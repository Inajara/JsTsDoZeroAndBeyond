const database = require('../Database/db')

const palavraSchema = new database.Schema({
    id: Int32Array,
    termo: String
})

const Palavra = database.model('palavras', palavraSchema)

module.exports = Palavra