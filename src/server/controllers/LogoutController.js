const router = require("express").Router()
const AuthService = require("../services/AuthService")

// Mapeado em "/logout"

router.get("/", async(req, res) => {
    res.clearCookie(AuthService.cookieName)
    return res.status(200).send({success: true})
})

module.exports = router