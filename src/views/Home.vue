<!-- https://vueschool.io/lessons/create-a-new-project-with-vue-cli -->

<template>
    <div id="app">
        <!-- <el-button @click="startHacking">Start</el-button> -->
        <div class="products">
            <ProductList />
        </div>
        <!-- <hr /> -->
        <div class="cart">
            <ShoppingCart />
        </div>
    </div>    
</template>

<script>
import ProductList from "@/components/ProductList";
import ShoppingCart from "@/components/ShoppingCart";

export default {
    name: "app",
    components: {
        ProductList,
        ShoppingCart,
    },
    methods: {
        startHacking () {
            this.$notify({
                title: 'It works!',
                type: 'success',
                message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
                duration: 5000
            })
        }
    }    
}
</script>

<style scoped>
.headerText {
    font-size: 2em;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;    
}

.products, .cart {
    display: inline-block;
    vertical-align: top;
    border: 1px solid lightgrey;
    padding: 20px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: white;
}

.products {
    width: 70%;
    margin-right: 16px;
}

.cart {
    width: 25%;
}

</style>
