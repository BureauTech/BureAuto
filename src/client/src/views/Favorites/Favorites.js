import Topbar from "@/components/Topbar/Topbar"
import rulesUtils from "@/utils/rulesUtils"
import axios from "@/axios.js"

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
            this.ads = favorites.data.data              
        },

        deleteFav: async function(adv_cod, index) {
            if (this.$store.getters.isAuthenticated) {
                await axios.delete(`/favorite/${adv_cod}`)
                this.ads.splice(index, 1)
            }
        }
    },
    beforeMount: function() {
        this.getFavs()
    }
}