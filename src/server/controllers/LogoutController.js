const router = require("express").Router()
const AuthService = require("../services/AuthService")

// Mapeado em "/logout"

router.post("/", async(req, res) => {
    res.clearCookie(AuthService.cookieName)
    return res.send("deslogado com sucesso!")
})

module.exports = router