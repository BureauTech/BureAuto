const router = require("express").Router()

// Mapeado em "/advert"

router.get("/", async(req, res) => {
    return res.send("/adverts")
})

module.exports = router