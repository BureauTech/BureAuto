const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookmarksShema = new Schema({
    _id: {
        type: mongoose.ObjectId()
    },
    codAnuncio: {
        type: String,
        requeided: true
    },
    userId: {
        type: mongoose.ObjectId,
        requeided: true
    }
})

mongoose.model("bookmarks", bookmarksShema)