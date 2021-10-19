const Repository = require("../database/Repository")

module.exports = {
    createMessage: async function(sender_cod, chat_cod, message_sent) {
        const MessageRepository = await Repository.get(Repository.Message)

        const newMessage = await MessageRepository.save({mes_use_cod: sender_cod, mes_cha_cod: chat_cod, mes_text: message_sent})
        return newMessage
    }
}