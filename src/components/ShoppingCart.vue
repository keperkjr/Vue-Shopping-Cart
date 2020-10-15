<template>
    <div>
        <div class="headerText"> Cart Summary </div>
        <p v-show="!products.length"><i>Please add some products to cart.</i></p>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{product.title}} - {{product.price | currency}} - {{product.quantity}}
                <el-button 
                    type="primary" 
                    size="small"
                    plain
                    @click="removeProductFromCart(product)">
                    Remove 1
                </el-button>                 
            </li>
        </ul>
        <p> Total: {{total | currency}} </p>

        <el-button type="primary" @click="cartCheckout()" :loading="processing"> Checkout</el-button>
        <p v-if="checkoutStatus">{{checkoutStatus}}</p>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    data() {
        return {
            processing: false,
        }
    },
    computed: {
        ...mapState('cart', {
            checkoutStatus: state => state.checkoutStatus,
        }),

        ...mapGetters('cart', {
            products: 'cartProducts',
            total: 'cartTotal',
            quantity: 'cartQuantity',
        }),

        // products() {
        //     return this.$store.getters.cartProducts;
        // },
        // total() {
        //     return this.$store.getters.cartTotal;
        // }        
    }, 
    methods: {
        ...mapActions('cart', {
            checkout: 'checkout',
            removeProductFromCart: 'removeProductFromCart',
        }),
        async cartCheckout() {
            this.processing = true;
            let message = {
                title: 'Success!',
                type: 'success',
                message: `You have successfully purchased ${this.quantity} item${this.quantity == 1 ? '' : 's'}!`,
            }             
            if (this.products.length < 1) {
                message = {
                    title: 'Oops...',
                    type: 'info',
                    message: 'Please add some products to cart before checking out!',
                }  
            } else {
                try {
                    await this.checkout();
                } catch (e) {
                    message = {
                        title: 'Error!',
                        type: 'error',
                        message: 'Oh no, something went wrong... Please try again!',
                    }                
                }
            }   
            this.processing = false;
            this.$notify(message);  
        },
    }
}
</script>

<style scoped>
.headerText {
    vertical-align: top;
    display: inline;
}
</style>