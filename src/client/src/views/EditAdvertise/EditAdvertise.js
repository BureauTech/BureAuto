import axios from "@/axios.js"

export default {
    name: "ViewAdvertisement",

    data: function() {
        return {
            advertisement: {
                adv_model_description: "",
                adv_value: "",
                adv_year_manufacture: "",
                adv_year_model: "",
                adv_brand_description: "",
                Manufacturer: {
                    man_name: ""
                }
            }
        }
    },
    methods: {
        
        getAdvertisement: async function() {
            try {
                const {data} = await axios.get(`/advertisement/${this.$route.params.id}`)
                const isUser = this.$store.getters.getUser.use_cod === data.data.adv_use_cod

                if (data.success && data.data && isUser) {
                    this.advertisement = data.data
                } else {
                    this.$router.push("/")
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao pegar os dados do anúncio")
                this.$router.push("/")
            }
        },

        editAdvertisement: function() {
            try {
                const adv_edt = {
                    adv_cod: this.advertisement.adv_cod,
                    adv_model_description: this.advertisement.adv_model_description,
                    adv_value: parseFloat(this.advertisement.adv_value),
                    adv_year_manufacture: parseInt(this.advertisement.adv_year_manufacture),
                    adv_year_model: parseInt(this.advertisement.adv_year_model),
                    adv_brand_description: this.advertisement.adv_brand_description
                }
                axios.put("/advertisement/edit", adv_edt)
                
                this.$toasted.success("Anúncio editado com sucesso!")
                this.$router.push("/")
                this.$router.push(`/anuncio/${this.advertisement.adv_cod}`)
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao fazer a requisição")
            }
        },

        cancel: function() {
            this.$router.push(`/anuncio/${this.advertisement.adv_cod}`)
            window.location.reload()
        },

        imageUploaded: function() {
            const file = document.querySelector("input[type=file]")["files"][0]
            const reader = new FileReader()
	
            reader.onload = function() {
                const base64String = reader.result.replace("data:", "")
                    .replace(/^.+,/, "")
                document.getElementById("image").src=`data:image/jpeg;base64,${base64String}`
            }
            reader.readAsDataURL(file)
        }

    },
    created: async function() {
        await this.getAdvertisement()
    }
}
