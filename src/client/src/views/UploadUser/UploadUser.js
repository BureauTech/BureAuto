import Card from "@/components/Card/Card.vue"
import Button from "@/components/Button/Button.vue"
import Input from "@/components/Input/Input.vue"
import ImportCsv from "@/components/ImportCsv/ImportCsv.vue"
import axios from "@/axios.js"
import {saveAs} from "file-saver"

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
            users: [],
            dialog: false,
            teste: undefined,
            dialogCsvError: false,
            errors: ""
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
                    if (data.success && data.csvError == "") {
                        this.$toasted.success("Dados importados!")
                        setTimeout(function() { 
                            window.location.reload()
                        }, 3000)
                        
                    } else if (data.csvError !== "") {
                        this.dialogCsvError = true
                        this.errors = data.csvError
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
            this.$router.push({name: "EditProfile", params: {user: item}})
        },
        Delete(item) {
            this.dialog = true
            this.teste = item
            console.log(item.use_cod)
        },
        async DeleteUser() {
            const response = await axios.delete(`/administrator/${this.teste.use_cod}/`)
            this.dialog = false
            if (!response.data.success) {
                return this.$toasted.error("Ocorreu um erro na requisição")
            }
            this.$toasted.success("Usuário excluído com sucesso!")
            setTimeout(function() { 
                window.location.reload()
            }, 1500)
        },
        DownloadErrors() {
            this.dialogCsvError = false
            const blob = new Blob([this.errors], {type: "text/csv"})
            saveAs(blob, "Erros.csv")
        }
    }
}