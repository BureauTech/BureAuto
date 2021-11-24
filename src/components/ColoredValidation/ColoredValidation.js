export default {
    name: "ColoredValidation",
    props: {
        rule: Boolean,
        text: String
    },

    computed: {
        isValid: function() {
            return this.rule
        }
    }
}