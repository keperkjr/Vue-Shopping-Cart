// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Oct 13, 2020
//    Taken From: http://programmingnotes.org/
//    File:  index.js
//    Description: Vuex index file that sets up the store for the project
// ============================================================================ 
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
import actions from "./actions"
import cart from "./modules/cart"
import products from "./modules/products"
import users from "./modules/users"

Vue.use(Vuex);

//https://stackoverflow.com/questions/43027499/vuex-state-on-page-refresh
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
