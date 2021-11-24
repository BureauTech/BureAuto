import Card from "@/components/Card/Card.vue"
import Button from "@/components/Button/Button.vue"
import Input from "@/components/Input/Input.vue"

export default {
    name: "ImportCsv",
    components: {
        Card,
        Button,
        Input
    },
    methods: {
        selectFile(file) {
            this.$emit("selectFile", file)
        },
        importFile() {
            this.$emit("importFile")
        }
    }
}