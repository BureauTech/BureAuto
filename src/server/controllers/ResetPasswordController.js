const router = require("express").Router()
const Connection = require("../database/Connection")
const UserService = require("../services/UserService")

router.post("/", async(req, res) => {
    try {
        const {email} = req.body
        const connection = await Connection

        const validate = (await connection
            .query("select get_user_cod_by_email($1) cod", [email]))[0]

        if(!validate.cod) {
            return res.status(401).send({success: false, error: "email not found"})
        }

        const user = (await connection
            .query("select * from descriptografar_usuario($1)", [validate.cod]))[0]

        await UserService.resetUserPassword(user)
        return res.status(200).send({success: true})

    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router