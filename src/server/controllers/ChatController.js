const router = require("express").Router()
const ChatService = require("../services/ChatService")


// Mapeado em "/chat"

router.post("/create", async(req, res) => {
    try {
        const chat = await ChatService.createChat(req.user.use_cod, req.body.adv_cod)
        if (chat.data) return res.status(201).send({success: true, data: chat.data, newChat: chat.newChat})
        return res.status(400).send({sucess: false, error: "this advertisement is not avaliable or it's yours"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({sucess: false, error: "an error occurred while processing the request"})
    }
})

router.get("/userChats", async(req, res) => {
    try {
        const chats = await ChatService.getAllUserChats(req.user.use_cod)
        return res.status(200).send({success: true, data: chats})
    } catch (error) {
        console.log(error)
        return res.status(500).send({sucess: false, error: "an error occurred while processing the request"})
    }
})

module.exports = router