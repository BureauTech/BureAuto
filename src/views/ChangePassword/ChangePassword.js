import Card from "@/components/Card/Card.vue"
import Input from "@/components/Input/Input.vue"
import Button from "@/components/Button/Button.vue"
import ColoredValidation from "@/components/ColoredValidation/ColoredValidation.vue"
import rulesUtils from "@/utils/rulesUtils"
import axios from "@/axios"
import router from "@/router"

export default {
    name: "ChangePassword",
    components: {
        Card,
        Input,
        Button,
        ColoredValidation
    },
    data: function() {
        return {
            rules: rulesUtils,
            loading: false,
            ChangePasswordForm: {
                newPassword: "",
                confirmNewPassword: ""
            }
        }
    },
    methods: {
        changePassword: async function() {
            if (this.$refs.ChangePasswordForm.validate() && this.hasAllValidation()) {
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
        },

        hasAllValidation: function() {
            return this.hasUpper && this.hasLower && this.hasNumber && this.hasSymbol && this.hasMinMaxLength
        }
    },

    computed: {
        hasUpper: function() {
            return /[A-Z]/g.test(this.ChangePasswordForm.newPassword)
        },
        hasLower: function() {
            return /[a-z]/g.test(this.ChangePasswordForm.newPassword)
        },
        hasNumber: function() {
            return /\d/g.test(this.ChangePasswordForm.newPassword)
        },
        hasSymbol: function() {
            // eslint-disable-next-line no-useless-escape
            return /[!@#$*\.%]/g.test(this.ChangePasswordForm.newPassword)
        },
        hasMinMaxLength: function() {
            const len = this.ChangePasswordForm.newPassword.length
            return len >= 6 && len <= 16
        }
    }
}