import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuthenticated: false
    },
    mutations: {
        setAuth: function(state, payload) {
            state.isAuthenticated = payload
        }
    },
    getters: {
        isAuthenticated: function(state) {
            return state.isAuthenticated
        }
    },
    actions: {
        setAuth: function(context, payload) {
            context.commit("setAuth", payload)
        }
    }
})