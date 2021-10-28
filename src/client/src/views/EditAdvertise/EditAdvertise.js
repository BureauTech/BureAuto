import axios from "@/axios.js"
import imageConverterUtil from "@/utils/imageConverterUtil"
import Card from "@/components/Card/Card.vue"
import config from "../../config"
import logoBureau from "@/assets/bureauto_sem_fundo.png"

export default {
    name: "ViewAdvertisement",
    components: {
        Card
    },

    data: function() {
        return {
            advertisement: {
                adv_model_description: "",
                adv_value: "",
                adv_year_manufacture: "",
                adv_year_model: "",
                adv_description: "",
                Manufacturer: {
                    man_name: ""
                }
            },
            loading: false,
            images: null,
            brands: [],
            status: ["Ativo", "Pausado"],
            file: null
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
                    this.advertisement.Manufacturer = {man_name: data.data.man_name}

                    if (this.advertisement.adv_sty_cod === "1") {
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
                        const stringImage =
              config.SERVER_URL + this.advertisement.adv_images
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

        editAdvertisement: async function(event) {
            try {
                event.preventDefault()
                const config = {
                    header: {
                        "Content-Type": "multipart/form-data"
                    }
                }

                this.loading = true

                const form = document.getElementById("advEdt")
                const formData = new FormData(form)
                const formImage = new FormData()
                formData.append("adv_cod", this.advertisement.adv_cod)

                if (this.advertisement.adv_sty_cod === "Ativo") {
                    formData.set("adv_sty_cod", "1")
                } else {
                    formData.set("adv_sty_cod", "3")
                }

                const brandName = this.advertisement.Manufacturer.man_name
                this.brands.forEach(function(brand) {
                    if (brand.man_name === brandName) {
                        formData.set("adv_man_cod", brand.man_cod)
                    }
                })

                if (this.file) {
                    formImage.append("image", this.file, this.file.name)
                }
                const {data} = await axios.post("/image/upload", formImage, config)

                if (data.success) {
                    formData.append("adv_images", data.imageUrl)
                }

                axios.put("/advertisement/edit", formData, config).then((res) => {
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
                console.log(error)
            }
        },

        cancel: function() {
            this.$router.push(`/anuncio/${this.advertisement.adv_cod}`)
            window.location.reload()
        },

        imageUploaded: function() {
            const file = document.querySelector("input[type=file]")["files"][0]
            this.file = file
            if (!file) {
                document.getElementById("image").src = logoBureau
            } else {
                imageConverterUtil.loadImageFileAsURL(file)
            }
        }
    },
    created: async function() {
        await this.getAdvertisement()
    }
}
