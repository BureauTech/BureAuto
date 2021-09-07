const router = require("express").Router()

// Mapeado em "/auth"

router.get("/", async(req, res) => {
    return res.status(200).send({success: true})
})

module.exports = router