export default {
    name: "MainChat",
    props: {
        chatMessages: {
            type: Array,
            default: []
        },
        advertisement: {
            type: Object,
            default: {
                adv_images: null,
                adv_model_description: null,
                adv_value: 0,
                adv_cod: null
            }
        }
    },

    data: function() {
        return {
            scrollContainer: false,
            currentMessage: ""
        }
    },

    methods: {
        scrollToLastMessage: function() {
            if (this.scrollContainer) {
                this.$nextTick(() =>{
                    const messageContainer = this.$refs.messageContainer
                    messageContainer.scrollTop = messageContainer.scrollHeight + 200
                    this.scrollContainer = false
                })
            }
        },

        emit: function() {
            this.$emit("send", {message: this.currentMessage, cha_cod: this.chatMessages[0].mes_cha_cod})
            this.currentMessage = ""
        },

        viewAdvertisement: async function(adv_cod) {
            if (this.$store.getters.isAuthenticated) {
                this.$router.push(`/anuncio/${adv_cod}`)
            }
        }
    }
}