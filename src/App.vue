<!-- https://vueschool.io/lessons/create-a-new-project-with-vue-cli -->

<template>
    <div id="app">
        <TopNavigation />
        <transition name="fade" mode="out-in"> 
            <router-view :key="$route.path" />
        </transition>
    </div>    
</template>

<script>
import TopNavigation from "@/components/TopNavigation"

export default {
    name: "app",
    components: {
        TopNavigation,
    },
    methods: {
    }    
}
</script>

<style>
html, body { 
    margin:0; 
    padding:0; 
    background-color: #f1f3f8;
}

* { 
    box-sizing: border-box; 
}

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

.center {
    display: flex;
    justify-content: center;
    align-items: center;    
}

.inline {
    display: inline;
}
</style>
