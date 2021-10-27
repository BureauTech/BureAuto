import MainChat from "@/components/MainChat/MainChat.vue"
import ChatItem from "@/components/ChatItem/ChatItem.vue"
import rulesUtils from "@/utils/rulesUtils"
import axios from "@/axios.js"
import config from "../../config"
import logoBureau from "@/assets/bureauto_sem_fundo.png"

export default {
    name: "Messages",
    components: {
        MainChat,
        ChatItem
    },
    data: function() {
        return {
            chats: [],
            messages: [],
            rules: rulesUtils,
            isConnected: false,
            advertisementInfo: {}
        }
    },
    methods: {
        getUserChats: async function() {
            const chat = await axios.get("/chat/userChats/")
            this.chats = chat.data.data.map(chat => {
                if(!chat.adv_images) {
                    chat.adv_images = logoBureau
                } else {
                    chat.adv_images = config.SERVER_URL + chat.adv_images
                }
                return chat
            })
            if (this.chats.length) {
                this.getMessages(this.chats[0].cha_cod)
                this.getAdvertisementInfo(this.chats[0])
            }
        },

        getAdvertisementInfo: function(chat) {
            this.advertisementInfo = {
                adv_images: chat.adv_images,
                adv_model_description: chat.adv_model_description,
                adv_value: chat.adv_value,
                adv_cod: chat.cha_adv_cod
            }
        },

        getMessages: async function(cha_cod) {
            // prevent get the same messages on multiple clicks
            if (this.messages.length && this.messages[0].mes_cha_cod === cha_cod) return
            const message = await axios.get(`/message/messages/${cha_cod}`)
            this.messages = message.data.data.map(message => {
                return message  
            })
            this.getAdvertisementInfo(this.chats.filter(chat => chat.cha_cod === cha_cod)[0])
        },

        sendMessage: async function(currentMessage) {
            if (currentMessage.message) {
                this.$refs.mainChat.scrollContainer = true
                const newMessage = await this.saveMessage(currentMessage)
                this.$socket.emit("sendMessage", newMessage)
            }
        },

        saveMessage: async function(message) {
            const {data} = await axios.post("/message/create/", message) 
            if (data.success) {
                return data.data
            }
        },

        viewAdvertisement: async function(adv_cod) {
            if (this.$store.getters.isAuthenticated) {
                this.$router.push(`/anuncio/${adv_cod}`)
            }
        }
    },

    beforeMount: function() {
        this.getUserChats()
    },

    mounted: function() {
        this.$socket.disconnect()
        this.$socket.connect()
    },

    sockets: {
        connect: function() {
            this.isConnected = true
            // connect in all chats
            this.chats.forEach(chat => {
                this.$socket.emit("joinRoom", chat.cha_cod)
            })
        },
        disconnect: function() {
            this.isConnected = false
        },
        getMessageSent: function(message) {
            this.messages.push(message)
            for (const chat of this.chats) {
                if (chat.cha_cod === message.mes_cha_cod) {
                    chat.last_message = message.mes_text
                    break
                }
            }
            this.$refs.mainChat.scrollToLastMessage()
        }
    }
}