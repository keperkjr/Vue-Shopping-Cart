import shop from "@/api/shop"

export default {
    namespaced: true, 

    state: {
        // {id, quantity}
        items: [],

        checkoutStatus: null,
    },

    getters: {
        cartProducts(state, getters, rootState, rootGetters) {
            return state.items.map(cartItem => {
              const product = rootState.products.items.find(product => product.id == cartItem.id);
              return {
                title: product.title,
                price: product.price,
                quantity: cartItem.quantity,
              };
            });
        },
      
        cartTotal(state, getters) {
            return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
        },

        getCartItem(state, getters) {
            return ({id}) => {
                return state.items.find(item => item.id == id);
            } 
        },        
    },

    mutations: {
        pushProductToCart(state, productId) {
            state.items.push({
              id: productId,
              quantity: 1,
            });
        },

        addItemQuantity(state, cartItem) {
            cartItem.quantity++;
        },  

        removeItemQuantity(state, cartItem) {
            cartItem.quantity++;
        },          
        
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status;
        },
    
        emptyCart(state) {
            state.items = [];
        }              
    },

    actions: {
        addProductToCart(context, product) {
            context.commit('setCheckoutStatus', null)
            if (!context.rootGetters['products/productIsInStock'](product)) {
              // Out of stock
              let message = `${product.title} is out of stock!`;
              context.commit('setCheckoutStatus', message);
              throw new Error(message);
            }

            const cartItem = context.getters.getCartItem(product);
            if (!cartItem) {
              // add item to the cart
              context.commit('pushProductToCart', product.id);
            } else {
              // increment item quantity
              context.commit('addItemQuantity', cartItem);
            }
      
            context.commit('products/decrementProductQuantity', product, {root: true});
        },

        checkout(context) {
          return new Promise((resolve, reject) => {
            shop.buyProducts(
              context.state.items,
              () => {
                context.commit('emptyCart');
                context.commit('setCheckoutStatus', 'success');
                resolve();
              },
              () => {
                context.commit('setCheckoutStatus', 'failed');
                reject();
              }
            );
          });
        }        
    },
}