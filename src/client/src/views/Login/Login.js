import Card from "@/components/Card/Card.vue"
import Input from "@/components/Input/Input.vue"
import Button from "@/components/Button/Button.vue"
import rulesUtils from "@/utils/rulesUtils"
import axios from "../../axios"

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
            loading: false,
            loginForm: {
                email: undefined,
                password: undefined
            }
        }
    },
    methods: {
        login: async function() {
            this.loading = true

            try {
                const response = await axios.post("/login", this.loginForm)
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        }
    }
}