<template>
    <div class="menubar" id="menubar">
        <div class="fixedContainer">
            <div class="closeMenu">
                <button @click="closeMenubar"><p>CLOSE&nbsp;</p><img src="../assets/images/cancel.svg"/></button>
            </div>
             <div class="nav-menu">
                <button @click="redirectTo('/')">
                    <h5>HOME</h5>
                </button>
            </div>
            <div class="nav-menu login">
                <button @click="redirectTo('/login')" v-if="!this.user">
                    <h5>LOG IN</h5>
                </button>
                <button class="logout" @click="logout" v-else>
                    <h5>LOG OUT</h5>
                </button>
            </div>
            <div class="nav-menu" v-if="this.user">
                <button @click="redirectTo('/create')">
                    <h5>NEW WORKSPACE</h5>
                </button>
            </div>
            <div class="nav-menu signup" v-if="!this.user">
                <button @click="redirectTo('/signup')">
                    <h5>SIGN UP</h5>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'menubar',
        data () {
            return {
            }
        },
        computed: {
        },
        methods: {
            closeMenubar () {
                this.$emit("closeMenubar")
            },
            logout () {
                this.$emit("logout")
            },
            redirectTo(path) {
                this.$emit("closeMenubar")
                this.$router.push(path)
            }
        },
        created() {
        },
        props: [ 'user' ]
    }
</script>
<style scoped>
    button {
        border: none;
        background-color: transparent;
    }
    .menubar {
        min-width: 18em;
        background-color:#F6F6F6;
        box-shadow: 1px 1px 7px gray;
    }
    .nav-menu:last-of-type {
        margin-bottom: 4em;
    }
    .fixedContainer {
        width: 18em;
        height: 100%;
        position: fixed;
        top:0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-image: url('../assets/images/ex4.jpg');
        background-repeat: no-repeat;
        background-position: bottom;
        background-size: cover;
        background-color: #F5F4F9;
        opacity: 0.8;
    }
    .closeMenu {
        margin-bottom: 4em;
    }
    .closeMenu button img {
        width: 1em;
    }
    .closeMenu * {
        display: inline-block;
    }
    .menubar * {
        color: #000;
    }
</style>