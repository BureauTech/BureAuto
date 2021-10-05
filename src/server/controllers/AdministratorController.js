const router = require("express").Router()
const UserService = require("../services/UserService")

// Mapeado em "/administrator"
router.get("/", async(req, res) => {
    const {user} = req
    if(!user.use_is_admin) return res.status(401).send({success: false, error: "unauthorized"})
    try {
        const users = await UserService.getAllUsersToAdm(user.use_cod)
        return res.status(200).send({success: true, data: users})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.put("/", async(req, res) => {
    const {user} = req.body
    if(!user.use_is_admin) return res.status(401).send({success: false, error: "unauthorized"})
    
    try {
        await UserService.updateUser(user)
        return res.status(200).send({success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

router.delete("/:user_id", async(req, res) => {
    debugger
    const {user} = req
    const {user_id} = req.params
    if(!user.use_is_admin) return res.status(401).send({success: false, error: "unauthorized"})
    
    try {
        await UserService.deleteUser(user_id)
        return res.status(200).send({success: true})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router