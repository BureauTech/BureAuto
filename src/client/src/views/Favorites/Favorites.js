import Topbar from "@/components/Topbar/Topbar"
import rulesUtils from "@/utils/rulesUtils"
import axios from "@/axios.js"
import config from "../../config"
import logoBureau from "@/assets/bureauto_sem_fundo.png" 

export default {
    name: "Favorites",
    components: {
        Topbar
    },
    data: function() {
        return {
            favs: [],
            ads: [],
            rules: rulesUtils
        }
    },
    methods: {
        getFavs: async function() {
            const favorites = await axios.get(`/favorite/favorites/${this.$store.getters.getUser.use_cod}`)
            this.ads = favorites.data.data.map(ad => {
                if(!ad.adv_images) {
                    ad.adv_images =  logoBureau
                } else {
                    ad.adv_images = config.SERVER_URL+ ad.adv_images
                }
                return ad
            })
        },

        deleteFav: async function(adv_cod, index) {
            if (this.$store.getters.isAuthenticated) {
                await axios.delete(`/favorite/${adv_cod}`)
                this.ads.splice(index, 1)
            }
        },

        viewAdvertisement: async function(adv_cod) {
            if (this.$store.getters.isAuthenticated) {
                this.$router.push(`/anuncio/${adv_cod}`)
            }
        }
    },
    beforeMount: function() {
        this.getFavs()
    }
}