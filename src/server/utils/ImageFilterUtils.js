module.exports = {
    imageFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|jfif|webp)$/)) {
            req.fileValidationError = "Only image files are allowed!"
            return cb(new Error("Only image files are allowed!"), false)
        }
        cb(null, true)
    }
}