import shop from "@/api/shop"
import * as Utils from "@/js/utils"

export default {
    namespaced: true,
    
    state: {
        items: [],
        allItems: [],
    },

    getters: {
        availableProducts(state, getters) {
            return state.allItems.filter(product => product.inventory > 0);
        },
    
        productIsInStock(state, getters) {
            return (product) => {
                return product.inventory > 0
            }
        },
        getProductItem(state, getters) {
            return (index) => {
                index = (typeof index !== 'object') ? index : getters.getProductItemIndex(index);
                return state.allItems[index];
            } 
        }, 
        getProductItemIndex(state, getters) {
            return ({id}) => {
                return state.allItems.findIndex(item => item.id === id);
            }  
        },   
        getCategories(state, getters) {
            return () => {
                return Utils.arrayUnique(state.allItems, item => item.categories).sort();
            }  
        }
    },

    mutations: {
        setProducts(state, data) {
            // update products
            state.items = data.products;
            state.allItems = data.allItems;
        },
    
        decrementProductQuantity(state, product) {
            product.inventory--;
        },

        addProductQuantity(state, product) {
            product.inventory++;
        },        
    },

    actions: {
        fetchProducts(context, data) {
            const category = data.category || '';
            let delay = data.delay || 1000;

            return new Promise((resolve, reject) => {
                // Make the call to get the products
                shop.getProducts(products => {
                    let allItems = products;
                    if (!Utils.isEmpty(category)) {
                        products = products.filter(product => {
                            let item = product.categories.find(item => item.toLowerCase() === category.toLowerCase());
                            return item != null;
                        });
                    }
                    context.commit('setProducts', {
                        products,
                        allItems,
                    });
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