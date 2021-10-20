const router = require("express").Router()
const ChatService = require("../services/ChatService")


// Mapeado em "/chat"

router.post("/create", async(req, res) => {
    try {
        const newChat = await ChatService.createChat(req.user.use_cod, req.body.adv_cod)
        if (newChat) return res.status(201).send({success: true, data: newChat})
        return res.status(500).send({sucess: false, error: "an error occurred while processing the request"})
    } catch (error) {
        return res.status(500).send({sucess: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router