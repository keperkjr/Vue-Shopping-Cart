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
    width: 85%;
    margin-left: 25px;
    margin-left: 5px;
    
}

@media screen and (max-width: 1000px) {
    .section-container {
        margin-left: 25px;
    }   
}

@media screen and (max-width: 800px) {
    .section-container {
        margin-left: unset;
    }
}

@media screen and (max-width: 600px) {
    .section-container {
        padding-left: 5px;
        padding-right: 5px;
    }      
}
</style>