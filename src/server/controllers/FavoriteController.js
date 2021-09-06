const router = require("express").Router()

// Mapeado em "/favorite"

router.get("/", async(req, res) => {
    return res.send("/favorites")
})

module.exports = router