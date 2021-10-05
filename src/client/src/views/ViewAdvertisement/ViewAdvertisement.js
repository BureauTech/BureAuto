import Card from "@/components/Card/Card.vue"
import Button from "@/components/Button/Button.vue"
import axios from "@/axios.js"
import imageConverterUtil from "@/utils/imageConverterUtil"

export default {
    name: "ViewAdvertisement",
    components: {
        Card,
        Button
    },
    data: function() {
        return {
            advertisement: {
                adv_model_description: "",
                adv_value: "",
                adv_year_manufacture: "",
                adv_year_model: "",
                adv_description: "",
                Manufacturer: {
                    man_name: ""
                }
            },
            favorite: undefined
        }
    },
    methods: {
        getAdvertisement: async function() {
            try {
                const {data} = await axios.get(`/advertisement/${this.$route.params.id}`)
                if (data.success && data.data) {
                    this.advertisement = data.data

                    if(this.advertisement.adv_images != null) {
                        document.getElementById("image").src=`
                        ${imageConverterUtil.arrayBufferToString(this.advertisement.adv_images)}`
                    }
                } else {
                    this.$router.push("/")
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao pegar os dados do anúncio")
                this.$router.push("/")
            }
        },

        updateFavorite: async function() {
            if (this.$store.getters.isAuthenticated) {
                try {
                    if (this.favorite) {
                        // delete
                        await axios.delete(`/favorite/${this.favorite.fav_adv_cod}`)
                        this.favorite = undefined
                    } else {
                        // create
                        const body = {
                            adv_cod: this.$route.params.id
                        }
                        const {data} = await axios.post("/favorite/register", body)
                        this.favorite = data.data
                    }
                } catch (error) {
                    console.log(error)
                    this.$toasted.error("Ocorreu um erro ao atualizar o favorito")
                }
            } else {
                this.$router.push({name: "Login"})
            }
        },

        getFavorite: async function() {
            try {
                const use_cod = this.$store.getters.getUser.use_cod
                // verificar se o usuário está logado
                if (use_cod) {
                    const adv_cod = this.$route.params.id
                    const {data} = await axios.get(`/favorite/${adv_cod}`)
                    this.favorite = data.data
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao verificar o favorito")
            }
        }
        
    },
    created: async function() {
        await this.getAdvertisement()
        await this.getFavorite()
    }
}