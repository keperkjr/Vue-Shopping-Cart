<template>
    <section class="sideNavContainer">
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
                    <div class="category" v-html="categoryDisplay(category)"
                    >                        
                        <!-- {{category}}                     -->
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

        categoryDisplay(category) {
            return `
                <div class="icon music"></div>
                ${category}
            `;
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
.sideNavContainer {
    display: inline-block;
    vertical-align: top;
    border: 1px solid lightgrey;
    padding: 15px 0;
    background-color: white;
    width: 100%;
    height: 100vh;
    overflow: auto;
    text-overflow: ellipsis;
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

.router-link-exact-active .category {
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

/* @media screen and (max-width: 600px) {
    .sideNavContainer .headerContainer {
        display: none;
    }     
} */
</style>

<style>
:root {
  --sideNavActiveColor: #1967d2;
  --sideNavActiveBackground: #e8f0fe;
}

.icon {
    background-size: 35px 35px ;
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 50%;
}

.icon.music {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="15.5" r="2.5"/><path d="M8 17V5l12-2v12"/></svg>');  
}
</style>