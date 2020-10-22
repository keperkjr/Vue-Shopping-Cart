<template>
    <section class="form">   
        <div class="headerText">
                Login 
        </div>

        <div class="row">
            <label for="username">Username</label>
            <el-input
                name="username"
                autocomplete="off"
                placeholder="Username"
                v-model="username"
                clearable>
            </el-input> 
        </div>

        <div class="row">
            <label for="password">Password</label>
            <el-input
                name="password"
                autocomplete="off"
                placeholder="Password"
                v-model="password"
                clearable>
            </el-input>  
        </div>           

        <div class="row">
            <el-button @click="login" type="primary">
                <span class="bold"> Login </span>
            </el-button>
        </div> 

        <div class="row" v-if="error">
            <div class="error" v-html="error"></div>
        </div>         
    </section>
</template>

<script>
import store from "@/store"
import * as Utils from "@/js/utils"

export default {
    data() {
        return {
            username: null,
            password: null,
            error: null,
        }
    }, 
    methods: {
        login() {
            try {
                this.validate();

                // Authenticate user against API
                store.user = this.username;
                const redirectPath = this.$route.query.redirect || '/';
                this.$router.push(redirectPath);
            } catch (e) {
                this.error = e.message;
            }
        },
        validate() {
            this.error = null;

            let problems = [];
            if (Utils.isEmpty(this.username)) {
                problems.push('Username is required');
            }
            if (Utils.isEmpty(this.password)) {
                problems.push('Password is required');
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
    min-width: 400px;
    margin: 0 auto;
    border: 1px solid lightgrey;
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    margin-top: 15px;
}

.headerText {
    vertical-align: top;
    display: inline;
}

.row {
    margin: 20px 0;
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
    padding: 15px;
    padding-left: 25px;
    border-radius: 5px;
    border: 1px solid pink;
    text-align: left;
}
</style>