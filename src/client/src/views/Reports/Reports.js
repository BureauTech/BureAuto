import ReportCard from "@/components/ReportCard/ReportCard.vue"
import axios from "@/axios"
export default {
    name: "Reports",

    components: {
        ReportCard
    },

    data: function() {
        return {
            is_admin: this.$store.getters.getUser.use_is_admin,
            favorite: [{
                text: this.is_admin?
                    "Porcentagem de anúncios favoritados na plataforma: " : "Porcentagem de anúncios favoritados: ",
                value: ""
            }],
            platform: [{
                text: "Quantidade total de anúncios ativos: ",
                value: ""
            }]
        }
    },

    methods: {
        getFavoriteReport: async function() {
            try {
                const {data} = await axios.get(`/favorite/report${this.is_admin? "/admin" : ""}`)
                if (data.success) {
                    this.favorite[0].value = data.data
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao buscar o relatório de favoritos")
            }
        },
        getTotalAds: async function() {
            try {
                const {data} = await axios.get("/advertisement/total-advertisements")
                if (data.success) {
                    this.platform[0].value = data.total
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao buscar o relatório de favoritos")
            }
        }
    },

    created: function() {
        this.getFavoriteReport()
        if (this.is_admin) {
            this.getTotalAds()
        }
    }
}