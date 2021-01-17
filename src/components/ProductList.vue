<!-- 
// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Oct 13, 2020
//    Taken From: http://programmingnotes.org/
//    File:  ProductList.vue
//    Description: Displays the products for a given category 
// ============================================================================ 
-->
<template>
    <section> 
        <div class="header-container">
            <div class="header-text"> 
                {{categoryName}} 
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
        // ...mapState({
        //     products: state => state.products.items,            
        // }),

        ...mapGetters('products', {
            productIsInStock: 'productIsInStock',
            availableProducts: 'availableProducts',
            filterProducts: 'filterProducts',
        }),

        categoryName() {
            let name = this.category && this.category.length > 0 
                ? this.category : 'Products';
            return name;
        },

        products() {
            return this.filterProducts(this.category);
        }
                
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

    props: {
        category: {
            type: String,
            required: true,
        },      
    },    

    created() {    
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
        }, 1000);        
    }
}
</script>

<style scoped>
.header-container {
    margin-bottom: 15px;
}

.header-text {
    vertical-align: top;
    display: inline;  
    text-transform: capitalize;  
}
</style>