<template>
    <div class="login">
        <div class="container">
            <div class="form-container">
                <h1>Log In</h1>
                <form class="login-form" v-on:submit.prevent="login">
                    <input v-model="user.email" type="email" class="form-control" placeholder="Email"/>
                    <input v-model="user.password" type="password" class="form-control" placeholder="Password"/>
                    <div class="buttons">
                        <button type="submit" class="btn btn-primary">Log In</button>
                        <p>If you don't have an account, <router-link to="/signup">click here</router-link> to create a new one.</p>
                    </div>
                </form>
                <div class="errors" v-if="validationErrors.length >= 1">
                    <small v-for="(msg, index) in validationErrors" :key="index">{{msg}}</small>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {api} from '../api.js'
    export default {
        name: "login",
        components: { },
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                },
                validationErrors: []
            }
        },
        computed: {
        },
        methods: {
            login () {
                api.User.authenticate(this.user).then(res => {
                    if (res.result.user) {
                        this.$emit('login', res.result.user)
                    }else {
                        if (!this.validationErrors.includes(res.result.msg)) this.validationErrors.push(res.result.msg);
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
    .login {
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
        max-width: 28em;
    }
    .btn-primary {
        align-self: end;
        width: 100%;
    }
    .errors > small {
        color: red;
    }
</style>