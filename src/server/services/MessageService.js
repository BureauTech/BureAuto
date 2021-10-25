const {Brackets} = require("typeorm")
const Repository = require("../database/Repository")

module.exports = {
    createMessage: async function(sender_cod, chat_cod, message_sent) {
        const ChatRepository = await Repository.get(Repository.Chat)
        const isUserChat = await ChatRepository.findOne({
            join: {
                alias: "Chat",
                leftJoinAndSelect: {
                    Advertisement: "Chat.Advertisement"
                }
            },
            where: [
                {Advertisement: {adv_use_cod: sender_cod}},
                {cha_use_cod: sender_cod}
            ]
        })
        if (!isUserChat) return

        const MessageRepository = await Repository.get(Repository.Message)
        const newMessage = await MessageRepository.save({mes_use_cod: sender_cod, mes_cha_cod: chat_cod, mes_text: message_sent})
        return newMessage
    },

    getMessages: async function(chat_cod, user_cod) {
        const MessageRepository = await Repository.get(Repository.Message)
        
        const messages = await MessageRepository.createQueryBuilder(Repository.Message)
            .select("\"Message\".*")
            .leftJoin("Message.Chat", "Chat")
            .leftJoin("Chat.Advertisement", "Advertisement")
            .where("Message.mes_cha_cod = :cha_cod", {cha_cod: chat_cod})
            .andWhere(new Brackets(queryBuilder => {
                queryBuilder.where("Advertisement.adv_use_cod = :adv_use_cod", {adv_use_cod: user_cod})
                queryBuilder.orWhere("Chat.cha_use_cod = :cha_use_cod", {cha_use_cod: user_cod})
            }))
            .orderBy("Message.mes_created_at", "DESC")
            .getRawMany()
        return messages
    }
}