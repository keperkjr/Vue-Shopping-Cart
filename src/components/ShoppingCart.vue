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

        <el-button @click="cartCheckout()"> Checkout</el-button>
        <p v-if="checkoutStatus">{{checkoutStatus}}</p>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
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
        cartCheckout() {
            let status = {};
            status.onSuccess = () => {
                this.$notify({
                    title: 'Success!',
                    type: 'success',
                    message: `You have successfully purchased ${this.products.length} item(s)!`,
                    duration: 5000
                });
            };
            status.onFailure = () => {
                this.$notify({
                    title: 'Error!',
                    type: 'error',
                    message: 'Oh no, something went wrong... Please try again!',
                    duration: 5000
                });                 
            }            
            this.checkout(status);
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