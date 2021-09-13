import Card from "@/components/Card/Card.vue"
import Button from "@/components/Button/Button.vue"
import Input from "@/components/Input/Input.vue"
import axios from "@/axios.js"
import router from "@/router"

export default {
    name: "ImportCsv",
    components: {
        Card,
        Button,
        Input
    },
    data: function() {
        return {
            urlData: undefined,
            textView: undefined,
            csvFile: null
        }
    },
    methods: {
        importData: async function() {
            if (this.csvFile) {
                const formData = new FormData()
                formData.append("csvFile", this.csvFile)
                try {
                    const {data} = await axios.post(this.urlData, formData, {
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
            }
        },
        attachFile: function(file) {
            this.csvFile = file
        },
        setConfig: function() {
            const props = this.$route.matched[0].props
            let url, text
            if (props.default.type === "user") {
                url = "user"
                text = "usuários cadastrados"
            } else if (props.default.type === "advertisement") {
                url = "advertisement"
                text = "anúncios publicados"
            }

            this.urlData = `http://localhost:3000/${url}/register`
            this.textView = text
        }
    },
    watch: {
        $route: function() {
            this.setConfig()
        }
    },
    beforeMount: function() {
        this.setConfig()
    }
}