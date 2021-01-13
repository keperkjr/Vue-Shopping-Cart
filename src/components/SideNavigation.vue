<template>
    <section class="side-nav-container">
        <div class="header-container">
            <div class="header-text navigation"> 
                Categories
            </div>
        </div>

        <div class="categories">
            <router-link to="/">
                <!-- :class="[$route.path === '/' ? 'active' : '']" -->
                <div class="category">
                    <div class="icon home"></div>
                    Home
                </div> 
            </router-link>
            <span v-for="category in categories" :key="category" >
                <router-link :to="getNavigationPath(category)">
                    <!-- :class="[$route.path === getCategoryPath(category) ? 'active' : '']" -->
                    <div class="category" v-html="categoryDisplay(category)">
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
                <div class="icon ${this.getCssClass(category)}"></div>
                ${category}
            `;
        },

        getCssClass(category) {
            return category.trim().toLowerCase();
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
.side-nav-container {
    display: inline-block;
    vertical-align: top;    
    padding: 15px 0;    
    width: 100%;
    height: 100vh;
    overflow: auto;
    text-overflow: ellipsis;
}

.header-text {
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
    .side-nav-container .header-container {
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
    display: inline-block;
}

.icon:before {
	width: 20px;
	height: 20px;
	margin-right: 10px;
	content: "";
	display: inline-block;
	vertical-align: middle;
	background-size: 100%;
	transform: translateY(-10%);  
    background-repeat: no-repeat; 
}

.icon.music:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='5.5' cy='17.5' r='2.5'/%3E%3Ccircle cx='17.5' cy='15.5' r='2.5'/%3E%3Cpath d='M8 17V5l12-2v12'/%3E%3C/svg%3E");        
}

.icon.clothing:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='5.5' cy='17.5' r='2.5'/%3E%3Ccircle cx='17.5' cy='15.5' r='2.5'/%3E%3Cpath d='M8 17V5l12-2v12'/%3E%3C/svg%3E");        
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 297 297' style='enable-background:new 0 0 297 297;' xml:space='preserve'%3E%3Cpath d='M216.323,4.945C214.54,1.912,211.287,0,207.718,0H89.282c-3.573,0-6.828,1.916-8.61,4.954L66.707,30.448H34.711 c-5.525,0-10.005,4.479-10.005,10.004v246.544c0,5.524,4.479,10.004,10.005,10.004h227.578c5.525,0,10.005-4.479,10.005-10.004 V40.452c0-5.524-4.479-10.004-10.005-10.004h-31.995L216.323,4.945z M213.071,40.658l-29.382,58.766l-21.53-21.531l43.689-50.448 L213.071,40.658z M91.151,27.444l43.689,50.448l-21.529,21.531L83.93,40.658L91.151,27.444z M185.819,20.008L148.5,63.101 l-37.319-43.093H185.819z M44.715,50.457h21.743l35.165,70.329c1.438,2.878,4.172,4.887,7.346,5.401 c0.534,0.088,1.07,0.129,1.602,0.129c2.632,0,5.183-1.039,7.074-2.93l20.851-20.852v174.457H44.715V50.457z M252.285,276.992 h-93.781V102.535l20.852,20.852c1.892,1.891,4.442,2.93,7.074,2.93c0.532,0,1.068-0.041,1.602-0.129 c3.174-0.515,5.907-2.523,7.346-5.401l35.165-70.329h21.742V276.992z'/%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A");
}

.icon.electronics:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='7' width='20' height='15' rx='2' ry='2'%3E%3C/rect%3E%3Cpolyline points='17 2 12 7 7 2'%3E%3C/polyline%3E%3C/svg%3E");
    transform: translateY(-15%);
}

.icon.home:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9'/%3E%3Cpath d='M9 22V12h6v10M2 10.6L12 2l10 8.6'/%3E%3C/svg%3E");    
}

@media screen and (max-width: 700px) {
    .icon {
        display: block;
    }  

    .icon:before {
        margin-right: unset;
    }

    .category {
        text-align: center;
    }  
}

.header-text.navigation {
    font-size: 18px;
} 
</style>