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

router.get("/favorites/:fav_use_cod", async(req, res) => {
    try {
        const {fav_use_cod} = req.params
        const favorites = await FavoriteService.getAllFavorites(fav_use_cod)
        return res.status(200).send({success: true, data: favorites})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.post("/register", async(req, res) => {
    try {
        const {adv_cod} = req.body
        const favorite = await FavoriteService.registerFavorite(req.user, adv_cod)
        return res.status(200).send({success: true, data: favorite})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.delete("/:fav_adv_cod", async(req, res) => {
    try {
        const {fav_adv_cod} = req.params
        await FavoriteService.deleteFavorite(fav_adv_cod, req.user)
        return res.status(200).send({success: true})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/report/favorite", async(req, res) => {
    try {
        const percentage = await FavoriteService.getAdvertiserReport(req.user)
        return res.status(200).send({success: true, data: percentage})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.get("/:adv_cod", async(req, res) => {
    try {
        const {adv_cod} = req.params
        const favorite = await FavoriteService.getFavorite(req.user, adv_cod)
        return res.status(200).send({success: true, data: favorite})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router