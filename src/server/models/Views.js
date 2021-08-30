const mongoose = require("mongoose")
const Schema = mongoose.Schema

const viewsShema = new Schema({
    _id: {
        type: mongoose.ObjectId()
    },
    codAnuncio: {
        type: String,
        requeided: true
    },
    qtdeViews: {
        type: Number,
        requeided: true
    }
})

mongoose.model("views", viewsShema)