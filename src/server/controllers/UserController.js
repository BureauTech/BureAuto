const router = require("express").Router()
const fs = require("fs")

// Mapeado em "/user"

router.get("/", async(req, res) => {
    return res.send("/users")
})

router.post("/register", async(req, res) => {
    const {csv} = req.files
    fs.unlink(csv.tempFilePath, () => {})
    res.send("ok")
})

module.exports = router