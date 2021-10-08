const router = require("express").Router()
const {authenticate} = require("../services/AuthService")
const AdvertisementService = require("../services/AdvertisementService")
const {deleteImage} = require("../services/ImageService")

// Mapeado em "/advertisement"

router.get("/total-advertisements", async(req, res) => {
    try {
        const total = await AdvertisementService.getNumberOfAds()
        return res.json({success: true, total: total.total_ads})
    }  catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/all", async(req, res) => {
    try {
        const advertisements = await AdvertisementService.getAllAdvertisement()
        return res.status(200).send({success: true, data: advertisements})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/values", async(req, res) => {
    try {
        const min = await AdvertisementService.getMinAdvertisementValue()
        const max = await AdvertisementService.getMaxAdvertisementValue()
        return res.status(200).send({success: true, data: [min, max]})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/all/:adv_use_cod", async(req, res) => {
    try {
        const {adv_use_cod} = req.params
        const advertisements = await AdvertisementService.getAllAdvertisementByUser(adv_use_cod)
        return res.status(200).send({success: true, data: advertisements})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/:adv_cod", async(req, res) => {
    try {
        const {adv_cod} = req.params
        const advertisement = await AdvertisementService.getAdvertisement(adv_cod)
        return res.status(200).send({success: true, data: advertisement})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.post("/register", authenticate, async(req, res) => {
    try {
        const {csvFile} = req.files
        const user = req.user.use_cod
        await AdvertisementService.registerAdvertisement(csvFile.tempFilePath, user)
        return res.status(200).send({success: true})
    } catch (error) {
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})


router.put("/edit", async(req, res) => {
    try {
        const advertisement = AdvertisementService

        console.log(req)

        const adv_edt = {
            adv_cod: req.body.adv_cod,
            adv_model_description: req.body.adv_model_description,
            adv_man_cod: req.body.adv_man_cod,
            adv_value: req.body.adv_value,
            adv_year_manufacture: req.body.adv_year_manufacture,
            adv_year_model: req.body.adv_year_model,
            adv_description: req.body.adv_description,
            adv_sty_cod: req.body.adv_sty_cod,
            adv_images: req.body.adv_images
        }

        const result = advertisement.editAdvertisement(adv_edt)

        return res.status(200).send({success: true, data: result})

    } catch (error) {
        return res
            .status(500)
            .send({
                success: false,
                error: "an error occurred while processing the request"
            })
    }
})

router.delete("/:adv_cod", authenticate, async(req, res) => {
    try { 
        const {adv_cod} = req.params
        const advertisement = await AdvertisementService.getAdvertisement(adv_cod)
        const result = await AdvertisementService.deleteAdvertisement(adv_cod, req.user)

        deleteImage(`./resources/img${advertisement.adv_images}`)
        if (result) {
            return res.status(200).send({success: true})
        }
        return res.status(404).send({success: false, error: "advertisement not found"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/search/:term", async(req, res) => {
    try {
        const {term} = req.params
        const advertisement = await AdvertisementService.searchAdvertisement(term)
        return res.status(200).send({success: true, data: advertisement})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router