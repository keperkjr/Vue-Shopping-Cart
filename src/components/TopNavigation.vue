<template>
    <nav id="nav">
        <router-link to="/" exact>
            <div class="logo">
                My Programming Notes - Store
            </div>        
        </router-link>

        <div class="nav-right">                   
            <ul class="nav-links">
                <li v-if="getLoggedInUser() != null">
                    <div class="logout" @click="logOutUser">
                        Logout {{getLoggedInUser().email}}
                    </div>                    
                </li>
                <li v-else-if="!isOnLoginPage" class="links" >
                    <router-link :to="{name: 'Login', query: redirectQuery}">
                        Log in
                    </router-link>
                </li>    
                <li>                  
                    <router-link :to="{name: 'Checkout'}">
                        <el-button type="warning" icon="el-icon-shopping-cart-full">
                            Checkout 
                            <span v-if="cartQuantity > 0">
                                ({{cartQuantity}})
                            </span>
                        </el-button>
                    </router-link>
                </li>                   
            </ul> 
        </div>

        <button class="slide-panel-button white open right" data-for="nav-menu"></button>   

        <section class="slide-panel right" id="nav-menu">
            <div class="panel-close-section" >
                <!-- Close button -->
                <button class="slide-panel-button close"></button>

                <div style="margin-left: 20px; height:20px; ">
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
            </div>
            
            <div class="menu-header">
                Right SlidePanel Menu
            </div>

            <div class="links">    
                <div v-if="getLoggedInUser() != null">
                    <div @click="logOutUser">
                        Logout {{getLoggedInUser().email}}
                    </div>
                </div>  

                <div v-else>
                    <router-link :to="{name: 'Login', query: redirectQuery}">
                        Log in
                    </router-link>                 
                </div>

                <div>
                    <router-link :to="{name: 'Checkout'}">
                        <el-button type="warning" icon="el-icon-shopping-cart-full">
                            Checkout 
                            <span v-if="cartQuantity > 0">
                                ({{cartQuantity}})
                            </span>
                        </el-button>
                    </router-link>                    
                </div>
            </div>
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

#nav {
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
}

#nav a {
    color: #42b983;
    color: #4CAF50;
    text-decoration: none;
    font-weight: bold;
}

#nav .nav-right a.router-link-exact-active,
#nav .nav-right a.router-link-active,
#nav .nav-right a.vue-school-active-class {
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
    margin-right: 45px;
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
    .nav-right {
        display: none;
    } 
}
</style>

<style src="../css/SlidePanel.css"></style>

<style scoped>
.slide-panel-button.open.white:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='35' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='3' y1='12' x2='21' y2='12'%3E%3C/line%3E%3Cline x1='3' y1='6' x2='21' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='18' x2='21' y2='18'%3E%3C/line%3E%3C/svg%3E");
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
    padding-top: 40px;
    margin: auto;
}

.menu-header {
    margin-top: 50px; 
    text-align: center;
}

.slide-panel-button.open:hover {
    background-color: #818181;
    border-radius: 10px;
}

.slide-panel-button .logout {
    color: hsla(0,0%,100%,.5);
    cursor: pointer;
}

.slide-panel-button .logout:hover {
    color: black;
}

.panel-close-section {
    padding: 13px; 
    background-color: #f4f4f4;
    border-bottom: 1px solid #dadada;
}
</style>