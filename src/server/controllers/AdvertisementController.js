const router = require("express").Router()
const Repository = require("../database/Repository")
const {authenticate} = require("../services/AuthService")
const AdvertisementService = require("../services/AdvertisementService")

// Mapeado em "/advertisement"

router.get("/all", async(req, res) => {
    try {
        const RepositoryAdvertisement= await Repository.get(Repository.Advertisement)
        const advertisements = await RepositoryAdvertisement.find({relations: ["Manufacturer"]})
        return res.status(200).send({success: true, data: advertisements})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.post("/register", authenticate, async(req, res) => {
    try {
        const {csvFile} = req.files
        await AdvertisementService.registerAdvertisement(csvFile.tempFilePath)
        return res.status(200).send({success: true})
    } catch (error) {
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router