const router = require("express").Router()
const AdvertisementService = require("../services/AdvertisementService")

// Mapeado em "/advertisement"

router.post("/register", async(req, res) => {
    try {
        const {csvFile} = req.files
        await AdvertisementService.registerAdvertisement(csvFile.tempFilePath)
    } catch (error) {
        res.status(500).send({success: false})
    }
    return res.status(200).send({success: true})
})

module.exports = router