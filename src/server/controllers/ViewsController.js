const router = require("express").Router()

// Mapeado em "/views"

router.get("/", async(req, res) => {
    return res.send("/views")
})

module.exports = router