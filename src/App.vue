<!-- https://vueschool.io/lessons/create-a-new-project-with-vue-cli -->

<template>
    <div id="app">
        <TopNavigation />
        <div class="container">
            <div class="sideNav">
                <SideNavigation />
            </div>
            <div class="content">        
                <transition name="fade" mode="out-in"> 
                    <router-view :key="$route.path" />
                </transition>
            </div>
        </div>
    </div>    
</template>

<script>
import TopNavigation from "@/components/TopNavigation"
import SideNavigation from "@/components/SideNavigation"

export default {
    name: "app",
    components: {
        TopNavigation,
        SideNavigation,
    },
    // methods: {
    //     ...mapActions({
    //         fetchProducts: 'products/fetchProducts',
    //     }),        
    // },

    // created() {
    //     this.isLoading = true;
    //     this.fetchProducts()
    //         .then(() => this.isLoading = false);        
    //     // this.$store.dispatch('fetchProducts')
    //     //     .then(() => this.isLoading = false);
    // }      
}
</script>

<style>
html, body { 
    margin:0; 
    padding:0; 
    height: 100%;
    background-color: #f5f6fa;
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
    margin-top: 0.67em;
    margin-bottom: 0.67em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold; 
    font-size: 25px;   
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;    
}

.inline {
    display: inline;
}

.container {
    display: flex;
    justify-content: space-between;
}

.content {
    display: inline-block;
    margin-top: 25px;
    min-width: 85%;
}

.sideNav {
    width: 210px;
    display: inline-block;
    vertical-align: top;
}


.grow:hover {
    transform: scale(1.1);
}

.grow {
    transition: all .2s ease-in-out;
}
</style>
