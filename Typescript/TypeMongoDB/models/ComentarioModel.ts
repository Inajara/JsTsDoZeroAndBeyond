import mongoose from "mongoose"
import { Schema } from 'mongoose'

const comentarioModel = new Schema({
  nome_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios',
    require: true
  },
    texto: {
      type: String,
      require: true
  },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts',
      require: true
    },
    data_comentario: {
      type: Date,
      default: Date.now
    }
})

export default mongoose.model('Comentarios', comentarioModel)