import Card from "@/components/Card/Card.vue"
import Button from "@/components/Button/Button.vue"
import Input from "@/components/Input/Input.vue"
import axios from "@/axios.js"

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
                    await axios.post(this.urlData, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        },
        attachFile: function(file) {
            this.csvFile = file
        }
    },
    beforeMount: function() {
        const props = this.$route.matched[0].props
        let url, text
        if (props.default.type === "user") {
            url = "user"
            text = "usuários"
        } else if (props.default.type === "advertisement") {
            url = "advertisement"
            text = "anúncios"
        }

        this.urlData = `http://localhost:3000/${url}/register`
        this.textView = text
    }
}