const mongoose = require('mongoose')

const Post = mongoose.model('Post', {
    titulo: String,
    autor: String,
    texto: String
})

module.exports = Post