import Card from "@/components/Card/Card.vue"
import Button from "@/components/Button/Button.vue"
import Input from "@/components/Input/Input.vue"
import ImportCsv from "@/components/ImportCsv/ImportCsv.vue"
import axios from "@/axios.js"
import router from "@/router"

export default {
    name: "UploadAdvertisement",
    components: {
        Card,
        Button,
        Input,
        ImportCsv
    },
    data: function() {
        return {
            csvFile: null,
            headers: [{text: "Veículo",
                align: "start",
                value: "adv_model_description"
                // eslint-disable-next-line max-len
            }, {text: "Status", value: "adv_status"}, {text: "Valor (R$)", value: "adv_value"}, {text: "Ano Fabricação", value: "adv_year_manufacture"}, {text: "Ano Modelo", value: "adv_year_model"}, {text: "Visualizações", value: "adv_views"}, {text: "Favoritados", value: "adv_favorites"}, {text: "Exibir", value: "show"}, {text: "Editar", value: "edit"}, {text: "Editar Status", value: "editStatus"}],
            advertisements: []
        }
    },
    beforeMount: function() {
        this.getAds()
    },
    methods: {
        getAds: async function() {
            const response = await axios.get("/advertisement/all")
            this.advertisements = response.data.data
        },
        importData: async function() {
            if (this.csvFile) {
                const formData = new FormData()
                formData.append("csvFile", this.csvFile)
                try {
                    const {data} = await axios.post("http://localhost:3000/advertisement/register", formData, {
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
        EditStatus(item) {
            console.log(item)
        },
        Show(item) {
            console.log(item)
        }
    }
}