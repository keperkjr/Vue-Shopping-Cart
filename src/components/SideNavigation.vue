<template>
    <section class="container">
        <div class="headerContainer">
            <div class="headerText"> 
                Categories
            </div>
        </div>

        <div class="categories">
            <ul>
                <li>
                    <div class="category">
                        <router-link to="/">
                            Home
                        </router-link>
                    </div>                    
                </li>
                <li v-for="category in categories()" :key="category">
                    <div class="category">
                        <router-link :to="getCategoryPath(category)">
                            {{category}}
                        </router-link>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
    data() {
        return {
        }
    },

    computed: {
        ...mapState({
            products: state => state.products.items,            
        }),

        ...mapGetters('products', {
            categories: 'getCategories',
        })
    },
    
    methods: {
        ...mapActions({
            fetchProducts: 'products/fetchProducts',
        }), 

        getCategoryPath(category) {
            return `/category/${category}`.toLowerCase();
        }
    },

    created() {
        this.fetchProducts(0);  
    }      
}
</script>

<style scoped>
.container {
    display: inline-block;
    vertical-align: top;
    border: 1px solid lightgrey;
    padding: 20px 3px;
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
    margin-top: 15px;
    text-align: left;
}

.category {
    margin: 5px;    
}

ul {
    list-style-type: none;
}
</style>