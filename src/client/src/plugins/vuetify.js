import Vue from "vue"
import Vuetify from "vuetify/lib/framework"

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                bahama: "#2A6484"
            }
        },
        options: {
            customProperties: true
        }
    }
})