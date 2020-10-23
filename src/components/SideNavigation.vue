<template>
    <section class="container">
        <div class="headerContainer">
            <div class="headerText"> 
                Categories
            </div>
        </div>

        <div class="categories">
            <router-link to="/">
                <!-- :class="[$route.path === '/' ? 'active' : '']" -->
                <div class="category"                    
                >
                    Home
                </div> 
            </router-link>
            <span v-for="category in categories" :key="category" >
                <router-link :to="getNavigationPath(category)">
                    <!-- :class="[$route.path === getCategoryPath(category) ? 'active' : '']" -->
                    <div class="category"                        
                    >
                        {{category}}
                    </div>
                </router-link>
            </span>
        </div>
    </section>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
    data() {
        return {
            categories: [],
        }
    },

    computed: {
        ...mapState({
            products: state => state.products.items,            
        }),

        ...mapGetters('products', {
            getCategories: 'getCategories',
        })
    },
    
    methods: {
        ...mapActions('products', {
            fetchProducts: 'fetchProducts',
        }), 

        getCategoryPath(category) {
            return `/category/${category}`.toLowerCase();
        },
        getNavigationPath(category) {
            return {
                name: 'Content',
                params: {
                    slug: category.toLowerCase(),
                }
            };
        },
        
        setCategories() {
            this.categories = this.getCategories();
        }
    },

    created() {
        if (this.products.length > 0) {
            this.setCategories()
        } else {
            this.fetchProducts({
                delay: 0,
            }).then(() => this.setCategories() ); 
        } 
    }      
}
</script>

<style scoped>
.container {
    display: inline-block;
    vertical-align: top;
    border: 1px solid lightgrey;
    padding: 15px 0;
    background-color: white;
    width: 100%;
    height: 100vh;
}

.headerText {
    vertical-align: top;
    display: inline;  
    color: #767676;
}

.categories {
    margin-top: 28px;
    /* margin-right: 10px; */
    text-align: left;
}

.category {
    /* margin: 5px; */
    padding: 12px;
    border-bottom: 1px solid lightgray;
    transition: background 400ms;
    /* border-left: 3px solid #ea7201; */
    font-weight: bold;
}

.category:hover {
    /* border-bottom: 1px solid orange; */
    font-weight: bold;
    background-color: #f4f4f4;
}

.categories a {
    color: grey;
    text-decoration: none;
}

.active {
    /* transform: scale(1.1); */
    border-left: 3px solid #4CAF50;
    /* border-bottom: 1px solid orange; */
    background-color: #eff0f1;
    color: black;
    font-weight: bold;

    background-color: var(--sideNavActiveBackground) !important;
    color: var(--sideNavActiveColor);
    border-left: 3px solid var(--sideNavActiveColor);
}

.router-link-exact-active > .category {
    /* transform: scale(1.1); */
    border-left: 3px solid #4CAF50;
    /* border-bottom: 1px solid orange; */
    background-color: #eff0f1;
    color: black;
    font-weight: bold;

    background-color: var(--sideNavActiveBackground) !important;
    color: var(--sideNavActiveColor);
    border-left: 3px solid var(--sideNavActiveColor);
}
</style>

<style>
:root {
  --sideNavActiveColor: #1967d2;
  --sideNavActiveBackground: #e8f0fe;
}
</style>