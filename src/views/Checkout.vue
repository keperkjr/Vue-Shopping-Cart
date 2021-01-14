<template>
    <section class="section-container">
        <ShoppingCart :isCheckout="true" :title="'Checkout'" />      
    </section>    
</template>

<script>
import ShoppingCart from "@/components/ShoppingCart"

export default {
    components: {
        ShoppingCart,
    }
}
</script>

<style scoped>
.section-container {
    width: 95%;
    margin-left: 25px;
}
</style>