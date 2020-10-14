import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop"

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // data
    products: [],

    // {id, quantity}
    cart: [],
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

    addProductToCart(context, product) {
      if (product.inventory < 1) {
        // Out of stock
        throw new Error('Item is out of stock!')
      }

      const cartItem = context.state.cart.find(item => item.id == product.id);
      if (!cartItem) {
        // add item to the cart
        context.commit('pushProductToCart', product.id);
      } else {
        // increment item quantity
        context.commit('incrementItemQuantity', cartItem);
      }

      context.commit('decrementProductQuantity', product);
    }
  },
  mutations: { // Set and update the state
    setProducts(state, products) {
      // update products
      state.products = products;
    },

    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1,
      });
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },

    decrementProductQuantity(state, product) {
      product.inventory--;
    }
  },
  modules: {}
});
