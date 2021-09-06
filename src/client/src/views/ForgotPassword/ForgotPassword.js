import Card from "@/components/Card/Card.vue"
import Input from "@/components/Input/Input.vue"
import Button from "@/components/Button/Button.vue"
import rulesUtils from "@/utils/rulesUtils"

export default {
    name: "ForgotPassword",
    components: {
        Card,
        Input,
        Button
    },
    data: function() {
        return {
            rules: rulesUtils
        }
    },
    methods: {
        teste: function() {
            console.log("cliquei no enviar")
        }
    }
}