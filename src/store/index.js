import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions"
import cart from "./modules/cart"
import products from "./modules/products"

Vue.use(Vuex);

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
  }
});
