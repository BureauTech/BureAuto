import axios from "@/axios.js"

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
                // adv_images: [""]
            },
            loading: false
        }
    },
    methods: {
        
        getAdvertisement: async function() {
            try {
                this.loading = true
                const {data} = await axios.get(`/advertisement/${this.$route.params.id}`)
                const isUser = this.$store.getters.getUser.use_cod === data.data.adv_use_cod

                if (data.success && data.data && isUser) {
                    this.loading = false
                    this.advertisement = data.data
                    //console.log(data.data.adv_images[0].data)
                    //this.advertisement.adv_images = [""]
                    //console.log(this.advertisement.adv_images)
                    //console.log(this.advertisement.adv_images[0].data)
                    if(this.advertisement.adv_images != null) {
                        document.getElementById("image").src=`data:image/jpeg;base64,
                        ${this.arrayBufferToString(this.advertisement.adv_images[0].data)}`
                        //console.log("sim")
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
                    adv_value: parseFloat(this.advertisement.adv_value),
                    adv_year_manufacture: parseInt(this.advertisement.adv_year_manufacture),
                    adv_year_model: parseInt(this.advertisement.adv_year_model),
                    adv_brand_description: this.advertisement.adv_brand_description,
                    adv_images: this.advertisement.adv_images
                }
                axios.put("/advertisement/edit", adv_edt)
                    .then(res => {
                        if(res.data.success) {
                            this.loading = false
                            this.$toasted.success("Anúncio editado com sucesso!")
                            this.$router.push("/")
                            this.$router.push(`/anuncio/${this.advertisement.adv_cod}`)
                        }
                    })
            } catch (error) {
                this.$toasted.error("Ocorreu um erro ao fazer a requisição")
            }
        },

        cancel: function() {
            this.$router.push(`/anuncio/${this.advertisement.adv_cod}`)
            window.location.reload()
        },

        imageUploaded: function() {
            const file = document.querySelector("input[type=file]")["files"][0]
            const reader = new FileReader()

            const temp = []
            reader.onload = function() {
                const base64String = reader.result.replace("data:", "")
                    .replace(/^.+,/, "")
                document.getElementById("image").src=`data:image/jpeg;base64,${base64String}`
                return temp.push(base64String)

            }
            reader.readAsDataURL(file)
            console.log(temp)
            this.advertisement.adv_images = temp
            
        },
        arrayBufferToString: function(buffer) {

            const bufView = new Uint16Array(buffer)
            const length = bufView.length
            let result = ""
            let addition = Math.pow(2, 16)-1
        
            for(let i = 0;i<length;i+=addition) {
        
                if(i + addition > length) {
                    addition = length - i
                }
                result += String.fromCharCode.apply(null, bufView.subarray(i, i+addition))
            }
        
            return result
        
        },

        teste: function() {
            console.log(this.advertisement.adv_images)
        }

    },
    created: async function() {
        await this.getAdvertisement()
    }
}
