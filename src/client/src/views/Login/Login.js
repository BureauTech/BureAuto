import Card from "@/components/Card/Card.vue"
import Input from "@/components/Input/Input.vue"
import Button from "@/components/Button/Button.vue"
import rulesUtils from "@/utils/rulesUtils"
import axios from "@/axios"
import router from "@/router"


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
            if (this.$refs.loginForm.validate()) {
                this.loading = true
                try {
                    const {data} = await axios.post("/login", this.loginForm)
                    if (data.success) {
                        await this.$store.dispatch("setAuth", true)
                        await this.$store.dispatch("setUser", data.user)
                        router.push({name: "Home"})
                    } else {
                        this.$toasted.error("Credenciais incorretas")
                        console.log("Erro no login")
                    }
                } catch (error) {
                    console.log(error)
                    
                } finally {
                    this.loading = false
                }
            }
        }
    }
}