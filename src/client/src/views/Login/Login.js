import Card from "@/components/Card/Card.vue"
import Input from "@/components/Input/Input.vue"
import Button from "@/components/Button/Button.vue"
import rulesUtils from "@/utils/rulesUtils"

export default {
    name: "Login",
    components: {
        Card,
        Input,
        Button
    },
    data: function() {
        return {
            rules: rulesUtils,
            loading: false
        }
    },
    methods: {
        login: function() {
            this.loading = true

            setTimeout(() => {
                this.loading = false
            }, 2000)
        }
    }
}