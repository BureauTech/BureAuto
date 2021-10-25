const router = require("express").Router()
const MessageService = require("../services/MessageService")


// Mapeado em "/message"

router.post("/create", async(req, res) => {
    try {
        const {chat_cod, message} = req.body
        const newMessage = await MessageService.createMessage(req.user.use_cod, chat_cod, message)
        if (newMessage) return res.status(201).send({success: true, data: newMessage})
        return res.status(400).send({sucess: false, error: "you haven't permission to send message in this chat"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({sucess: false, error: "an error occurred while processing the request"})
    }
})

router.get("/messages/:chat_cod", async(req, res) => {
    try {
        const {chat_cod} = req.params
        const messages = await MessageService.getMessages(chat_cod, req.user.use_cod)
        return res.status(200).send({sucess: true, data: messages})
    } catch (error) {
        console.log(error)
        return res.status(500).send({sucess: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router