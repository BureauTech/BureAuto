import Card from "@/components/Card/Card.vue"
import Input from "@/components/Input/Input.vue"
import Button from "@/components/Button/Button.vue"
import rulesUtils from "@/utils/rulesUtils"
import axios from "@/axios"

export default {
    name: "ForgotPassword",
    components: {
        Card,
        Input,
        Button
    },
    data: function() {
        return {
            rules: rulesUtils,
            loading: false,
            formResetPassword: {
                email: undefined
            }
        }
    },
    methods: {
        resetPassword: async function() {
            this.loading = true
            try {
                if (this.$refs.forgotForm.validate()) {
                    const {data} = await axios.post("/reset-password", this.formResetPassword)
                    if (data.success) {
                        this.$toasted.success("Confira seu e-mail para redefinir sua senha!")
                        setTimeout(() => this.$router.push({name: "Login"}), 2000)
                    } else {
                        this.$toasted.error("Ocorreu um erro ao enviar o e-mail")
                    }
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao enviar o e-mail")
            }
            this.loading = false
        }
    }
}