export default {
    name: "ChatItem",
    props: {
        chat: Object
    },
    methods: {
        emit: function() {
            this.$emit("openChat", this.chat.cha_cod)
        }
    }
}