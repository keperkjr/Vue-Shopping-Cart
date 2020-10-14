<template>
    <div>
        <h1> Shopping Cart </h1>
        <p v-show="!products.length"><i>Please add some products to cart.</i></p>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{product.title}} - {{product.price | currency}} - {{product.quantity}}
            </li>
        </ul>
        <p> Total: {{total | currency}} </p>

        <button @click="checkout()"> Checkout</button>
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
    }
}
</script>

<style scoped>
h1 {
    vertical-align: top;
    display: inline;
}
</style>