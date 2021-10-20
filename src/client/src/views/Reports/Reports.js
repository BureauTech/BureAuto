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
                text: this.$store.getters.getUser.use_is_admin?
                    "Porcentagem de anúncios favoritados na plataforma: " : "Porcentagem de anúncios favoritados: ",
                value: ""
            }],
            platform: [{
                text: "Quantidade total de anúncios ativos: ",
                value: ""
            }],
            advertisement: [{
                text: "Nº de visualizações total: ",
                value: ""
            }, {
                text: "Nº de pessoas que entraram em contato: ",
                value: ""
            }, {
                text: "Nº de visualizações a cada 1 contato: ",
                value: ""
            }]
        }
    },

    methods: {
        getFavoriteReport: async function() {
            try {
                const {data} = await axios.get(`/${this.is_admin ? "administrator" : "favorite"}/report/favorite`)
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
        },
        getAdvertisementReport: async function() {
            try {
                const {data} = await axios.get("/advertisement/report/view-contact")
                if (data.success) {
                    this.advertisement[0].value = data.data.totalViews
                    this.advertisement[1].value = data.data.totalContacts
                    this.advertisement[2].value = data.data.report
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao buscar o relatório de favoritos")
            }
        }
    },

    created: function() {
        this.getFavoriteReport()
        this.getAdvertisementReport()
        if (this.is_admin) {
            this.getTotalAds()
        }
    }
}