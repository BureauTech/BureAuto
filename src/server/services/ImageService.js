const multer = require("multer")
const path = require("path")

module.exports = {

    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "./resources/img/upload")
        },
    
        filename: function(req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })
        
}