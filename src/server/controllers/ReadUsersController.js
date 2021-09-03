const router = require("express").Router()

// Mapeado em "/readUsers"

router.get("/", async(req, res) => {
    return res.send("/readUsers")
})

module.exports = router