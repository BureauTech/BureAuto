import axios from "@/axios.js"


export default {
    name: "EditProfile",

    data: function() {
        return {
            userInf: {
                use_cod: "",
                use_name: "",
                use_document: "",
                use_nickname: "",
                use_phone: "",
                use_address: "",
                use_email: ""
            },
            loading: false
        }
    },
      
    methods: {
        editUser: function() {
            this.loading = true
            try {
                const data = {
                    use_cod: this.userInf.use_cod,
                    use_name: this.userInf.use_name,
                    use_document: this.userInf.use_document,
                    use_nickname: this.userInf.use_nickname,
                    use_phone: this.userInf.use_phone,
                    use_address: this.userInf.use_address,
                    use_email: this.userInf.use_email
                }
                axios.put("/user/edit", data)
                    .then(res => {
                        if(res.data.success) {
                            this.$toasted.success("Usuário alterado com sucesso!")
                            this.loading = false
                            window.history.back()
                        }
                    })
                
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao fazer a requisição")
            }
        },
        cancel: function() {
            window.history.back()
        },
        logout: async function() {
            await axios.get("/logout")
            window.location.href = "/"
        }
    },
    mounted: function() {
        if (this.$route.params.user && this.$store.getters.getUser.use_is_admin) {
            this.userInf = this.$route.params.user
        } else {
            this.userInf = this.$store.getters.getUser
        }
    }
}