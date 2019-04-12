<template>
    <div class="signup">
        <div class="container">
            <div class="form-container">
                <h1>Sign Up</h1>
                <form v-if="emailVerified" class="login-form" v-on:submit.prevent="createUserName">
                    <input v-model="user.userName" type="text" class="form-control" placeholder="My nickname will be.."/>
                    <button type="submit" class="btn btn-primary">OK</button>
                </form>
                <form v-else class="login-form" v-on:submit.prevent="signup">
                    <input v-model="user.email" type="email" class="form-control" placeholder="Email"/>
                    <input v-model="user.password" type="password" class="form-control" placeholder="Password"/>
                    <input v-model="passwordConfirmation" type="password" class="form-control" placeholder="Password Confirm"/>
                    <div class="buttons">
                        <button type="submit" class="btn btn-primary">OK</button>
                        <p>I want to <router-link to="/login">log in</router-link> with my existing account.</p>
                    </div>
                </form>
                <div class="errors" v-if="validationErrors.length >= 1">
                    <small v-for="(msg, index) in validationErrors" :key="index">{{displayErrors(msg)}}</small>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {api} from '../api.js'
    export default {
        name: "signup",
        components: { },
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                    userName: ''
                },
                passwordConfirmation: '',
                emailVerified: false,
                validationErrors: []
            }
        },
        computed: {
        },
        methods: {
            displayErrors (err) {
                if (err.includes("duplicate")) return "email already in use"
                else return err;
            },
            createUserName () {
                if (this.user.userName) {
                    api.User.verifyUserName(this.user.userName).then(res => {
                        if (res.status === "OK") {
                            api.User.update(this.user).then(res => {
                                if(res.status === "OK") {
                                    this.$emit('login', res.user)
                                }else {
                                    if (!this.validationErrors.includes(res.msg)) this.validationErrors.push(res.msg);
                                }
                            })
                        }else {
                            if (!this.validationErrors.includes(res.msg)) this.validationErrors.push(res.msg);
                        }
                    })
                }
            },
            signup () {
                this.validationErrors = []
                api.User.create({user: this.user, passwordConfirmation: this.passwordConfirmation}).then(res => {
                    if (res.user) {
                        this.emailVerified = true
                    }else {
                        const errorType = res.msg.split(" ")[0]
                        if (this.validationErrors[0]){
                            for (let err of this.validationErrors) {
                                if (!err.includes(errorType)) this.validationErrors.push(res.msg);
                            }
                        }else {
                            this.validationErrors.push(res.msg);
                        }
                    }
                })
            }
        },
        created () {
        }
    }
</script>
<style scoped>
    a {
        color: #007BFF;
    }
    a:hover {
        color: #007BFF;
        font-weight: bold;
    }
    .signup {
        margin-top: 4em;
    }
    .form-control {
        text-align: end;
        margin: .5em 0;
    }
    .form-control::placeholder {
        color: lightgray;
    }
    .container {
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .login-form {
        width: 100%;
    }
    .container > div {
        width: 70%;
    }
    .btn-primary {
        position: relative;
        width: 100%;
    }
    .errors > small {
        color: red;
    }
</style>