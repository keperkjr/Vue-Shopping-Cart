<!-- 
// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Oct 14, 2020
//    Taken From: http://programmingnotes.org/
//    File:  ProductItem.vue
//    Description: Displays a product to the page
// ============================================================================ 
-->
<template>
    <section class="container">
        <article class="image-container" 
            :class="{'sold-out': isSoldOut }" >
            <img class="grow image" :src="getImageSrc()" />
        </article>
        <article class="info">
            <!-- {{product.title}} - {{product.price | currency }} - {{product.inventory}} -->
            <div class="title">
                {{product.title}}
            </div>
            <div class="inventory">
                <span v-if="product.inventory > 0">Only</span> {{product.inventory}} left in stock!
            </div>

            <div class="bottom">
                <div class="inline price">
                    {{product.price | currency}}
                </div>
                <div class="inline action">
                    <el-button 
                        type="primary" 
                        size="small"
                        icon="el-icon-shopping-cart-full"
                        plain
                        :disabled="!productIsInStock(product)"
                        @click="addProductToCart(product)">
                        Add To Cart
                    </el-button>                     
                </div>
            </div>               
        </article>            
    </section>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
    data() {
        return {
        }
    },
    props: {
        product: {
            type: Object,
            required: true,
        },        
    },
    computed: {
        ...mapGetters('products', {
            productIsInStock: 'productIsInStock',
            availableProducts: 'availableProducts',
        }),  
        isSoldOut() {
            let result = !this.$store.getters['products/productIsInStock'](this.product);
            // result = true;
            return result;
        },                     
    },
    methods: {
        ...mapActions({
            addProductToCart: 'cart/addProductToCart',
        }),
        getImageSrc() {
            let image = this.product.image ? this.product.image : 'no-image.png';
            if (this.isSoldOut) {
                image = 'sold-out.png';
            }
            let path = image;
            try {
                path = require(`@/assets/${image}`);
            } catch (e) {+e;}            
            return path;
        }, 
    }
}
</script>

<style scoped>
.container {
    display: inline-block;
    /* padding: 10px; */
    height: 420px;
    width: 250px;
    display: inline-block;    
    vertical-align: top;
    /* margin: 8px; */
    /* border-radius: 10px; */
    border: 1px solid lightgrey;
    border-left: none;
}

.container:first-of-type {   
    border-left: 1px solid lightgrey;
}

.image-container {
    padding: 10px;
    width: 100%;
    /* height: 75%;     */
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #eee; */
    box-sizing: border-box;
    /* border-top-left-radius: 8px;
    border-top-right-radius: 8px; */
}

.sold-out {
    background-color: salmon;
}

.image {
    /* width: 90%; */
    /* height: 200px; */
    height: 75%;
}

.info {
    padding: 10px;
    border-top: 1px solid #eee;
    text-align: left;
    font-family: BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,
        Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,
        Noto Color Emoji;
}

.title {
    font-size: 20px;    
    color: black;
    font-weight: bold;
}

.inventory {
    color: #d17581;
    font-size: 14px;
    margin: 3px 0;
}

.price {
    font-size: 18px;
    color: #3eaf7c;
    font-weight: bold;
}

.bottom {
    margin-top: 18px;
    display: flex; 
    align-items: center;
    justify-content: space-between;    
}

.action {
    /* float: right; */
}

.el-button--primary.is-plain {
    /* background-color: #e5eaef; */
    color: #398ee5;
    font-weight: bold;
}

.el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover {
    color: #fff;
}

@media screen and (max-width: 950px) {
    .container {
        border: 1px solid lightgrey;
        border-top: none;
    }

    .container:first-of-type {   
        border-top: 1px solid lightgrey;
    }        
}

@media screen and (max-width: 600px) {
    .container {
        width: 220px;
        height: 100%;
    }

    .grow:hover {
        transform: unset;
    }       
}
</style>