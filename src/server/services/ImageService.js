const multer = require("multer")
const path = require("path")
const fs = require("fs")

module.exports = {

    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "./resources/img/upload")
        },
    
        filename: function(req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }),

    deleteImage: function(pathImage) {
        try {
            fs.unlinkSync(pathImage)
            return true
        } catch (error) {
            return false
        }
    }
}