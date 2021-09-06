export default {
    name: "Input",
    props: {
        placeholder: String,
        propsRules: {
            default: ""
        },
        value: String
    },
    methods: {
        teste: function(e) {
            console.log(e)
        }
    }
}