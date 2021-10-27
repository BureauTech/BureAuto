export default {
    name: "Button",
    methods: {
        emit: function(e) {
            this.$emit("click", e)
        }
    }
}