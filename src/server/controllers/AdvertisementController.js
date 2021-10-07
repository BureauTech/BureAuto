const router = require("express").Router()
const {authenticate} = require("../services/AuthService")
const AdvertisementService = require("../services/AdvertisementService")

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
        debugger
        const {csvFile} = req.files
        const user = req.user.use_cod
        await AdvertisementService.registerAdvertisement(csvFile.tempFilePath, user)
        return res.status(200).send({success: true})
    } catch (error) {
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})


router.put("/edit", authenticate, async(req, res) => {
    try { 
        const adv_edt = req.body
        AdvertisementService.editAdvertisement(adv_edt)
        return res.status(200).send({success: true})
    } catch (error) {
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.delete("/:adv_cod", authenticate, async(req, res) => {
    try { 
        const {adv_cod} = req.params
        const result = await AdvertisementService.deleteAdvertisement(adv_cod, req.user)
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