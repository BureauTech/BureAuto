const router = require("express").Router()
const FavoriteService = require("../services/FavoriteService")


// Mapeado em "/favorite"

router.get("/all/:use_cod", async(req, res) => {
    try {
        const {use_cod} = req.params
        const favorites = await FavoriteService.getAllUserFavorites(use_cod)
        return res.status(200).send({success: true, data: favorites})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.post("/register", async(req, res) => {
    try {
        const {use_cod, adv_cod} = req.body
        const favorite = await FavoriteService.registerFavorite(use_cod, adv_cod)
        return res.status(200).send({success: true, data: favorite})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.delete("/:fav_cod", async(req, res) => {
    try {
        const {fav_cod} = req.params
        await FavoriteService.deleteFavorite(fav_cod)
        return res.status(200).send({success: true})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/report/:adv_use_cod", async(req, res) => {
    try {
        const a = await FavoriteService.getAdvertiserReport(req.params.adv_use_cod)
        return res.status(200).send({success: true, data: a})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/:use_cod/:adv_cod", async(req, res) => {
    try {
        const {use_cod, adv_cod} = req.params
        const favorite = await FavoriteService.getFavorite(use_cod, adv_cod)
        return res.status(200).send({success: true, data: favorite})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router