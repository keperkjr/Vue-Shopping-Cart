<!-- https://vueschool.io/lessons/create-a-new-project-with-vue-cli -->

<template>
    <div class="home">
        <!-- <el-button @click="startHacking">Start</el-button> -->
        <!-- <div class="products">
            <ProductList />
        </div> -->
        <!-- <hr /> -->
        <!-- <div class="cart">
            <ShoppingCart />
        </div> -->

        <Content slug="" />
    </div>    
</template>

<script>
// import ProductList from "@/components/ProductList";
// import ShoppingCart from "@/components/ShoppingCart";
import Content from "@/views/Content";

export default {
    name: "app",
    components: {
        // ProductList,
        // ShoppingCart,
        Content,
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
    min-width: 72%;
    margin-right: 10px;
}

.cart {
    min-width: 25%;
}
</style>
