const router = require("express").Router()
const AuthService = require("../services/AuthService")
const Connection = require("../database/Connection")

// Mapeado em "/login"

router.post("/", async(req, res) => {
    try {
        const {email, password} = req.body
        const connection = await Connection

        const validate = (await connection
            .query("select validar_acesso_usuario($1, $2) cod", [email, password]))[0]

        if (!validate.cod) {
            return res.status(200).send({success: false, error: "incorrect username or password"})
        }

        const user = (await connection
            .query("select * from descriptografar_usuario($1)", [validate.cod]))[0]

        AuthService.generateToken(user, res)
        return res.status(200).send({success: true})

    } catch (error) {
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router