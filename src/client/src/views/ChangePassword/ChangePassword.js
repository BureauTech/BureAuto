import Card from "@/components/Card/Card.vue"
import Input from "@/components/Input/Input.vue"
import Button from "@/components/Button/Button.vue"
import rulesUtils from "@/utils/rulesUtils"
import axios from "@/axios"
import router from "@/router"

export default {
    name: "ChangePassword",
    components: {
        Card,
        Input,
        Button
    },
    data: function() {
        return {
            rules: rulesUtils,
            loading: false,
            ChangePasswordForm: {
                newPassword: undefined,
                confirmNewPassword: undefined
            }
        }
    },
    methods: {
        changePassword: async function() {
            if (this.$refs.ChangePasswordForm.validate()) {
                this.loading = true
                try {
                    const {data} = await axios.post("/reset-password/change", this.ChangePasswordForm)
                    console.log(`data: ${data}`)
                    if (data.success) {
                        await this.$store.dispatch("setAuth", true)
                        await this.$store.dispatch("setUser", data.user)
                        this.$toasted.success("Senha alterada com sucesso!")
                        router.push({name: "Home"})
                    } else {
                        this.$toasted.error("Ocorreu um erro ao alterar sua senha")
                    }
                } catch (error) {
                    console.log(error)
                    this.$toasted.error("Ocorreu um erro na requisição")
                } finally {
                    this.loading = false
                }
            }
        }
    }
}