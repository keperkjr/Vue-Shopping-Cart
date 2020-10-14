<template>
    <div> 
        <div class="headerText"> Product List </div>
        <div v-if="loading">
            <Loading /> 
        </div>
        <!-- <ul v-else>
            <li v-for="product in products" :key="product.id"> 
                {{product.title}} - {{product.price | currency }} - {{product.inventory}}

                <button 
                :disabled="!productIsInStock(product)"
                @click="addProductToCart(product)">
                    Add To Cart
                </button>
            </li>
        </ul> -->
        <div v-else>
            <ProductItem 
                v-for="product in products" 
                :key="product.id"
                :product="product"
            ></ProductItem>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import Loading from "@/components/Loading";
import ProductItem from "@/components/ProductItem"

export default {
    components: {
        Loading,
        ProductItem,
    },
    data() {
        return {
            loading: false,
        }
    },

    computed: {
        ...mapState({
            products: state => state.products.items,            
        }),

        ...mapGetters('products', {
            productIsInStock: 'productIsInStock',
            availableProducts: 'availableProducts',
        })
        // products() {
        //     // return this.$store.getters.availableProducts;
        //     return this.$store.state.products;
        // },
        // productIsInStock() {
        //     return this.$store.getters.productIsInStock;
        // }
        
    },

    methods: {
        ...mapActions({
            fetchProducts: 'products/fetchProducts',
            addProductToCart: 'cart/addProductToCart',
        }),

        // addProductToCart(product) {
        //     this.$store.dispatch('addProductToCart', product);
        // }

    },

    created() {
        this.loading = true;
        this.fetchProducts()
            .then(() => this.loading = false);        
        // this.$store.dispatch('fetchProducts')
        //     .then(() => this.loading = false);
    }
}
</script>

<style scoped>
.headerText {
    vertical-align: top;
    display: inline;
}
</style>