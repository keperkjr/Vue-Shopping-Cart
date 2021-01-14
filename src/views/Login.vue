<template>
    <section class="form">   
        <article class="header-text">
            {{action}} 
        </article>

        <article class="row">
            <label for="email">Email</label>
            <el-input
                name="email"
                autocomplete="off"
                placeholder="Email"
                v-model="email"
                clearable>
            </el-input> 
        </article>

        <article class="row">
            <label for="password">Password</label>
            <el-input
                name="password"
                autocomplete="off"
                placeholder="Password"
                v-model="password"
                show-password
                >
            </el-input>  
        </article>           

        <article class="row">
            <el-button @click="logInUser" type="primary"
                :loading="isLoading"            
            >
                <span class="bold"> {{action}} </span>
            </el-button>
        </article> 

        <article class="row" v-if="error">
            <div class="error" v-html="error"></div>
        </article>   

        <article class="divider">
            <div class="divider-line"></div>              
            <div class="divider-content">
                or
            </div> 
            <div class="divider-line"></div> 
        </article>
         
        <article class="row">
            <div class="instructions">
                Don't have an account?
            </div>             
            <router-link :to="{name: 'Register', 
                query: redirectQuery
            }">
                <el-button type="primary" plain>
                    <span class="bold"> {{alternativeAction}} </span>
                </el-button>
            </router-link>           
        </article>               
    </section>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import * as Utils from "@/js/utils"

export default {
    data() {
        return {
            email: null,
            password: null,
            error: null,
            action: 'Log In',
            alternativeAction: 'Create Account',
            isLoading: false,
        }
    }, 

    computed: {
        ...mapGetters({
            getUser: 'users/getUser',
        }),     
        redirectQuery() {
            return Object.assign({}, this.$route.query, {redirect: this.$route.query.redirect});
        },            
    },

    methods: {
        ...mapActions({            
            logIn: 'users/logIn',
        }),

        async logInUser() {
            try {
                this.isLoading = true;
                this.validate();

                await this.logIn(this.email);

                this.$message({
                    type: 'success',
                    message: `Welcome back ${this.email}!`
                });                

                // Authenticate user against API
                const redirectPath = this.$route.query.redirect || '/';
                this.$router.push(redirectPath);
            } catch (e) {
                this.error = e.message;
            } finally {
                this.isLoading = false;
            }
        },
        validate() {
            this.error = null;

            let problems = [];
            if (Utils.isEmpty(this.email)) {
                problems.push('Username is required');
            } else if (!Utils.isValidEmail(this.email)) {
                problems.push(`'${this.email}' is not a valid email address`);
            } 
            if (Utils.isEmpty(this.password)) {
                problems.push('Password is required');
            }

            if (problems.length < 1) {
                let existing = this.getUser({
                    email: this.email,
                });
                
                if (!existing) {
                    problems.push(`A user with the email '${this.email}' does not exist`);
                } else {
                    if (existing.password !== this.password) {
                        problems.push(`Password is invalid`);
                    }
                }
            }            

            if (problems.length > 0) {
                let message = `
                    Unable to log in:
                    <ul>
                        ${problems.map((problem) => `<li>${problem}</li>`).join('\n')}
                    </ul>
                `;
                throw new TypeError(message);
            }
        }
    }
}
</script>

<style scoped>
.form {    
    display: inline-block;
    text-align: center;
    width: 400px;
    margin: 0 auto;
    border: 1px solid lightgrey;
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    margin-top: 15px;
}

.header-text {
    vertical-align: top;
    display: inline;    
}

.row {
    margin: 18px 0;
}

.bold {
    font-weight: bold;
    font-size: 16px;
}

.el-button {
    width: 100%;
}

.error {
    background-color: #fa80723d;
    padding: 15px 25px;
    border-radius: 5px;
    border: 1px solid pink;
    text-align: left;
    padding-bottom: 5px;
}

label {
    margin-bottom: 10px;
    display: block;
}

.instructions {
    margin-bottom: 10px;
    font-size: 14px;
    font-style: italic;
}

@media screen and (max-width: 600px) {
    .form {    
        width: 300px;
        margin-left: 20px;
    }       
}
</style>