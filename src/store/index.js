import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: []
    },
    mutations: {
        addUser(state, payload) {
            state.user.push(payload)
        }
    },
    actions: {
        addUser(store, payload) {
            store.commit('addUser', payload)
        }
    },
    modules: {}
})