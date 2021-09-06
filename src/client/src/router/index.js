import Vue from "vue"
import VueRouter from "vue-router"
import Login from "@/views/Login/Login.vue"
import ForgotPassword from "@/views/ForgotPassword/ForgotPassword.vue"

Vue.use(VueRouter)

const routes = [{
    path: "/login",
    name: "Login",
    component: Login
}, {
    path: "/esqueci-a-senha",
    name: "ForgotPassword",
    component: ForgotPassword
}]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router
