s<template>
    <section class="inline">        
        <article class="container">
            <div class="image-container" 
                :class="{'sold-out': isSoldOut(product) }" >
                <img class="image" src="https://www.freepngimg.com/thumb/sold_out/9-2-sold-out-png-pic-thumb.png" />
            </div>
            <div class="info">
                {{product.title}} - {{product.price | currency }} - {{product.inventory}}
            </div>            
        </article>
    </section>
</template>

<script>
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
    methods: {
        isSoldOut(product) {
            let result = product.inventory < 1;
            result = true;
            return result;
        }
    }
}
</script>

<style scoped>
.inline {
    display: inline-block;
}
.container, .image-container {    
    border: 1px solid lightgrey;
    padding: 10px;
    border-radius: 10px;
    /* min-height: 100px; */    
    /* min-width: 350px; */
    /* max-width: 400px; */
    height: 300px;
    width: 200px;
    display: inline-block;
}

.container {
    vertical-align: top;
    margin: 8px;
}

.image-container {
    width: 90%;
    height: 70%;    
    display: flex;
    justify-content: center;
    align-items: center;
}

.sold-out {
    background-color: salmon;
}

.image {
    /* width: 90%; */
    height: 200px;
}

.info {
    font-weight: bold;
    margin-top: 10px;
}
</style>