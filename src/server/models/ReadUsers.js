const mongoose = require("mongoose")
const Schema = mongoose.Schema

const readUsersShema = new Schema({
    _id: {
        type: mongoose.ObjectId()
    },
    apelido: {
        type: String,
        requeided: true
    },
    endereco: {
        cidade: {
            type: String,
            require: true
        }
    }
})

mongoose.model("readusers", readUsersShema)