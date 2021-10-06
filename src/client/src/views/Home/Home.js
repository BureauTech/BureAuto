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
            this.ads = response.data.data.map(ad => {
                ad.adv_images = imageConverterUtil.arrayBufferToString(ad.adv_images)
                return ad
            })
        },

        searchAds: async function() {
            if(!this.termSearch) {
                this.getAds()
            } else {
                const response = await axios.get(`/advertisement/search/${this.termSearch}`)
                this.ads = response.data.data.map(ad => {
                    ad.adv_images = imageConverterUtil.arrayBufferToString(ad.adv_images)
                    return ad
                })
            }
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
            imageConverter: imageConverterUtil,
            termSearch: "",
            teste: []
        }
    },
    created: function() {
        this.getAds()
    }
}