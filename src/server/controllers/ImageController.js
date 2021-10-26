const router = require("express").Router()
const multer = require("multer")
const {storage} = require("../services/ImageService")
const {imageFilter} = require("../utils/ImageFilterUtils")
const ImageUtils = require("../utils/ImageUtils")

router.post("/upload", async(req, res) => {
    try {
        const upload = multer({storage: storage, fileFilter: imageFilter}).single("image")

        upload(req, res, async function(err) {
            let filePath = ""

            if (!req.file) {
                return res.status(200).send({success: false})
            }
            
            //filePath = "/upload/" + req.file.filename
            const newImage = (await ImageUtils.compress(req.file)).split("\\")
            filePath = "/upload/" + newImage[newImage.length - 1]

            if (req.imageFilter) {
                return res.send(req.imageFilter)
            } else if (err) {
                return res.send(err)
            }

            return res.status(200).send({success: true, data: true, imageUrl: filePath})
        })
    } catch (error) {
        return res
            .status(500)
            .send({
                success: false,
                error: "an error occurred while processing the request"
            })
    }
})

module.exports = router