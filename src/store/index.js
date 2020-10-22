import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
import actions from "./actions"
import cart from "./modules/cart"
import products from "./modules/products"
import users from "./modules/users"

Vue.use(Vuex);

// npm install --save vuex-persistedstate

export default new Vuex.Store({
    state: { // data
    },

    getters: { // computed properties
    },

    actions: actions,

    mutations: { // Set and update the state
    },

    modules: {
        cart,
        products,
        users,
    },

    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],    
});
