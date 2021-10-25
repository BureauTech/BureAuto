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
            rules: rulesUtils
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
            this.messages = message.data.data
            return message          
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
        }
    },
    beforeMount: function() {
        this.getUserChats()
    }
}