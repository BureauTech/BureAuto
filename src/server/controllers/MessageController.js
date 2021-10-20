const router = require("express").Router()
const MessageService = require("../services/MessageService")


// Mapeado em "/message"

router.post("/create", async(req, res) => {
    try {
        const {chat_cod, message} = req.body
        const newMessage = await MessageService.createMessage(req.user.use_cod, chat_cod, message)
        if (newMessage) return res.status(201).send({success: true, data: newMessage})
        return res.status(500).send({sucess: false, error: "an error occurred while processing the request"})
    } catch (error) {
        return res.status(500).send({sucess: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router