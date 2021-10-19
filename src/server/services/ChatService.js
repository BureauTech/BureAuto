const Repository = require("../database/Repository")

module.exports = {
    createChat: async function(user_cod, adv_cod) {
        const ChatRepository = await Repository.get(Repository.Chat)
        const chatExists = await ChatRepository.findOne({cha_use_cod: user_cod, cha_adv_cod: adv_cod})

        if (chatExists) return chatExists

        const newChat = await ChatRepository.save({cha_use_cod: user_cod, cha_adv_cod: adv_cod})
        return newChat
    }
}