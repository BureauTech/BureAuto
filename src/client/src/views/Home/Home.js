import Topbar from "@/components/Topbar/Topbar"
import Select from "@/components/Select/Select.vue"
import Input from "@/components/Input/Input.vue"
import Button from "@/components/Button/Button.vue"
import rulesUtils from "@/utils/rulesUtils"
import axios from "@/axios"
import imageConverterUtil from "@/utils/imageConverterUtil"

export default {
    name: "Home",
    components: {
        Topbar,
        Select,
        Input,
        Button
    },
    methods: { 
        getAds: async function() {
            const response = await axios.get("/advertisement/all")
            this.ads = response.data.data
        }
        
    },
    data: function() {
        return {
            ads: [],
            rules: rulesUtils,
            formCategories: {
                brand: ["brand1", "brand2"],
                model: ["model1", "model2"],
                yearModel: ["2020/2021", "2021/2022"],
                valueMin: "",
                valueMax: ""
            },
            imageConverter: imageConverterUtil
        }
    },
    beforeMount: function() {
        this.getAds()
    }
}