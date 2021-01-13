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
    </nav>

    <!-- <nav class="topnav" id="myTopnav">
        <router-link to="/" exact>
            <div class="logo">
                My Programming Notes - Store
            </div>        
        </router-link>        
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
        <a href="javascript:void(0);" class="menu-icon navbar-toggler" @click="myFunction()">
            <span class="navbar-toggler-icon"></span>
        </a>        
    </nav> -->
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
    data() {
        return {  
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

        myFunction() {
            var x = document.getElementById("myTopnav");
            if (x.className === "topnav") {
                x.className += " responsive";
            } else {
                x.className = "topnav";
            }            
        }        
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
}

#nav a {
    color: #42b983;
    color: #4CAF50;
    text-decoration: none;
    font-weight: bold;
}

#nav a.router-link-exact-active,
#nav a.router-link-active,
#nav a.vue-school-active-class {
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

/* ----------------- */

.topnav {
    overflow: hidden;
    background-color: #333;
}

.topnav a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}

.topnav a:hover {
    background-color: #ddd;
    color: black;
}

.topnav a.active {
    background-color: #4CAF50;
    color: white;
}

.topnav .menu-icon {
    display: none;
    height: 50px;
    width: 50px;
}

@media screen and (max-width: 600px) {
    .topnav a:not(:first-child) {display: none;}
    .topnav a.menu-icon {
        float: right;
        display: block;
    }
}

@media screen and (max-width: 600px) {
    .topnav.responsive {position: relative;}
    .topnav.responsive .menu-icon {
        position: absolute;
        right: 0;
        top: 0;
    }
    .topnav.responsive a {
        float: none;
        display: block;
        text-align: left;
    }
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.navbar-toggler {
    color: hsla(0,0%,100%,.5);
    border-color: hsla(0,0%,100%,.1);
}
</style>