import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import vuetify from "./plugins/vuetify"
import store from "./store"
import axios from "./axios"

const startApp = async function() {
    try {
        const response = await axios.get("/auth")
        if (response && response.data.success) {
            await store.dispatch("setAuth", true)
            await store.dispatch("setUser", response.data.user)
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