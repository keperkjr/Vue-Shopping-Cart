<template>
    <div>
        <div class="headerText"> Shopping Cart </div>
        <p v-show="!products.length"><i>Please add some products to cart.</i></p>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{product.title}} - {{product.price | currency}} - {{product.quantity}}
            </li>
        </ul>
        <p> Total: {{total | currency}} </p>

        <el-button @click="cartCheckout()" :loading="processing"> Checkout</el-button>
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
        }),
        async cartCheckout() {
            this.processing = true;
            let message = {
                title: 'Success!',
                type: 'success',
                message: `You have successfully purchased ${this.products.length} item(s)!`,
            }    
            try {
                await this.checkout();
            } catch (e) {
                message = {
                    title: 'Error!',
                    type: 'error',
                    message: 'Oh no, something went wrong... Please try again!',
                }                
            }
            this.processing = false;
            this.$notify(message);  
        }
    }
}
</script>

<style scoped>
.headerText {
    vertical-align: top;
    display: inline;
}
</style>