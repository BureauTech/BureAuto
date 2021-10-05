import axios from "@/axios.js"
import imageConverterUtil from "@/utils/imageConverterUtil"

export default {
    name: "ViewAdvertisement",

    data: function() {
        return {
            advertisement: {
                adv_model_description: "",
                adv_value: "",
                adv_year_manufacture: "",
                adv_year_model: "",
                adv_brand_description: "",
                Manufacturer: {
                    man_name: ""
                }
            },
            loading: false,
            images: null,
            brands: [],
            status: ["Ativo", "Pausado"]
        }
    },
    methods: {
        getAdvertisement: async function() {
            try {
                this.loading = true
                const {data} = await axios.get(`/advertisement/${this.$route.params.id}`)
                const manufacturers = await axios.get("/manufacturer/all")
                const isUser =
          this.$store.getters.getUser.use_cod === data.data.adv_use_cod

                if (data.success && data.data && isUser) {
                    this.loading = false
                    this.advertisement = data.data

                    if(this.advertisement.adv_sty_cod === "1") {
                        this.advertisement.adv_sty_cod = "Ativo"
                    } else if (this.advertisement.adv_sty_cod === "3") {
                        this.advertisement.adv_sty_cod = "Pausado"
                    }

                    const brandTemp = manufacturers.data.data
                    this.brands = brandTemp
                    const tempArray = []
                    brandTemp.forEach(function(brand) {
                        tempArray.push(brand.man_name)
                    })

                    this.advertisement.adv_brands = tempArray
                    if (this.advertisement.adv_images != null) {
                        const stringImage = imageConverterUtil.arrayBufferToString(this.advertisement.adv_images)
                        document.getElementById("image").src = `
                        ${stringImage}`
                        this.images = [stringImage]
                    }
                } else {
                    this.$router.push("/")
                }
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao pegar os dados do anúncio")
                this.$router.push("/")
            }
        },

        editAdvertisement: function() {
            try {
                this.loading = true
                const adv_edt = {
                    adv_cod: this.advertisement.adv_cod,
                    adv_model_description: this.advertisement.adv_model_description,
                    adv_man_cod: this.advertisement.adv_man_cod,
                    adv_value: parseFloat(this.advertisement.adv_value),
                    adv_year_manufacture: parseInt(this.advertisement.adv_year_manufacture),
                    adv_year_model: parseInt(this.advertisement.adv_year_model),
                    adv_brand_description: this.advertisement.adv_brand_description,
                    adv_sty_cod: 1,
                    adv_images: this.images
                }

                if(this.advertisement.adv_sty_cod === "Ativo") {
                    adv_edt.adv_sty_cod = "1"
                } else {
                    adv_edt.adv_sty_cod = "3"
                }

                const brandName = this.advertisement.Manufacturer.man_name
                this.brands.forEach(function(brand) {
                    if (brand.man_name === brandName) {
                        adv_edt.adv_man_cod = brand.man_cod
                    }
                })

                axios.put("/advertisement/edit", adv_edt).then((res) => {
                    if (res.data.success) {
                        this.loading = false
                        this.$toasted.success("Anúncio editado com sucesso!")
                        this.$router.push("/")
                        this.$router.push(`/anuncio/${this.advertisement.adv_cod}`)
                        window.location.reload()
                    }
                })
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao fazer a requisição")
                this.$router.push(`/anuncio/${this.advertisement.adv_cod}`)
            }
        },

        cancel: function() {
            this.$router.push(`/anuncio/${this.advertisement.adv_cod}`)
            window.location.reload()
        },

        imageUploaded: function() {
            const file = document.querySelector("input[type=file]")["files"][0]
            this.images = imageConverterUtil.loadImageFileAsURL(file)
        }
    },
    created: async function() {
        await this.getAdvertisement()
    }
}