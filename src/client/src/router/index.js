import Vue from "vue"
import VueRouter from "vue-router"
import Login from "@/views/Login/Login.vue"
import ForgotPassword from "@/views/ForgotPassword/ForgotPassword.vue"
import Home from "@/views/Home/Home.vue"
import store from "@/store"
import ImportCsv from "@/views/ImportCsv/ImportCsv.vue"
import Advertise from "@/views/Advertise/Advertise.vue"
import Buy from "@/views/Buy/Buy.vue"
import Reports from "@/views/Reports/Reports.vue"
import Favorites from "@/views/Favorites/Favorites.vue"

Vue.use(VueRouter)

const routes = [{
    path: "/login",
    name: "Login",
    component: Login
}, {
    path: "/esqueci-a-senha",
    name: "ForgotPassword",
    component: ForgotPassword
}, {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
        requiresAuth: true
    }
}, {
    path: "/cadastrar",
    name: "Cadastrar",
    component: ImportCsv,
    meta: {
        requiresAuth: true
    }
}, {
    path: "/anunciar",
    name: "Advertise",
    component: Advertise,
    meta: {
        requiresAuth: true
    }
}, {
    path: "/comprar",
    name: "Buy",
    component: Buy,
    meta: {
        requiresAuth: true
    }
}, {
    path: "/relatorios",
    name: "Reports",
    component: Reports,
    meta: {
        requiresAuth: true
    }
}, {
    path: "/favoritos",
    name: "Favorites",
    component: Favorites,
    meta: {
        requiresAuth: true
    }
}]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

const isAuthenticated = function() {
    if (store.getters.isAuthenticated) {
        return true
    }
    return false
}

router.beforeEach(function(to, from, next) {
    const requiresAuth = to.matched.some(function(record) {
        return record.meta.requiresAuth
    })

    if (requiresAuth && !isAuthenticated()) {
        next({name: "Login"})
    } else if ((to.name === "Login" || to.name === "ForgotPassword") && isAuthenticated()) {
        next({name: "Home"})
    } else {
        next()
    }
})

export default router
