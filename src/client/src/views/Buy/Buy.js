import Topbar from "@/components/Topbar/Topbar"

export default {
    name: "Buy",
    components: {
        Topbar
    },
    data: function() {
        return {
            items: ["marca", "modelo", "ano", "valor"]
        }
    }
}