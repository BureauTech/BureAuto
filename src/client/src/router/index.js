import Vue from "vue"
import VueRouter from "vue-router"
import Login from "@/views/Login/Login.vue"
import ForgotPassword from "@/views/ForgotPassword/ForgotPassword.vue"
import About from "@/views/About/About.vue"
import store from "@/store"

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
}]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

const isAuthenticaded = function() {
    console.log(store)
    if (store.getters.isAuthenticaded) {
        return true
    }
    return false
}

router.beforeEach(function(to, from, next) {
    const requiresAuth = to.matched.some(function(record) {
        return record.meta.requiresAuth
    })
    console.log(to.fullPath)

    if (requiresAuth && !isAuthenticaded()) {
        console.log("Precisa e não está")
        next({name: "Login"})
    } else if (to.name === "Login" && isAuthenticaded()) {
        console.log("Login e está")
        next({name: "AreaLogada"})
    } else {
        console.log("else")
        next()
    }
})

export default router
