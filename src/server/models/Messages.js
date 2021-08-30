const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messagesShema = new Schema({
    _id: {
        type: mongoose.ObjectId()
    },
    anunciante: {
        type: String,
        requeided: true
    },
    cliente: {
        type: String,
        requeided: true
    },
    codAnuncio: {
        type: String,
        requeided: true
    },
    mensagem: {
        type: subSchema,
        default: {}
    }
})

mongoose.model("messages", messagesShema)