import shop from "@/api/shop"
import * as Utils from "@/js/utils"

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
            return (index) => {
                index = (typeof index !== 'object') ? index : getters.getProductItemIndex(index);
                return state.items[index];
            } 
        }, 
        getProductItemIndex(state, getters) {
            return ({id}) => {
                return state.items.findIndex(item => item.id === id);
            }  
        },   
        getCategories(state, getters) {
            return () => {
                return Utils.arrayUnique(state.items, item => item.categories).sort();
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
        fetchProducts(context, delay = 1000) {
            return new Promise((resolve, reject) => {
              // Make the call to get the products
              shop.getProducts(products => {
                  context.commit('setProducts', products);
                  resolve();
                }, delay);    
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