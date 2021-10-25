const router = require("express").Router()
const AdvertisementService = require("../services/AdvertisementService")
const FavoriteService = require("../services/FavoriteService")
const UserService = require("../services/UserService")

// Mapeado em "/administrator"

router.get("/", async(req, res) => {
    const {user} = req

    try {
        const users = await UserService.getAllUsers(user.use_cod)
        return res.status(200).send({success: true, data: users})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.put("/", async(req, res) => {
    const {user} = req.body
    
    try {
        await UserService.updateUser(user)
        return res.status(200).send({success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.delete("/:user_id", async(req, res) => {
    const {user_id} = req.params
    
    try {
        await UserService.deleteUser(user_id)
        return res.status(200).send({success: true})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/report/status", async(req, res) => {
    try {
        const report = await AdvertisementService.getStatusReport()
        return res.status(200).send({success: true, data: report})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/report/favorite", async(req, res) => {
    try {
        const percentage = await FavoriteService.getAdminReport()
        return res.status(200).send({success: true, data: percentage})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/report/view-contact", async(req, res) => {
    try {
        const report = await AdvertisementService.getAdminReportViewContact()
        return res.status(200).send({success: true, data: report})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/report/soldByCategory", async(req, res) => {
    try {
        const report = await AdvertisementService.getSoldByCategoryAdminReport()
        return res.status(200).send({success: true, data: report})

    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router