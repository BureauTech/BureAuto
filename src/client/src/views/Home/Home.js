import Topbar from "@/components/Topbar/Topbar"

export default {
    name: "Home",
    components: {
        Topbar
    },
    data: () => ({
        items: ["marca", "modelo", "ano", "valor"]
    })
}