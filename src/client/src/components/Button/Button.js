export default {
    props: {
        buttonText: String
    },
    methods: {
        emit: function(e) {
            this.$emit("click", e)
        }
    }
}