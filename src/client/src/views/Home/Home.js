import Topbar from "@/components/Topbar/Topbar"
import Select from "@/components/Select/Select.vue"
import Input from "@/components/Input/Input.vue"
import Button from "@/components/Button/Button.vue"
import rulesUtils from "@/utils/rulesUtils"
import axios from "@/axios"
import imageConverterUtil from "@/utils/imageConverterUtil"
import AdvertisementUtils from "@/utils/AdvertisementUtils"

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
            const response = await axios.get(`/advertisement/all/${JSON.stringify(this.filters)}`)
            this.ads = response.data.data.map(ad => {
                ad.adv_images = imageConverterUtil.arrayBufferToString(ad.adv_images)
                return ad
            })
            this.setFilters(response.data.filters)
        },
        getAdsValues: async function() {
            const response = await axios.get("/advertisement/values")
            if (!response.data.success) console.log("Não foi possível pegar valores")
            // this.adsMinValue = response.data.data[0]
            // this.adsMaxValue = response.data.data[1]
        },
        searchAds: async function() {
            if(!this.termSearch) {
                this.getAds()
            } else {
                const response = await axios.get(`/advertisement/search/${this.termSearch}/${JSON.stringify(this.filters)}`)
                this.ads = response.data.data.map(ad => {
                    ad.adv_images = imageConverterUtil.arrayBufferToString(ad.adv_images)
                    return ad
                })
                this.setFilters(response.data.filters)
            }
        },
        setFilters: async function(filters) {
            this.formCategories.brand = filters.brand.brands
            this.formCategories.model = filters.model.models
            this.formCategories.yearManModel = filters.yearModel.yearModels
            this.formCategories.valueMin = filters.value.min
            this.formCategories.valueMax = filters.value.max
        }
    },
    data: function() {
        return {
            ads: [],
            rules: rulesUtils,
            formCategories: {
                brand: [],
                model: [],
                yearManModel: [],
                valueMin: undefined,
                valueMax: undefined
            },
            imageConverter: imageConverterUtil,
            AdvertisementUtils: AdvertisementUtils,
            termSearch: "",
            teste: [],
            adsMinValue: undefined,
            adsMaxValue: undefined,
            filters: {
                brand: undefined,
                model: undefined,
                yearManModel: undefined,
                valueMin: undefined,
                valueMax: undefined
            }
        }
    },
    created: function() {
        this.getAds()
        // this.getAdsValues()
    },
    watch: {
        "filters.brand"() {
            this.getAds()
        },
        "filters.model"() {
            this.getAds()
        },
        "filters.yearManModel"() {
            this.getAds()
        }
    }
}