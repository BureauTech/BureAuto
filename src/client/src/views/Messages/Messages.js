import Topbar from "@/components/Topbar/Topbar"
import rulesUtils from "@/utils/rulesUtils"
import axios from "@/axios.js"
import config from "../../config"
import logoBureau from "@/assets/bureauto_sem_fundo.png"

export default {
    name: "Messages",
    components: {
        Topbar
    },
    data: function() {
        return {
            favs: [],
            ads: [],
            chats: [],
            messages: [],
            rules: rulesUtils,
            messageForm: {
                message: undefined,
                cha_cod: undefined
            },
            isConnected: false,
            scrollContainer: false
        }
    },
    methods: {
        getUserChats: async function() {
            const chat = await axios.get("/chat/userChats/")
            this.chats = chat.data.data.map(chat => {
                if(!chat.adv_images) {
                    chat.adv_images =  logoBureau
                } else {
                    chat.adv_images = config.SERVER_URL + chat.adv_images
                }
                return chat
            })    
            
        },
        
        getMessages: async function(cha_cod) {
            const message = await axios.get(`/message/messages/${cha_cod}`)
            this.messages = message.data.data.map(message => {
                this.messageForm.cha_cod = message.mes_cha_cod
                return message  
            })           
        },

        sendMessage: async function() {
            if (this.messageForm.message) {
                this.scrollContainer = true
                const newMessage = await this.saveMessage(this.messageForm)
                this.$socket.emit("sendMessage", newMessage)
                this.messageForm.message = ""
            }
        },

        saveMessage: async function(message) {
            const {data} = await axios.post("/message/create/", message) 
            if (data.success) {
                return data.data
            }
        },

        getFavs: async function() {
            const favorites = await axios.get(`/favorite/favorites/${this.$store.getters.getUser.use_cod}`)
            this.ads = favorites.data.data.map(ad => {
                if(!ad.adv_images) {
                    ad.adv_images =  logoBureau
                } else {
                    ad.adv_images = config.SERVER_URL + ad.adv_images
                }
                return ad
            })
        },

        deleteFav: async function(adv_cod, index) {
            if (this.$store.getters.isAuthenticated) {
                await axios.delete(`/favorite/${adv_cod}`)
                this.ads.splice(index, 1)
            }
        },

        viewAdvertisement: async function(adv_cod) {
            if (this.$store.getters.isAuthenticated) {
                this.$router.push(`/anuncio/${adv_cod}`)
            }
        },
        scrollToLastMessage: function() {
            if (this.scrollContainer) {
                this.$nextTick(() =>{
                    const messageContainer = this.$refs.messageContainer[0]
                    console.log(messageContainer)
                    messageContainer.scrollTop = messageContainer.scrollHeight + 200
                    this.scrollContainer = false
                })
            }
        }
    },

    beforeMount: function() {
        this.getUserChats()
    },

    mounted: function() {
        this.$socket.disconnect()
        this.$socket.connect()
        console.log(this.$refs);
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
            this.scrollToLastMessage()
        }
    }
}