const router = require("express").Router()
const ManufacturerService = require("../services/ManufacturerService")

router.get("/all", async(req, res) => {
    try {
        const manufacturer = await ManufacturerService.getAllManufacturer()
        return res.status(200).send({success: true, data: manufacturer})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router