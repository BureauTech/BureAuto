import Topbar from "@/components/Topbar/Topbar"
import Select from "@/components/Select/Select.vue"
import Input from "@/components/Input/Input.vue"
import Button from "@/components/Button/Button.vue"
import rulesUtils from "@/utils/rulesUtils"
import axios from "@/axios"
import config from "../../config"
import logoBureau from "@/assets/bureauto_sem_fundo.png" 


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
                if(!ad.adv_images) {
                    ad.adv_images =  logoBureau
                } else {
                    ad.adv_images = config.SERVER_URL+ ad.adv_images
                }
                return ad
                
            })
        },
        getAdsValues: async function() {
            const response = await axios.get("/advertisement/values")
            if (!response.data.success) console.log("Não foi possível pegar valores")
            this.adsMinValue = response.data.data[0]
            this.adsMaxValue = response.data.data[1]
        },

        searchAds: async function() {
            if(!this.termSearch) {
                this.getAds()
            } else {
                const response = await axios.get(`/advertisement/search/${this.termSearch}`)
                this.ads = response.data.data.map(ad => {
                    if(!ad.adv_images) {
                        ad.adv_images =  logoBureau
                    } else {
                        ad.adv_images = config.SERVER_URL+ ad.adv_images
                    }
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
            termSearch: "",
            teste: [],
            adsMinValue: undefined,
            adsMaxValue: undefined
        }
    },
    created: function() {
        this.getAds()
        this.getAdsValues()
    }
}