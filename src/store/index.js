import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // data
    products: [],
  },
  getters: { // computed properties
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
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
