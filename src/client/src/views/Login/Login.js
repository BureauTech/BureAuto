import Card from "@/components/Card/Card.vue"
import Input from "@/components/Input/Input.vue"
import Button from "@/components/Button/Button.vue"
import rulesUtils from "@/utils/rulesUtils"
import axios from "axios"
import config from "../../config"

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
            const response = await axios.post(`${config.SERVER_URL}/login`, this.loginForm, {withCredentials: true, headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }})
            console.log(response)
            setTimeout(() => {
                this.loading = false
            }, 2000)
        }
    }
}