import Card from "@/components/Card/Card.vue"
import Button from "@/components/Button/Button.vue"
import axios from "@/axios.js"
import logoBureau from "@/assets/bureauto_sem_fundo.png" 
import config from "../../config"
import CloseIcon from "@/assets/close-icon.png"
import OpenIcon from "@/assets/logo-no-bg.svg"
import FileIcon from "@/assets/file.svg"
import CloseIconSvg from "@/assets/close.svg"

export default {
    name: "ViewAdvertisement",
    components: {
        Card,
        Button
    },
    data: function() {
        return {
            advertisement: {
                adv_model_description: "",
                adv_value: "",
                adv_year_manufacture: "",
                adv_year_model: "",
                adv_description: "",
                adv_use_cod: ""
            },
            chats: [],
            messages: [],
            favorite: undefined,
            imageUrl: logoBureau
        }
    },
    methods: {
        getAdvertisement: async function() {
            try {
                const {data} = await axios.get(`/advertisement/${this.$route.params.id}`)
                if (data.success && data.data) {
                    this.advertisement = data.data

                    if(this.advertisement.adv_images != null) {
                        this.imageUrl = config.SERVER_URL + this.advertisement.adv_images
                    }
                } else {
                    this.$router.push("/")
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao pegar os dados do anúncio")
                this.$router.push("/")
            }
        },

        updateFavorite: async function() {
            if (this.$store.getters.isAuthenticated) {
                try {
                    if (this.favorite) {
                        // delete
                        await axios.delete(`/favorite/${this.favorite.fav_adv_cod}`)
                        this.favorite = undefined
                    } else {
                        // create
                        const body = {
                            adv_cod: this.$route.params.id
                        }
                        const {data} = await axios.post("/favorite/register", body)
                        this.favorite = data.data
                    }
                } catch (error) {
                    console.log(error)
                    this.$toasted.error("Ocorreu um erro ao atualizar o favorito")
                }
            } else {
                this.$router.push({name: "Login"})
            }
        },

        getFavorite: async function() {
            try {
                const use_cod = this.$store.getters.getUser.use_cod
                // verificar se o usuário está logado
                if (use_cod) {
                    const adv_cod = this.$route.params.id
                    const {data} = await axios.get(`/favorite/${adv_cod}`)
                    this.favorite = data.data
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao verificar o favorito")
            }
        },

        incrementView: function() {
            try {
                const adv_cod = this.$route.params.id
                axios.put(`/advertisement/views/${adv_cod}`)
            } catch (error) {
                return
            }
        },

        createChat: async function() {
            const bodyAdv = {
                adv_cod: this.$route.params.id
            }
            let body
            const chat = await axios.post("/chat/create", bodyAdv)
            if (chat.data.newChat) {
                body = {
                    message: "Olá, gostaria de mais informações sobre o anúncio",
                    cha_cod: chat.data.data.cha_cod
                }
                await axios.post("/message/create", body)
            } 
            this.$router.push("/mensagens")
        },

        editMessage(message) {
            const m = this.messageList.find(m=>m.id === message.id)
            m.isEdited = true
            m.data.text = message.data.text
        }
    },
    created: async function() {
        this.incrementView()
        await this.getAdvertisement()
        await this.getFavorite()
    }
}