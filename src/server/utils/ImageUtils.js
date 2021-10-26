const fs = require("fs")
const sharp = require("sharp")

const ImageUtils = module.exports = {
    compress: async function(file, size) {
        const newPath = file.path.split(".")[0] + ".webp"
        const {orientation} = sharp(file.path).metadata
        const buffer = await sharp(file.path)
            .resize(size)
            .rotate()
            .toFormat("webp")
            .webp({quality: 80})
            .withMetadata({orientation})
            .toBuffer()
        
        try {
            fs.accessSync(file.path)
            fs.unlinkSync(file.path)
        } catch (error) {
            console.log(error)
        }
        fs.writeFileSync(newPath, buffer)
        return newPath
    }
}