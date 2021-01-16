<template>
    <nav class="nav">
        <router-link to="/" exact>
            <div class="logo">
                My Programming Notes - Store
            </div>        
        </router-link>

        <div class="nav-right">                   
            <ul class="nav-links">
                <li class="nav-account">
                    <span v-if="getLoggedInUser() != null">
                        <div class="logout" @click="logOutUser">
                            Logout {{getLoggedInUser().email}}
                        </div>                          
                    </span>
                    <span v-else-if="!isOnLoginPage" class="links" >
                        <router-link :to="{name: 'Login', query: redirectQuery}"
                            class="header-url">
                            Log in
                        </router-link>                        
                    </span>
                </li>  
                <li>                  
                    <router-link :to="{name: 'Checkout'}">
                        <el-button type="warning" icon="el-icon-shopping-cart-full">
                            <span class="checkout-text"> Checkout </span> 
                            <span v-if="cartQuantity > 0">
                                ({{cartQuantity}})
                            </span>
                        </el-button>
                    </router-link>
                </li>                   
            </ul> 
        </div>

        <button class="slide-panel-button open right" data-for="nav-menu"></button>   

        <section class="slide-panel right" id="nav-menu">
            <header class="slide-panel-header" >
                <!-- Close button -->
                <button class="slide-panel-button close"></button>

                <div class="text">
                    <div v-if="getLoggedInUser() != null">
                        <span>
                            Hi, {{getLoggedInUser().email}}!
                        </span>
                    </div>  

                    <div v-else>
                        <router-link :to="{name: 'Login', query: redirectQuery}">
                            Welcome! Log in
                        </router-link>                 
                    </div>
                </div>
            </header>
            
            <article class="content">  
                <!-- Trending -->      
                <div class="menu-title">
                    Trending
                </div>
                <router-link :to="{name: 'Home'}">
                    <div class="item" >
                        Best Sellers
                    </div>
                </router-link> 
                <router-link :to="{name: 'Home'}">
                    <div class="item" >
                        New Releases
                    </div>
                </router-link>                

                <!-- Shopping -->
                <div class="menu-title">
                    Shopping
                </div>
                <router-link :to="{name: 'Checkout'}">
                    <div class="item" >
                        Checkout 
                        <span v-if="cartQuantity > 0">
                            ({{cartQuantity}})
                        </span>
                    </div>
                </router-link>
                <router-link :to="{name: 'Home'}">
                    <div class="item" >
                        Wish List
                    </div>
                </router-link>                

                <!-- Account -->
                <div class="menu-title">
                    Account
                </div>
                <div class="item" @click="logOutUser" v-if="getLoggedInUser() != null">
                    Logout                    
                </div>  
                <span v-else>
                    <router-link :to="{name: 'Register', query: redirectQuery}">
                        <div class="item" >
                            Create Account
                        </div>
                    </router-link>                     
                    <router-link :to="{name: 'Login', query: redirectQuery}">
                        <div class="item" >
                            Login
                        </div>
                    </router-link>                                         
                </span>                                                  
            </article>
        </section>            
    </nav>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import SlidePanel from "@/js/SlidePanel"

export default {
    data() {
        return {  
        }
    },

    mounted() {
        SlidePanel.init();

        let panel = document.querySelector('#nav-menu');
        if (panel) {
            panel.addEventListener('click', (e) => {
                if (isUrl(e.target, panel)) {
                    SlidePanel.close(panel);
                }
            });
        }

        let isUrl = (source, stop) => {
            let elem = source;
            while (elem && elem != stop) {
                if ('href' in elem) {
                    return true;
                }
                elem = elem.parentNode;
            }
            return false;
        }
    },

    computed: {
        ...mapGetters({
            getLoggedInUser: 'users/getLoggedInUser',
        }),

        ...mapGetters('cart', {
            cartQuantity: 'cartQuantity',
        }),         

        isOnLoginPage() {
            return this.$route.path.toLowerCase().indexOf('/login') > -1;
        },

        redirectQuery() {
            return Object.assign({}, this.$route.query, {redirect: this.$route.query.redirect || this.$route.path});
        }, 
    },

    methods: {
        getNavigationPath(destination) {
            return {
                name: 'DestinationDetails',
                params: {
                    id: destination.id, 
                    slug: destination.slug
                }
            };
        },
        
        ...mapActions({
            logOut: 'users/logOut',
        }), 

        async logOutUser() {
            let shouldLogOut = await this.verifyLogOut();
            if (!shouldLogOut) {
                return;
            }
            let user = await this.logOut();

            this.$message({
                type: 'success',
                message: `You have logged out ${user.email}!`
            });              
        },

        async verifyLogOut() {
            let user = this.getLoggedInUser()
            let cancelLogout = true;
            try {
                await this.$confirm(`Are you sure you want to log out ${user.email}?`, 'Log Out?', {
                    confirmButtonText: 'Cancel',
                    cancelButtonText: `Yes, I want to log out`, 
                    type: 'warning',
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    confirmButtonClass: 'el-button',
                    cancelButtonClass: 'el-button--danger',
                    showClose: false,
                });
            } catch (e) {
                cancelLogout = false;
            }
            return !cancelLogout;
        },      
    },
}
</script>

