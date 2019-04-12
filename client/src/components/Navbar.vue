<template>
    <div class="navbar">
        <div class="nav-menu menu">
            <button @click="openMenubar"><img class="menu-icon" src="../assets/images/menu.svg"/></button>
        </div>
        <div class="nav-menu navAction">
            <router-link to="/"><img src="../assets/images/logo.png"/></router-link>
        </div>
        <div class="nav-menu login">
            <router-link to="/login" v-if="!this.user">
                <p>Log In</p>
            </router-link>
            <button class="logout" @click="logout" v-else>
                    <p>Log Out</p>
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'navbar',
        data () {
            return {
            }
        },
        computed: {
        },
        methods: {
            openMenubar () {
                this.$emit("toggleMenubar");
            },
            logout () {
                this.$emit("logout")
            }
        },
        created() {
        },
        props: [ 'navAction', 'isBack', 'user' ]
    }
</script>
<style scoped>
    .navbar {
        width: 100vw;
        height: 3em;
        background-color: brown;
        display: flex;
        justify-content: space-between;
        color: white;
        position:fixed;
        top:0;
        z-index:1;
    }
    .menu {
        padding: 3px;
    }
    .nav-menu button {
        background-color: transparent;
        border: none;
    }
    .login {
        text-align: end;
    }
    .login p {
        color: white;
        margin: 0;
    }
    .menu-icon {
        width: 1.5em;
    }
    .navAction img {
        filter: invert(100%);
        width: 10em;
    }
</style>