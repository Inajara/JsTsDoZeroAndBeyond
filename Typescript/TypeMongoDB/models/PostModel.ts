import mongoose from "mongoose"
import { Schema } from 'mongoose'

const postModel = new Schema({
    titulo: {
      type: String,
      required: true
  },
    texto: {
      type: String,
      required: true
  },
    imagem: String,
    nome_usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
      require: true
    },
    data_postagem: {
      type: Date,
      default: Date.now
    }
})

export default mongoose.model('Posts', postModel)