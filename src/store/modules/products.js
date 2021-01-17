// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Oct 13, 2020
//    Taken From: http://programmingnotes.org/
//    File:  products.js
//    Description: Vuex store products namespace
// ============================================================================ 
import shop from "@/api/shop"
import Utils from "@/js/utils"

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
        }, 
        filterProducts(state, getters) {
            return (category) => {
                return filterCategory(state.items, category);
            }
        }
    },

    mutations: {
        setProducts(state, data) {
            // update products
            state.items = data.items;
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
            const category = ((data && data.category != null ? data.category : null) || '').toLowerCase();
            let delay = (data && data.delay != null ? data.delay : 1000);

            return new Promise((resolve, reject) => {
                let setProducts = (items)  => {
                    context.commit('setProducts', {
                        items,
                    });                    
                }
                setTimeout(() => {
                    if (context.state.items.length > 0) {
                        resolve();
                    } else {
                        // Make the call to get the products
                        shop.getProducts(products => {
                            setProducts(products);
                            resolve();
                        }, 0); 
                    }
                }, delay)            
            });  
        },
    },
}

function filterCategory(products, category) {
    return products.filter(product => {
        let item = product.categories.find(item => Utils.isEmpty(category) || item.toLowerCase() === category);
        return item != null;
    });    
}

// // https://stackoverflow.com/a/60610161
// function getProductItem(state, id) {
//     return state.items[getProductItemIndex(state, id)];
// }

// function getProductItemIndex(state, {id}) {
//     return state.items.findIndex(item => item.id === id);
// }