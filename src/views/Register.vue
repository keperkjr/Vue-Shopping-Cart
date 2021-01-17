<!-- 
// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Oct 21, 2020
//    Taken From: http://programmingnotes.org/
//    File:  Register.vue
//    Description: The create account page of the site
// ============================================================================ 
-->
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
                >
            </el-input> 
        </article>

        <article class="row">
            <label for="password">Password</label>
            <el-input
                name="password"
                autocomplete="off"
                placeholder="Password"
                show-password
                v-model="password"
                >
            </el-input>  
        </article>  

        <article class="row">
            <label for="confirm-password">Confirm Password</label>
            <el-input
                name="confirm-password"
                autocomplete="off"
                placeholder="Confirm Password"
                show-password
                v-model="passwordConfirm"
                >
            </el-input>  
        </article>                 

        <article class="row">
            <el-button @click="register" type="primary"
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
                Already have an account?
            </div>              
            <router-link :to="{name: 'Login',
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
            passwordConfirm: null,
            error: null,
            action: 'Create Account',
            alternativeAction: 'Log In',
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
            createUser: 'users/createUser',
            logIn: 'users/logIn',
        }),

        async register() {
            try {
                this.isLoading = true;
                this.validate();

                // Add the user to the store
                await this.createUser({
                    email: this.email,
                    password: this.password,
                });

                await this.logIn(this.email);

                this.$message({
                    type: 'success',
                    message: `Account successfully created!`
                });                 

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
                problems.push('Email address is required');
            } else if (!Utils.isValidEmail(this.email)) {
                problems.push(`'${this.email}' is not a valid email address`);
            }            
            if (Utils.isEmpty(this.password)) {
                problems.push('Password is required');
            }
            if (Utils.isEmpty(this.passwordConfirm)) {
                problems.push('Password confirmation is required');
            }
            if (!Utils.isEmpty(this.password) 
                && !Utils.isEmpty(this.passwordConfirm) 
                && this.password !== this.passwordConfirm) {
                problems.push('The two passwords entered do not match');
            }

            if (problems.length < 1) {
                let existing = this.getUser({
                    email: this.email,
                });
                
                if (existing) {
                    problems.push(`A user with the email '${this.email}' already exists!`);
                }
            }

            if (problems.length > 0) {
                let message = `
                    Please correct the following:
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
    /* margin-top: 15px; */
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
    /* padding-bottom: 5px; */
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
        width: 85%;
        margin-left: 2px;
    }       
}
</style>