import axios from "@/axios.js"
import imageConverterUtil from "@/utils/imageConverterUtil"

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
            },
            loading: false,
            images: null
        }
    },
    methods: {
        
        getAdvertisement: async function() {
            try {
                this.loading = true
                const {data} = await axios.get(`/advertisement/${this.$route.params.id}`)
                const isUser = this.$store.getters.getUser.use_cod === data.data.adv_use_cod

                if (data.success && data.data && isUser) {
                    this.loading = false
                    this.advertisement = data.data
                    if(this.advertisement.adv_images != null) {
                        const stringImage = imageConverterUtil.arrayBufferToString(this.advertisement.adv_images)
                        document.getElementById("image").src=`
                        ${stringImage}`
                        this.images = [stringImage]
                    }
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
                this.loading = true
                const adv_edt = {
                    adv_cod: this.advertisement.adv_cod,
                    adv_model_description: this.advertisement.adv_model_description,
                    adv_value: parseFloat(this.advertisement.adv_value),
                    adv_year_manufacture: parseInt(this.advertisement.adv_year_manufacture),
                    adv_year_model: parseInt(this.advertisement.adv_year_model),
                    adv_brand_description: this.advertisement.adv_brand_description,
                    adv_images: this.images
                }
                axios.put("/advertisement/edit", adv_edt)
                    .then(res => {
                        if(res.data.success) {
                            this.loading = false
                            this.$toasted.success("Anúncio editado com sucesso!")
                            this.$router.push("/")
                            this.$router.push(`/anuncio/${this.advertisement.adv_cod}`)
                            window.location.reload()
                        }
                    })
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
            this.images = imageConverterUtil.loadImageFileAsURL(file)
        }

    },
    created: async function() {
        await this.getAdvertisement()
    }
}
