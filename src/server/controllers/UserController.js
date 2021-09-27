const router = require("express").Router()
const UserService = require("../services/UserService")

// Mapeado em "/user"

router.post("/register", async(req, res) => {
    try {
        const {csvFile} = req.files
        await UserService.registerUser(csvFile.tempFilePath)
        return res.status(200).send({success: true})
    } catch (error) {
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.delete("/:use_cod", async(req, res) => {
    try {
        const {use_cod} = req.params
        await UserService.deleteUser(use_cod)
        return res.status(200).send({success: true})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router