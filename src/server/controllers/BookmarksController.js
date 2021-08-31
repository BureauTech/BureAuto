const router = require("express").Router()

// Mapeado em "/bookmarks"

router.get("/", async(req, res) => {
    return res.send("/bookmarks")
})

module.exports = router