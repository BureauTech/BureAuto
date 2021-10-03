import Card from "@/components/Card/Card.vue"
import Button from "@/components/Button/Button.vue"
import Input from "@/components/Input/Input.vue"
import ImportCsv from "@/components/ImportCsv/ImportCsv.vue"
import axios from "@/axios.js"
import router from "@/router"

export default {
    name: "UploadUser",
    components: {
        Card,
        Button,
        Input,
        ImportCsv

    },
    data: function() {
        return {
            csvFile: null,
            headers: [{text: "Nome", align: "start", value: "use_name"}, {text: "E-mail",
                value: "use_email"
            }, {text: "Editar", value: "edit"}, {text: "Excluir", value: "delete"}],
            users: []
        }
    },
    beforeMount: function() {
        this.getUsers()
    },
    methods: {
        getUsers: async function() {
            const response = await axios.get("/administrator/")
            this.users = response.data.data
        },
        importData: async function() {
            if (this.csvFile) {
                const formData = new FormData()
                formData.append("csvFile", this.csvFile)
                try {
                    const {data} = await axios.post("http://localhost:3000/user/register", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    
                    if (data.success) {
                        this.$toasted.success("Dados importados!")
                        setTimeout(function() { 
                            router.push({name: "Home"}) 
                        }, 3000)
                        
                    } else {
                        this.$toasted.error("Ocorreu erros na importação")
                    }
                } catch (error) {
                    console.log(error)
                    this.$toasted.error("Ocorreu um erro na requisição")
                }
            } else {
                this.$refs.csv.$refs.input.click()
            }
        },
        attachFile: function(file) {
            this.csvFile = file
        },
        Edit(item) {
            console.log(item)
        },
        Delete(item) {
            console.log(item)
        }
    }
}