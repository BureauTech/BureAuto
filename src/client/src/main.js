import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import vuetify from "./plugins/vuetify"
import store from "./store"
import axios from "./axios"

const startApp = async function() {
    try {
        const response = await axios.get("/authenticate")
        if (response) {
            await store.dispatch("setAuth", true)
        }
    } catch (error) {
        console.log(error)
    }

    Vue.config.productionTip = false
    
    new Vue({
        router,
        vuetify,
        store,
        render: h => h(App)
    }).$mount("#app")
}
startApp()
