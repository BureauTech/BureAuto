const router = require("express").Router()
const AuthService = require("../services/AuthService")

// Mapeado em "/login"

router.post("/", async(req, res) => {
    const {email, password} = req.body
    const user = {email, password}
    if (email == "caique@example.com" && password == "123456") {
        AuthService.generateToken(user, res)
        return res.send("foi")
    }
    return res.send("digita certo ai carai")
})

module.exports = router