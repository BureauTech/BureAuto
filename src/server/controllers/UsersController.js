const router = require("express").Router()

// Mapeado em "/users"

router.get("/", async(req, res) => {
    return res.send("/users")
})

module.exports = router