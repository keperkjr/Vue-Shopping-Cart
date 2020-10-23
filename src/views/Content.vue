<template>
    <section>
        <div class="products">
            <ProductList :category="slug"/>
        </div>
        <div class="cart">
            <ShoppingCart />
        </div> 
    </section>  
</template>

<script>
import ProductList from "@/components/ProductList";
import ShoppingCart from "@/components/ShoppingCart";
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
    components: {
        ProductList,
        ShoppingCart,
    },
    data() {
        return {
            // destinationId: this.$route.params.id,
            // slug: this.$route.params.slug,
        }
    },
    props: {
        slug: {
            type: String,
            required: true,
        },      
    },
    computed: {
    },
    methods: {
    }    
}
</script>

<style scoped>
.products, .cart {
    display: inline-block;
    vertical-align: top;
    border: 1px solid lightgrey;
    padding: 20px;
    padding-top: 12px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: white;
}

.products {
    min-width: 68%;
    margin-right: 10px;
}

.cart {
    min-width: 25%;
}

@media screen and (max-width: 1350px) {
    .cart {
        display: none;
    }
}

@media screen and (max-width: 1000px) {
    .products {
        width: 50%;
    }
}
</style>