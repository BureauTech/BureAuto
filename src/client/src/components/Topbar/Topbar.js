import axios from "@/axios"

export default {
    name: "Topbar",
    methods: {
        logout: async function() {
            await axios.get("/logout")
        }
    }
}