import shop from "@/api/shop"

export default {
    namespaced: true,
    
    state: {
        items: [],
    },

    getters: {
        availableProducts(state, getters) {
            return state.items.filter(product => product.inventory > 0);
        },
    
        productIsInStock(state, getters) {
            return (product) => {
                return product.inventory > 0
            }
        },
        getProductItem(state, getters) {
            return (id) => {
                id = (typeof id !== 'object') ? id : getters.getProductItemIndex(id);
                return state.items[id];
            } 
        }, 
    
        getProductItemIndex(state, getters) {
            return ({id}) => {
                return state.items.findIndex(item => item.id === id);
            }  
        }        
    },

    mutations: {
        setProducts(state, products) {
            // update products
            state.items = products;
        },
    
        decrementProductQuantity(state, product) {
            product.inventory--;
        },

        addProductQuantity(state, product) {
            product.inventory++;
        },        
    },

    actions: {
        fetchProducts(context) {
            return new Promise((resolve, reject) => {
              // Make the call to get the products
              shop.getProducts(products => {
                  context.commit('setProducts', products);
                  resolve();
                }, 1000);    
            });  
        },
    },
}

// // https://stackoverflow.com/a/60610161
// function getProductItem(state, id) {
//     return state.items[getProductItemIndex(state, id)];
// }

// function getProductItemIndex(state, {id}) {
//     return state.items.findIndex(item => item.id === id);
// }