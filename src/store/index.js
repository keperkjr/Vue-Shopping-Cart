import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // data
    poducts: [],
  },
  getters: { // computed properties
    productsCount() {

    }
  },
  actions: { // methods
    fetchProducts() {
      // Make the call to get the products
    }
  },
  mutations: { // Set and update the state
    setProducts(state, products) {
      // update products
      state.products = products;
    }
  },
  modules: {}
});
