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
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity,
                    inventory: product.inventory,
                    subtotal: product.price * cartItem.quantity,
                };
            });
        },
      
        cartTotal(state, getters) {
            return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
        },

        cartQuantity(state, getters) {
            return state.items.reduce((total, item) => total + item.quantity, 0);
        },        

        getCartItem(state, getters) {
            return (id) => {
                id = (typeof id !== 'object') ? id : getters.getCartItemIndex(id);
                return state.items[id];
            } 
        },

        getCartItemIndex(state, getters) {
            return ({id}) => {
                return state.items.findIndex(item => item.id === id);
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

        removeProductFromCart(state, index) {
            state.items.splice(index, 1);
        },          

        addItemQuantity(state, cartItem) {
            cartItem.quantity++;
        },  

        subtractItemQuantity(state, cartItem) {
            cartItem.quantity--;
        },                 
        
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status;
        },
    
        emptyCart(state) {
            state.items = [];
        }              
    },

    actions: {
        adjustQuantity(context, data) {
            let product = data.product;
            let newQuantity = data.quantity;

            context.commit('setCheckoutStatus', null);
            const index = context.getters.getCartItemIndex(product);            
            if (index < 0) {
                let message = `${product.title} does not exist in the cart!`;
                context.commit('setCheckoutStatus', message);
                throw new Error(message);
            }            
            const cartItem = context.getters.getCartItem(index);
            let adjustment = newQuantity - cartItem.quantity;
            if (adjustment > 0) {
                // Add
                for (let index = 1; index <= Math.abs(adjustment); ++index) {
                    let originalProduct = getActualProduct(context, product); 
                    context.dispatch('addProductToCart', originalProduct);
                }
            } else {
                // Subtract
                for (let index = 1; index <= Math.abs(adjustment); ++index) {
                    context.dispatch('removeProductFromCart', product);
                }                 
            }          
        },

        removeProductFromCart(context, product) {
            context.commit('setCheckoutStatus', null);
            const index = context.getters.getCartItemIndex(product);            
            if (index < 0) {
                let message = `${product.title} does not exist in the cart!`;
                context.commit('setCheckoutStatus', message);
                throw new Error(message);
            }            
            const cartItem = context.getters.getCartItem(index);
            if (cartItem.quantity <= 1) {
                // remove the item from the the cart
                context.commit('removeProductFromCart', index);
            } else {
              // subtract item quantity
              context.commit('subtractItemQuantity', cartItem);
            }
            let originalProduct = getActualProduct(context, product);            
            context.commit('products/addProductQuantity', originalProduct, {root: true});            
        },

        addProductToCart(context, product) {             
            context.commit('setCheckoutStatus', null);
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

function getActualProduct(context, product) {
    return context.rootGetters['products/getProductItem'](product);
}