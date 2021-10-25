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

router.get("/all/:filters", async(req, res) => {
    try {
        let {filters} = req.params
        if(typeof filters === "string") filters = JSON.parse(filters)
        let advertisements = await AdvertisementService.getAllAdvertisement()
        if(filters.brand || filters.model || filters.yearManModel || filters.valueMin || filters.valueMax) {
            advertisements = await AdvertisementService.filterAdvertisements(advertisements, filters)
        }
        const returnFilters = await AdvertisementService.returnFilters(advertisements)
        return res.status(200).send({success: true, data: advertisements, filters: returnFilters})
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

router.get("/allAdsByUser/:adv_use_cod", async(req, res) => {
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
        const response = await AdvertisementService.registerAdvertisement(csvFile.tempFilePath, user)
        return res.status(200).send({success: true, csvError: response})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})


router.put("/edit", async(req, res) => {
    try {
        await AdvertisementService.editAdvertisement(req.body)
        return res.status(200).send({success: true})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
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

router.get("/search/:term/:filters", async(req, res) => {
    try {
        let {term, filters} = req.params
        if(typeof filters === "string") filters = JSON.parse(filters)
        let advertisements = await AdvertisementService.searchAdvertisement(term)
        if(filters.brand || filters.model || filters.yearManModel || filters.valueMin || filters.valueMax) {
            advertisements = await AdvertisementService.filterAdvertisements(advertisements, filters)
        }
        const returnFilter = await AdvertisementService.returnFilters(advertisements)
        return res.status(200).send({success: true, data: advertisements, filters: returnFilter})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.put("/views/:adv_cod", async(req, res) => {
    try {
        const updated = await AdvertisementService.incrementViews(req.params.adv_cod)
        if (updated) {
            return res.status(200).send({success: true})
        }
        return res.status(400).send({success: false, error: "advertisement code not found"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/report/view-contact", authenticate, async(req, res) => {
    try {
        const report = await AdvertisementService.getReportViewContact(req.user.use_cod)
        return res.status(200).send({success: true, data: report})

    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/report/sold", authenticate, async(req, res) => {
    try {
        const report = await AdvertisementService.getSoldAdvertisementsReport(req.user.use_cod)
        return res.status(200).send({success: true, data: report})

    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/report/soldByCategory", authenticate, async(req, res) => {
    try {
        const report = await AdvertisementService.getSoldByCategoryReport(req.user.use_cod)
        return res.status(200).send({success: true, data: report})

    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router