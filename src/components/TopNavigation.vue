<template>
    <nav id="nav">
        <router-link to="/" exact>
            <div class="logo">
                Vue Store ||
            </div>        
        </router-link>
        <ul class="nav-links">
            <li class="links">
                <router-link to="/" exact>
                    Home
                </router-link>
            </li>
            <!-- <li v-for="destination in destinations"
                :key="destination.name"
                class="links"
            >
            <router-link :to="getNavigationPath(destination)">
                {{destination.name}}
            </router-link>
            </li>

            <li class="links">
                <router-link to="/user">Dashboard</router-link>
            </li> -->
        </ul>
        <div class="nav-right">      
            <ul class="nav-links">
                <li v-if="getLoggedInUser() != null">
                    <div class="logout" @click="logOutUser">
                        Logout {{getLoggedInUser().email}}
                    </div>                    
                </li>
                <li v-else class="links" >
                    <router-link :to="{name: 'Login', 
                        query: redirectQuery,                    
                    }">
                        Log in
                    </router-link>
                </li>    
                <!-- <li class="links">
                    <router-link :to="{name: 'Register', 
                        query: redirectQuery}"
                    >
                        Create Account
                    </router-link>
                </li>    -->
                <li>
                    <router-link :to="{name: 'Checkout'}">
                        <el-button type="warning" 
                            icon="el-icon-shopping-cart-full"
                        >
                            Checkout
                        </el-button>
                    </router-link>
                </li>
            </ul> 
        </div>        
    </nav>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
    data() {
        return {
            // destinationId: this.$route.params.id,
            // destinations: store.destinations,     
        }
    },

    computed: {
        ...mapGetters({
            getLoggedInUser: 'users/getLoggedInUser',
        }),

        isOnLoginPage() {
            return this.$route.path.toLowerCase().indexOf('/login') > -1;
        },

        redirectQuery() {
            return Object.assign({}, this.$route.query, {redirect: this.$route.query.redirect || this.$route.path})
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
    height: 67px;
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
    font-size: 30px;
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
</style>