<!-- 
// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Oct 15, 2020
//    Taken From: http://programmingnotes.org/
//    File:  NotFound.vue
//    Description: The not found page of the site
// ============================================================================ 
-->
<template>
    <div class="margin">
        <h1>Page Not Found: {{$route.path}}</h1>
        <p>Oops.... We couldn't find that page. Try going
            <router-link to="/">
                home
            </router-link>
        </p>
    </div>
</template>

<style scoped>
    .margin {
        margin-top: 60px;
    }
</style>