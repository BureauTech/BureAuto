const router = require("express").Router()

// Mapeado em "/message"

router.get("/", async(req, res) => {
    return res.send("/mensagens")
})

module.exports = router