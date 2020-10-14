<!-- https://vueschool.io/lessons/create-a-new-project-with-vue-cli -->

<template>
  <div id="app">
    <h1> Shopping Cart Example </h1>
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
import ProductList from "@/components/ProductList.vue";
import ShoppingCart from "@/components/ShoppingCart.vue";

export default {
  name: "app",
  components: {
    ProductList,
    ShoppingCart,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.products, .cart {
  display: inline-block;
  vertical-align: top;
}

.products {
  width: 60%;
}

</style>
