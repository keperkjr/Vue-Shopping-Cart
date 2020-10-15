s<template>
    <section class="inline">        
        <article class="container">
            <div class="image-container" 
                :class="{'sold-out': isSoldOut(product) }" >
                <img class="image" :src="getImageSrc(product)" />
            </div>
            <div class="info">
                {{product.title}} - {{product.price | currency }} - {{product.inventory}}
                <button 
                :disabled="!productIsInStock(product)"
                @click="addProductToCart(product)">
                    Add To Cart
                </button>                
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
        })        
    },
    methods: {
        ...mapActions({
            addProductToCart: 'cart/addProductToCart',
        }),

        isSoldOut(product) {
            let result = !this.$store.getters['products/productIsInStock'];
            // result = true;
            return result;
        },
        getImageSrc(product) {
            let image = product.image || 'https://www.immigrantmagazine.com/wp-content/uploads/2020/07/no-image-available-png-3.png';
            if (this.isSoldOut(product)) {
                //image = "https://www.freepngimg.com/thumb/sold_out/9-2-sold-out-png-pic-thumb.png";
            }
            return image;
        }

    }
}
</script>

<style scoped>
.inline {
    display: inline-block;
}

.container {
    /* padding: 10px; */
    height: 300px;
    width: 250px;
    display: inline-block;    
    vertical-align: top;
    margin: 8px;
    border-radius: 10px;
    border: 1px solid lightgrey;
}

.image-container {
    padding: 10px;
    width: 100%;
    height: 70%;    
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #eee; */
    box-sizing: border-box;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.sold-out {
    background-color: salmon;
}

.image {
    /* width: 90%; */
    /* height: 200px; */
    height: 95%;
}

.info {
    font-weight: bold;
    margin-top: 10px;
    border-top: 1px solid lightgrey;
}
</style>