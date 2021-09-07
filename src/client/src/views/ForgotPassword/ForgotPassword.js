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
            if (this.$refs.forgotForm.validate()) {
                this.loading = true
                await axios.post("/reset-password", this.formResetPassword)
                this.loading = false
            }
        }
    }
}