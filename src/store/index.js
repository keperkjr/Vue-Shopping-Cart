import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop"

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
    fetchProducts(context) {
      return new Promise((resolve, reject) => {
        // Make the call to get the products
        shop.getProducts(products => {
          context.commit('setProducts', products);
          resolve();
        });        
      });      
    },

    // addToCart(context, product) {
    //   if (product.inventory > 0) {
    //     context.commit('pushProductToCart', product);
    //   } else {
    //     // Out of stock
    //   }
    // }
  },
  mutations: { // Set and update the state
    setProducts(state, products) {
      // update products
      state.products = products;
    }
  },
  modules: {}
});
