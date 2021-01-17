<!-- 
// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Oct 13, 2020
//    Taken From: http://programmingnotes.org/
//    File:  Home.vue
//    Description: The homepage of the site
// ============================================================================ 
-->
<template>
    <div class="home">
        <Content slug="" />
    </div>    
</template>

<script>
import Content from "@/views/Content";

export default {
    name: "app",
    components: {
        Content,
    },
    methods: {}    
}
</script>
