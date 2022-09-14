import mongoose from "mongoose"
import { Schema } from 'mongoose'

const usuarioModel = new Schema({
    nome: {
      type: String,
      required: true,
      maxlength: 200,
      minlength: 3
  },
    nome_usuario: {
      type: String,
      required: true,
      maxlength: 100,
      minlength: 3,
      unique: true
  },
    email: {
      type: String,
      required: true
  },
    senha: {
      type: String,
      require: true,
      maxlenght: 30,
      minlenght: 8
    },
    data_nasc: {
      type: Date,
      required: true
  },
    localizado_em: {
      type: String,
      required: true
  },
  moderador: {
    type: Boolean,
    default: false
  },
  especialidade: {
    type: String
  },
  imagem: String,
    membro_desde:{
      type: Date,
      default: Date.now
  }
})

export default mongoose.model('Usuarios', usuarioModel)