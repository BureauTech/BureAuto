const router = require("express").Router()
const UserService = require("../services/UserService")

// Mapeado em "/user"

router.post("/register", async(req, res) => {
    try {
        const {csvFile} = req.files
        await UserService.registerUser(csvFile.tempFilePath)
    } catch (error) {
        res.status(500).send({success: false})
    }
    return res.status(200).send({success: true})
})

module.exports = router