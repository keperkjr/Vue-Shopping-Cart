<!-- https://vueschool.io/lessons/create-a-new-project-with-vue-cli -->

<template>
  <div id="app">
    <div class="headerText"> Shopping Cart Example </div>
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
  border-radius: 10px;
}

.products {
  width: 70%;
  margin-right: 15px;
}

</style>
