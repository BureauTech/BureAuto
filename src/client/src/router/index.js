import Vue from "vue"
import VueRouter from "vue-router"
import Login from "@/views/Login/Login.vue"
import ForgotPassword from "@/views/ForgotPassword/ForgotPassword.vue"
import About from "@/views/About/About.vue"
import store from "@/store"
import ImportCsv from "@/views/ImportCsv/ImportCsv.vue"

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
    path: "/area-logada",
    name: "AreaLogada",
    component: About,
    meta: {
        requiresAuth: true
    }
}, {
    path: "/cadastrar",
    name: "Cadastrar",
    component: ImportCsv
}]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

const isAuthenticaded = function() {
    if (store.getters.isAuthenticaded) {
        return true
    }
    return false
}

router.beforeEach(function(to, from, next) {
    const requiresAuth = to.matched.some(function(record) {
        return record.meta.requiresAuth
    })

    if (requiresAuth && !isAuthenticaded()) {
        next({name: "Login"})
    } else if (to.name === "Login" && isAuthenticaded()) {
        next({name: "AreaLogada"})
    } else {
        next()
    }
})

export default router
