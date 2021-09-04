const router = require("express").Router()

// Mapeado em "/login"

router.get("/", async(req, res) => {
    return res.send("teste de login")
})

module.exports = router