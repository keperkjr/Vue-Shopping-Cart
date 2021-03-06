<!-- 
// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Oct 13, 2020
//    Taken From: http://programmingnotes.org/
//    File:  App.vue
//    Description: The main app page for the site
// ============================================================================ 
-->
<template>
    <div id="app">
        <TopNavigation />
        <div class="app-container">
            <div class="side-nav">
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
import {mapState, mapGetters, mapActions} from 'vuex';
import TopNavigation from "@/components/TopNavigation"
import SideNavigation from "@/components/SideNavigation"

export default {
    name: "app",
    components: {
        TopNavigation,
        SideNavigation,
    },

    data() {
        return {
            isLoading: false,
        }
    },

    methods: {
        ...mapActions({
            fetchProducts: 'products/fetchProducts',
        }),        
    },

    created() {
        this.isLoading = true;
        this.fetchProducts()
            .then(() => this.isLoading = false);
                    
        // this.$store.dispatch('fetchProducts')
        //     .then(() => this.isLoading = false);
    }      
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

.header-text {
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

.grow:hover {
    transform: scale(1.1);
}

.grow {
    transition: all .2s ease-in-out;
}

.divider-line {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -webkit-flex-shrink: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    background-color: #dbdbdb;
    background-color: rgba(219,219,219,1);
    height: 1px;
    position: relative;
    top: .45em;
}

.divider {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    display: flex;
}

.divider-content {
    color: #8e8e8e;
    color: rgba(142,142,142,1);
    -webkit-box-flex: 0;
    -webkit-flex-grow: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    font-size: 13px;
    font-weight: 600;
    line-height: 15px;
    margin: 0 18px;
    text-transform: uppercase;
}

.section-container, .products, .cart {
    display: inline-block;
    vertical-align: top;
    border: 1px solid lightgrey;
    padding: 20px;
    padding-top: 12px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: white;
}
</style>

<style scoped>
.app-container {
    display: flex;
    justify-content: space-between;
}

.content {
    display: inline-block;
    margin-top: 25px;
    /* min-width: 85%; */
    width: 85%;
}

.side-nav {
    width: 210px;
    display: inline-block;
    vertical-align: top;
    box-shadow: 2px 0 10px rgba(0,0,0,.1);
    background-color: white;
    border: 1px solid lightgrey;
}

@media screen and (max-width: 800px) {
    .side-nav {
        min-width: unset;
        width: 150px;
        min-width: 150px;
    } 
    .app-container {
        justify-content: start;
    }           
}

@media screen and (max-width: 500px) {
    .side-nav {
        width: 65px;
        min-width: 65px;
    }         
}

/* @media screen and (max-width: 600px) {
    .content {
        min-width: unset;
    }          
} */
</style>