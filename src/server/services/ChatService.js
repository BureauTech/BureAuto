const Repository = require("../database/Repository")

module.exports = {
    createChat: async function(user_cod, adv_cod) {
        const AdvertisementRepository = await Repository.get(Repository.Advertisement)
        const isUserAdvertisement = await AdvertisementRepository.findOne({adv_cod: adv_cod, adv_use_cod: user_cod})
        if (isUserAdvertisement) return

        const chatIsAvaliable = await AdvertisementRepository.findOne({adv_cod: adv_cod, adv_sty_cod: 1})
        if (!chatIsAvaliable) return

        const ChatRepository = await Repository.get(Repository.Chat)
        const chatExists = await ChatRepository.findOne({cha_use_cod: user_cod, cha_adv_cod: adv_cod})
        if (chatExists) return chatExists

        const newChat = await ChatRepository.save({cha_use_cod: user_cod, cha_adv_cod: adv_cod})
        return newChat
    },

    getAllUserChats: async function(user_cod) {
        const ChatRepository = await Repository.get(Repository.Chat)
        return await ChatRepository.createQueryBuilder(Repository.Chat)
            .distinctOn(["Chat.cha_cod"])
            .select("Chat.cha_cod", "cha_cod")
            .addSelect("Message.mes_text", "last_message")
            .addSelect("Chat.cha_adv_cod", "cha_adv_cod")
            .addSelect("Advertisement.adv_model_description", "adv_model_description")
            .addSelect("Advertisement.adv_value", "adv_value")
            .addSelect("Advertisement.adv_images", "adv_images")
            .addSelect("(SELECT use_name FROM decrypt_user(Message.mes_use_cod))", "use_name")
            .innerJoin("Chat.Message", "Message")
            .leftJoin("Chat.Advertisement", "Advertisement")
            .leftJoin("Chat.User", "User")
            .where("Advertisement.adv_use_cod = :adv_use_cod", {adv_use_cod: user_cod})
            .orWhere("Chat.cha_use_cod = :cha_use_cod", {cha_use_cod: user_cod})
            .groupBy("Chat.cha_cod")
            .addGroupBy("Message.mes_created_at")
            .addGroupBy("Message.mes_text")
            .addGroupBy("Message.mes_use_cod")
            .addGroupBy("Advertisement.adv_model_description")
            .addGroupBy("Advertisement.adv_value")
            .addGroupBy("Advertisement.adv_images")
            .addGroupBy("User.use_name")
            .orderBy({
                "Chat.cha_cod": "DESC",
                "Message.mes_created_at": "DESC"
            })
            .getRawMany()
    }
}