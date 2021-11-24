export default {
    name: "Card",
    props: {
        loading: false,
        roundLevel: {
            type: Number,
            default: 0
        },
        colorCard: {
            type: String,
            default: "white"
        }
    },
    data: function() {
        return {
            rounded: ["0", "sm", "md", "lg", "xl", "pill", "circle"]
        }
    },
    computed: {
        round: function() {
            const value = this.rounded[this.roundLevel]
            let rounded = "rounded"
            if (value !== "md") {
                rounded += `-${value}`
            }
            return rounded
        }
    }
}