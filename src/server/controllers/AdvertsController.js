const router = require("express").Router()

// Mapeado em "/adverts"

router.get("/", async(req, res) => {
    return res.send("/adverts")
})

module.exports = router