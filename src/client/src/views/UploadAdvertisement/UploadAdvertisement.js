import Card from "@/components/Card/Card.vue"
import Button from "@/components/Button/Button.vue"
import Input from "@/components/Input/Input.vue"
import ImportCsv from "@/components/ImportCsv/ImportCsv.vue"
import axios from "@/axios.js"
import {saveAs} from "file-saver"

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
            }, {text: "Valor (R$)", value: "adv_value"}, {text: "Ano Fabricação", value: "adv_year_manufacture"}, {text: "Ano Modelo", value: "adv_year_model"}, {text: "Visualizações", value: "adv_views"}, {text: "Favoritados", value: "adv_favorites"}, {text: "Status", value: "sty_description"}, {text: "Exibir", value: "show"}, {text: "Editar", value: "edit"}, {text: "Excluir", value: "delete"}],
            advertisements: [],
            dialog: false,
            deleteAd: undefined,
            dialogCsvError: false,
            errors: ""
        }
    },
    beforeMount: function() {
        this.getAds()
    },
    methods: {
        getAds: async function() {
            const status = {1: "Ativo", 3: "Pausado"}
            const response = await axios.get(`advertisement/allAdsByUser/${this.$store.getters.getUser.use_cod}`)
            this.advertisements = response.data.data
            this.advertisements.forEach(ad => {
                ad.sty_description = status[ad.adv_sty_cod]
            })
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
            this.$router.push(`/editar-anuncio/${item.adv_cod}`)
        },
        Show(item) {
            this.$router.push(`/anuncio/${item.adv_cod}`)
        },
        Delete(item) {
            this.dialog = true
            this.deleteAd = item
        },
        async confirmDelete() {
            this.dialog = false
            const response = await axios.delete(`/advertisement/${this.deleteAd.adv_cod}`)
            if (!response.data.success) this.$toasted.error("Ocorreu um erro na requisição")
            this.$toasted.success("Anúncio excluído com sucesso!")
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