import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuthenticaded: false
    },
    mutations: {
        setAuth: function(state, payload) {
            state.isAuthenticaded = payload
        }
    },
    getters: {
        isAuthenticaded: function(state) {
            return state.isAuthenticaded
        }
    },
    actions: {
        setAuth: function(context, payload) {
            context.commit("setAuth", payload)
        }
    }
})