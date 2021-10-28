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
            imageUrl: logoBureau,
            icons: {
                open: {
                    img: OpenIcon,
                    name: "default"
                },
                close: {
                    img: CloseIcon,
                    name: "default"
                },
                file: {
                    img: FileIcon,
                    name: "default"
                },
                closeSvg: {
                    img: CloseIconSvg,
                    name: "default"
                }
            },
            // the list of all the participant of the conversation. `name` is the user name,
            // `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
            titleImageUrl: "",
            // messageList: [{type: "text", author: "me", data: {text: "Say yes!"}}, {type: "text", author: "user1", data: {text: "No."}}],
            // the list of the messages to show, can be paginated and adjusted dynamically
            newMessagesCount: 0,
            isChatOpen: false, // to determine whether the chat window should be open or closed
            showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
            colors: {
                header: {
                    bg: "#4e8cff",
                    text: "#ffffff"
                },
                launcher: {
                    bg: "#4e8cff"
                },
                messageList: {
                    bg: "#ffffff"
                },
                sentMessage: {
                    bg: "#4e8cff",
                    text: "#ffffff"
                },
                receivedMessage: {
                    bg: "#eaeaea",
                    text: "#222222"
                },
                userInput: {
                    bg: "#f4f7f9",
                    text: "#565867"
                }
            }, // specifies the color scheme for the component
            alwaysScrollToBottom: false,
            // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
            messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
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
        sendMessage(text) {
            if (text.length > 0) {
                this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
                this.onMessageWasSent({author: "support", type: "text", data: {text}})
            }
        },
        onMessageWasSent(message) {
            // called when the user sends a message
            this.messageList = [...this.messageList, message]
        },
        handleChat() {
            this.isChatOpen = !this.isChatOpen
        },
        handleScrollToTop() {
            // called when the user scrolls message list to top
            // leverage pagination for loading another page of messages
        },
        handleOnType() {
            console.log("Emit typing event")
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
        await this.getUserChats()
        await this.getMessages()
    }
}