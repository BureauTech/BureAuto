const router = require("express").Router()
const Connection = require("../database/Connection")
const UserService = require("../services/UserService")
const {authenticate} = require("../services/AuthService")

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

        await UserService.changePassword(req.user, form.newPassword)
        return res.status(200).send({success: true})

    } catch (error) {
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router