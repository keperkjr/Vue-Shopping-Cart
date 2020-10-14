import shop from "@/api/shop"

export default { // methods
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
      if (!context.getters.productIsInStock(product)) {
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
    },

    checkout(context) {
      shop.buyProducts(
        context.state.cart,
        () => {
          context.commit('emptyCart');
          context.commit('setCheckoutStatus', 'success');
        },
        () => {
          context.commit('setCheckoutStatus', 'failed');
        }
      );
    }

  }