s<template>
    <article class="container">
        <div class="image-container" 
            :class="{'sold-out': isSoldOut }" >
            <img class="image" :src="getImageSrc()" />
        </div>
        <div class="info">
            {{product.title}} - {{product.price | currency }} - {{product.inventory}}
            <el-button 
                type="primary" 
                size="small"
                plain
                :disabled="!productIsInStock(product)"
                @click="addProductToCart(product)">
                Add To Cart
            </el-button>                
        </div>            
    </article>
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
            let image = this.product.image || 'https://www.immigrantmagazine.com/wp-content/uploads/2020/07/no-image-available-png-3.png';
            if (this.isSoldOut) {
                image = "https://www.freepngimg.com/thumb/sold_out/9-2-sold-out-png-pic-thumb.png";
            }
            return image;
        }

    }
}
</script>

<style scoped>
.container {
    display: inline-block;
    /* padding: 10px; */
    height: 400px;
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
    height: 75%;    
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
    font-weight: bold;
    padding-top: 10px;
    border-top: 1px solid lightgrey;
}
</style>