<style scoped>
.inline {
    display: inline-block;
}

.nav {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: #4c4c4c;
    border-bottom: 1px solid grey;
    z-index: 1;
    padding: 8px 0;
    /* margin-bottom: 15px; */
    height: 60px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.10),0 1px 4px rgba(0,0,0,0.10),0 2px 8px rgba(0,0,0,0.10);
    z-index: 2;
}

.nav a {
    text-decoration: none;    
}

.nav .header-url {
    color: #42b983;
    color: #4CAF50;
    font-weight: bold;
}

.nav .nav-right a.router-link-exact-active,
.nav .nav-right a.router-link-active,
.nav .nav-right a.vue-school-active-class {
    color: #ea7201;
    /* color: white; */
    /* font-style: italic; */
    font-size: 20px;
}

.nav-links {
    display: flex;
    align-items: center;
    list-style-type: none;
}

.links {
    padding-right: 20px;
    list-style: none;
}

.links:hover {
    text-decoration: underline;
}

.logo {
    font-size: 20px;
    color: #e5e5e5;
    font-weight: bold;
    margin-left: 15px;
}

.nav-right {
    position: absolute;
    right: 0;   
    margin-right: 60px;
}

.el-button--warning {
    background-color: #ffc107;
    font-weight: bold;
    color: whitesomke;
}

.logout {
    color: hsla(0,0%,100%,.5);
    margin-right: 20px;
    cursor: pointer;
}

.logout:hover {
    color: white;
}

@media screen and (max-width: 800px) {
    .nav-right .nav-account {
        display: none;
    }     
}

@media screen and (max-width: 500px) {
    .checkout-text {
        display: none;
    }
    .logo {
        font-size: 16px;
    }          
}

@media screen and (max-width: 400px) {
    .logo {
        font-size: 12.5px;
    }          
}
</style>

<style src="../css/SlidePanel.css"></style>

<style scoped>
.slide-panel-button.open:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='35' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='3' y1='12' x2='21' y2='12'%3E%3C/line%3E%3Cline x1='3' y1='6' x2='21' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='18' x2='21' y2='18'%3E%3C/line%3E%3C/svg%3E");
}

.slide-panel-button.close:before {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='35' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E");
}

.slide-panel-button:hover {
    background-color: #818181;
}

.slide-panel-button.open:hover {
    border-radius: 8px;
}

.slide-panel .links a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181!important;
    display: block;
}

.slide-panel .links a:hover {
    color: orangered;
}

.slide-panel .links {
    margin: auto;
}

.menu-header {
    margin-top: 50px; 
    text-align: center;
}

.slide-panel .content {
    text-align: left;
}

.slide-panel-button .logout {
    color: hsla(0,0%,100%,.5);
    cursor: pointer;
}

.slide-panel-button .logout:hover {
    color: black;
}

.slide-panel-header {
    padding: 13px; 
    background-color: #f4f4f4;
    background-color: #55616f;
    color: white;
    border-bottom: 1px solid #dadada;
    text-align: center;
}

.slide-panel-header, .slide-panel-header a {
    color: white;
}

.slide-panel .item {
    padding: 12px;
    padding-left: 28px;
    border-bottom: 1px solid lightgray;
    cursor: pointer;
}

.slide-panel .item, .slide-panel .item a {
    color: #2c3e50;
}

.slide-panel .item:hover {
    background-color: #eaeded;
    background-color: #f4f4f4;
    background-color: #eee;
    /* cursor: pointer; */
}

.slide-panel .menu-title {
    padding: 23px 8px 4px 15px;
    font-size: 21px;
    font-weight: 700;
    line-height: 24px;
    color: #111;
    text-transform: capitalize;    
}

.slide-panel-header .text {
    height:20px;
}

.slide-panel-button.right {
    margin-right: 6px;
}
</style>