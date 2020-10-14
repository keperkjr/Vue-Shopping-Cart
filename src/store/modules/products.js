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
    },

    actions: {
        fetchProducts(context) {
            return new Promise((resolve, reject) => {
              // Make the call to get the products
              shop.getProducts(products => {
                context.commit('setProducts', products);
                resolve();
              });        
            });      
        },
    },
}