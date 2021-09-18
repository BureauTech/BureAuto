import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        user: {}
    },
    mutations: {
        setAuth: function(state, payload) {
            state.isAuthenticated = payload
        },

        setUser: function(state, payload) {
            state.user = payload
        }
    },
    getters: {
        isAuthenticated: function(state) {
            return state.isAuthenticated
        },
        
        getUser: function(state) {
            return state.user
        }
    },

    actions: {
        setAuth: function(context, payload) {
            context.commit("setAuth", payload)
        },

        setUser: function(context, payload) {
            context.commit("setUser", payload)
        }
    }
})