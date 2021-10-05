import Vue from "vue"
import VueRouter from "vue-router"
import Login from "@/views/Login/Login.vue"
import ForgotPassword from "@/views/ForgotPassword/ForgotPassword.vue"
import Home from "@/views/Home/Home.vue"
import store from "@/store"
import ViewAdvertisement from "@/views/ViewAdvertisement/ViewAdvertisement.vue"
import Buy from "@/views/Buy/Buy.vue"
import Reports from "@/views/Reports/Reports.vue"
import Favorites from "@/views/Favorites/Favorites.vue"
import ChangePassword from "@/views/ChangePassword/ChangePassword.vue"
import Profile from "@/views/Profile/Profile.vue"
import UploadUser from "@/views/UploadUser/UploadUser.vue"
import UploadAdvertisement from "@/views/UploadAdvertisement/UploadAdvertisement.vue"
import EditAdvertise from "@/views/EditAdvertise/EditAdvertise.vue"
import EditProfile from "@/views/EditProfile/EditProfile.vue"



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
    component: Home
    // meta: {
    //     requiresAuth: true
    // }
}, {
    path: "/cadastrar/usuario",
    name: "CadastrarUsuario",
    component: UploadUser,
    meta: {
        requiresAuth: true,
        requiresAdmin: true
    }
}, {
    path: "/cadastrar/anuncio",
    name: "CadastrarAnuncio",
    component: UploadAdvertisement,
    meta: {
        requiresAuth: true
    }
}, {
    path: "/anuncio/:id",
    name: "ViewAdvertisement",
    component: ViewAdvertisement
}, {
    path: "/comprar",
    name: "Buy",
    component: Buy
    // meta: {
    //     requiresAuth: true
    // }
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
}, {
    path: "/perfil",
    name: "Profile",
    component: Profile,
    meta: {
        requiresAuth: true
    }
}, {
    path: "/definir-senha",
    name: "ChangePassword",
    component: ChangePassword,
    meta: {
        requiresAuth: true
    }
},
{
    path: "/editar-perfil",
    name: "EditProfile",
    component: EditProfile,
    meta: {
        requiresAuth: true
    }
}, {
    path: "/editar-anuncio/:id",
    name: "EditAdvertise",
    component: EditAdvertise,
    meta: {
        requiresAuth: true
    }
}, {
    path: "/:catchAll(.*)", 
    redirect: {
        name: "Home"
    }
}]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

const isAuthenticated = function() {
    return store.getters.isAuthenticated
}

router.beforeEach(function(to, from, next) {
    const requiresAuth = to.matched.some(function(record) {
        return record.meta.requiresAuth
    })

    const requiresAdmin = to.matched.some(function(record) {
        return record.meta.requiresAdmin
    })
    
    if (to.name !== "ChangePassword" && store.getters.getUser.use_is_temp_password) {
        next({name: "ChangePassword"})
    } else if (requiresAuth) {
        if (!isAuthenticated()) {
            next({name: "Login"})
        } else if (requiresAdmin && !store.getters.getUser.use_is_admin) {
            next({name: "Home"})
        } else {
            next()
        }
    } else if ((to.name === "Login" || to.name === "ForgotPassword") && isAuthenticated()) {
        next({name: "Home"})
    } else {
        next()
    }
})

export default router
