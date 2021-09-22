export default {
    methods: {
        emit: function(e) {
            this.$emit("click", e)
        }
    }
}