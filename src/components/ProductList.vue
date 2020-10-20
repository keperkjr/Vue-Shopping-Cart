<template>
    <section> 
        <div class="headerContainer">
            <div class="headerText"> 
                Products 
            </div>            
        </div>
        <div v-if="isLoading">
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
    </section>
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
            isLoading: false,
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
        if (this.products.length > 0) {
            return;
        }        
        this.isLoading = true;
        this.fetchProducts()
            .then(() => this.isLoading = false);        
        // this.$store.dispatch('fetchProducts')
        //     .then(() => this.isLoading = false);
    }
}
</script>

<style scoped>
.headerContainer {
    margin-bottom: 15px;
}

.headerText {
    vertical-align: top;
    display: inline;    
}
</style>