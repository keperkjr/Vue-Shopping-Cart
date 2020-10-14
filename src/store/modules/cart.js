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
    },

    mutations: {
        pushProductToCart(state, productId) {
            state.items.push({
              id: productId,
              quantity: 1,
            });
        },

        incrementItemQuantity(state, cartItem) {
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
      
            const cartItem = context.state.items.find(item => item.id == product.id);
            if (!cartItem) {
              // add item to the cart
              context.commit('pushProductToCart', product.id);
            } else {
              // increment item quantity
              context.commit('incrementItemQuantity', cartItem);
            }
      
            context.commit('products/decrementProductQuantity', product, {root: true});
        },

        checkout(context) {
            shop.buyProducts(
              context.state.items,
              () => {
                context.commit('emptyCart');
                context.commit('setCheckoutStatus', 'success');
              },
              () => {
                context.commit('setCheckoutStatus', 'failed');
              }
            );
        }        
    },
}