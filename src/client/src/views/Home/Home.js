import Topbar from "@/components/Topbar/Topbar"

export default {
    name: "Home",
    components: {
        Topbar
    },
    data: function() {
        return {
            items: ["marca", "modelo", "ano", "valor"]
        }
    }
}