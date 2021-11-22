const {httpServer} = require("../app")
const io = require("socket.io")(httpServer, {cors: {origin: "*"}})

io.on("connection", socket => {
    // join chat room
    socket.on("joinRoom", function(room) {
        socket.join(room)
    })

    // message from client
    socket.on("sendMessage", function(message) {
        // send message to clients in the chat
        io.to(message.mes_cha_cod).emit("getMessageSent", message)
    })
})

module.exports = io