const router = require("express").Router()

// Mapeado em "/auth"

router.get("/", async(req, res) => {
    const user = req.user
    return res.status(200).send({success: true, user})
})

module.exports = router