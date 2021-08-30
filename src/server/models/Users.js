const mongoose = require("mongoose")
const Schema = mongoose.Schema

const usersShema = new Schema({
    _id: {
        type: mongoose.ObjectId()
    },
    nome: {
        type: String,
        requeided: true
    },
    cpf: {
        type: Number,
        requeided: true
    },
    cnpj: {
        type: Number,
        requeided: true
    },
    apelido: {
        type: String,
        requeided: true
    },
    email: {
        type: String,
        requeided: true
    },
    telefone: {
        type: String,
        requeided: true
    },
    endereço: {
        type: String,
        requeided: true
    },
    senha: {
        type: String,
        requeided: true
    }
})

mongoose.model("users", usersShema)