import Topbar from "@/components/Topbar/Topbar"
import Button from "@/components/Button/Button.vue"
import axios from "@/axios.js"

export default {
    name: "ViewAdvertisement",
    components: {
        Topbar,
        Button
    },
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
                
                if (data.success && data.data) {
                    const isUser = this.$store.getters.getUser.use_cod === data.data.adv_use_cod
                    if (!isUser) {
                        this.$router.push("/")
                    }
                    this.advertisement = data.data
                } else {
                    this.$router.push("/")
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao pegar os dados do anúncio")
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
                this.$router.push("/")
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao fazer a requisição")
            }
        }
    },
    created: async function() {
        await this.getAdvertisement()
    }
} 