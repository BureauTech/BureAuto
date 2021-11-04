import ChatWindow from "vue-advanced-chat"
import "vue-advanced-chat/dist/vue-advanced-chat.css"
import axios from "@/axios.js"
import config from "../../config"

export default {
    name: "Message",
    components: {
        ChatWindow
    },
    data() {
        return {
            rooms: [],
            messages: [],
            currentUserId: this.$store.getters.getUser.use_cod,
            message: "",
            messagesLoaded: false,
            isConnected: false,
            textMessages: {
                ROOMS_EMPTY: "Não há conversas!",
                ROOM_EMPTY: "Inicie uma conversa aqui!",
                NEW_MESSAGES: "Novas mensagens",
                MESSAGES_EMPTY: "Mensagem vazia",
                CONVERSATION_STARTED: "Início da conversa:",
                TYPE_MESSAGE: "Mensagem",
                SEARCH: "Pesquisar"
            }
        }
    },
    methods: {
        getUserChats: async function() {
            const chat = await axios.get("/chat/userChats/")
            this.rooms = chat.data.data.map((chat) => {
                chat = {
                    roomId: chat.cha_cod,
                    roomName:
            chat.adv_model_description +
            " - " +
            (this.$store.getters.getUser.use_nickname === chat.use_nickname
                ? chat.adv_use_nickname
                : chat.use_nickname),
                    avatar: config.SERVER_URL + chat.adv_images,
                    lastMessage: {
                        content: chat.last_message,
                        senderId: chat.use_name
                    },
                    users: [{
                        _id: 0,
                        username: chat.use_name
                    }],
                    messages: this.messages
                }
                return chat
            })
            this.messagesLoaded = true
        },

        getMessages: async function({room}) {
            const message = await axios.get(`/message/messages/${room.roomId}`)
            this.messages = []
            message.data.data.map((message) => {
                this.messages.push({
                    _id: message.mes_cod,
                    content: message.mes_text,
                    senderId: message.mes_use_cod,
                    timestamp: new Date(message.mes_created_at)
                        .toTimeString()
                        .slice(0, 5),
                    disableActions: true,
                    disableReactions: true
                })

                return
            })

            this.messagesLoaded = true
        },
        sendMessage: async function({content, roomId}) {
            const newMessage = await this.saveMessage({
                message: content,
                cha_cod: roomId
            })
            this.$socket.emit("sendMessage", newMessage)
            //Reordenar chats após envio de mensagem
            const indexOfChatWithNewMessage = this.rooms.map(e => e.roomId).indexOf(roomId)
            console.log(indexOfChatWithNewMessage)
            const chatWithNewMessage = this.rooms[indexOfChatWithNewMessage]
            console.log(chatWithNewMessage)
            this.rooms.splice(indexOfChatWithNewMessage, 1)
            this.rooms.splice(0, 0, chatWithNewMessage)
            this.getMessages({content, roomId})
        },
        saveMessage: async function(message) {
            const {data} = await axios.post("/message/create/", message)
            if (data.success) {
                return data.data
            }
        }
    },
    beforeMount: function() {
        this.getUserChats()
        this.messagesLoaded = true
    },
    mounted: function() {
        this.$socket.disconnect()
        this.$socket.connect()
    },

    sockets: {
        connect: function() {
            this.isConnected = true
            this.rooms.forEach((chat) => {
                this.$socket.emit("joinRoom", chat.roomId)
            })
        },
        disconnect: function() {
            this.isConnected = false
        },
        getMessageSent: function(message) {
            message = {
                _id: message.mes_cod,
                roomId: message.mes_cha_cod,
                content: message.mes_text,
                senderId: message.mes_use_cod,
                timestamp: new Date(message.mes_created_at).toTimeString().slice(0, 5),
                disableActions: true,
                disableReactions: true
            }
            this.messages.push(message)

            for (const chat of this.rooms) {
                if (chat.roomId === message.roomId) {
                    chat.lastMessage.content = message.content
                    break
                }
            }
        }
    }
}
