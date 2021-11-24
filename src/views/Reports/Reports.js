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
            statusAdvertisement: [{
                text: "Nº de visualizações total: ",
                value: ""
            }, {
                text: "Nº de pessoas que entraram em contato: ",
                value: ""
            }, {
                text: "Nº de visualizações a cada 1 contato: ",
                value: ""
            }],
            advertisementStatus: [],
            advertisementStatusMap: {
                sold: "vendidos",
                inactive: "excluídos",
                active: "ativos",
                paused: "pausados"
            },
            soldAdvertisement: [{
                text: "Quantidade total de anúncios vendidos: ",
                value: ""
            }, {
                text: "Porcentagem total de anúncios vendidos: ",
                value: ""
            }],
            soldByModel: [{
                text: "",
                value: ""
            }],
            time: [{
                text: "Tempo médio que os anúncios estão no ar: ",
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
        getTotalAds: async function() { // admin
            try {
                const {data} = await axios.get("/advertisement/total-advertisements")
                if (data.success) {
                    this.platform[0].value = data.total
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao buscar o relatório da quantidade de anúncios")
            }
        },
        getAdvertisementReport: async function() {
            try {
                const {data} = await axios.get(`/${this.is_admin ? "administrator" : "advertisement"}/report/view-contact`)
                if (data.success) {
                    this.statusAdvertisement[0].value = data.data.totalViews
                    this.statusAdvertisement[1].value = data.data.totalContacts
                    this.statusAdvertisement[2].value = data.data.report
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao buscar o relatório visualizações vs contatos")
            }
        },
        getAdvertisementStatusReport: async function() { // admin
            try {
                const {data} = await axios.get("/administrator/report/status")
                if (data.success) {
                    this.advertisementStatus = data.data.map(report => {
                        return {text: `Quantidade de anúncios ${this.advertisementStatusMap[report.status]}: `, value: report.total}
                    })
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao buscar o relatório de status dos anúncios")
            }
        },
        getSoldAdvertisements: async function() {
            try {
                const {data} = await axios.get("/advertisement/report/sold")
                if (data.success) {
                    this.soldAdvertisement[0].value = data.data.sold
                    this.soldAdvertisement[1].value = data.data.percentage
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao buscar o relatório de vendas")
            }
        },
        getSoldByCategory: async function() {
            try {
                const {data} = await axios.get(`/${this.is_admin ? "administrator" : "advertisement"}/report/soldByCategory`)
                if (data.success) {
                    this.soldByModel = data.data.map(report => {
                        return {
                            text: report.category + ": ",
                            value: report.result
                        }
                    })
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao buscar o relatório de vendas por categoria (modelo)")
            }
        },
        getTimeReport: async function() {
            try {
                const {data} = await axios.get("/advertisement/report/time")
                if (data.success) {
                    this.time[0].value = data.data
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao buscar o relatório de vendas por categoria (modelo)")
            }
        }
    },

    created: function() {
        this.getFavoriteReport()
        this.getAdvertisementReport()
        this.getSoldAdvertisements()
        this.getSoldByCategory()
        this.getTimeReport()
        if (this.is_admin) {
            this.getTotalAds()
            this.getAdvertisementStatusReport()
        }
    }
}