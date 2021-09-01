const mongoose = require("mongoose")
const Schema = mongoose.Schema

const advertsShema = new Schema({
    _id: {
        type: mongoose.ObjectId()
    },
    cod: {
        type: String,
        requeided: true
    },
    teste: {
        type: Int16Array,
        
    },
    fab: {
        type: String,
        requeided: true
    },
    descMarca: {
        type: String,
        requeided: true
    },
    descModelo: {
        type: String,
        requeided: true
    },
    ano: {
        type: Number,
        requeided: true
    },
    valor: {
        type: mongoose.Decimal128,
        requeided: true
    },
    anunciante: {
        type: mongoose.ObjectId,
        requeided: true
    },
    active: {
        type: String,
        requeided: true
    },
    _stopped_at: {
        type: String,
        r,equeided: true
    },
    _created_at: {
        type: String,
        requeided: true
    },
    sold: {
        type: String,
        requeided: true
    }
})

mongoose.model("adverts", advertsShema)