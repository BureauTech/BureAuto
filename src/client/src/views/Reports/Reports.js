import ReportCard from "@/components/ReportCard/ReportCard.vue"
import axios from "@/axios"
export default {
    name: "Reports",

    components: {
        ReportCard
    },

    data: function() {
        return {
            engagement: [{
                text: "N. de visualizações do anúncio: ",
                value: 300
            }, {
                text: "N. de pessoas que entraram em contato: ",
                value: 20
            }, {
                text: "Percentual de engajamento do anúncio: ",
                value: "6,67%"
            }],
            favorite: [{
                text: "Porcentagem de anúncios favoritados: ",
                value: ""
            }]
        }
    },

    methods: {
        getFavoriteReport: async function() {
            const {use_cod} = this.$store.getters.getUser
            try {
                const {data} = await axios.get(`/favorite/report/${use_cod}`)
                if (data.success) {
                    this.favorite[0].value = data.data
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao buscar o relatório de favoritos")
            }
        }
    },

    created: function() {
        this.getFavoriteReport()
    }
}