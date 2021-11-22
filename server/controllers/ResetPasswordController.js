const router = require("express").Router()
const Connection = require("../database/Connection")
const UserService = require("../services/UserService")
const {authenticate, generateToken} = require("../services/AuthService")

// Mapeado em "/reset-password"

router.post("/", async(req, res) => {
    try {
        const {email} = req.body
        const connection = await Connection

        const validate = (await connection
            .query("select get_user_cod_by_email($1) cod", [email]))[0]

        if(!validate.cod) {
            return res.status(200).send({success: false, error: "email not found"})
        }

        const user = (await connection
            .query("select * from decrypt_user($1)", [validate.cod]))[0]

        await UserService.resetUserPassword(user)
        return res.status(200).send({success: true})

    } catch (error) {
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.post("/change", authenticate, async(req, res) => {
    try {
        const form = req.body

        if (!await UserService.changePassword(req.user, form.newPassword)) {
            return res.status(400).send({success: false, message: "Your password is not valid"})
        }
        req.user.use_is_temp_password = false
        delete req.user.iat
        delete req.user.exp
        generateToken(req.user, res)

        return res.status(200).send({success: true, user: req.user})

    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router