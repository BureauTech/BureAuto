import Topbar from "@/components/Topbar/Topbar"
import axios from "@/axios"

export default {
    name: "Home",
    components: {
        Topbar
    },
    methods: { 
        getAds: async function() {
            const response = await axios.get("/advertisement/all")
            this.ads = response.data.data
        }
    },
    data: function() {
        return {
            ads: []
        }
    },
    beforeMount: function() {
        this.getAds()
    }
}