<template>
  <div id="app">
      <Menubar :user="user" v-if="menubar" v-on:closeMenubar="closeMenubar" v-on:logout="logout"></Menubar>
      <div class="view-container">
        <div class="shadow" v-if="menubar" @click="toggleMenubar"></div>
        <Navbar :user="user" v-on:toggleMenubar="toggleMenubar" v-on:logout="logout"></Navbar>
        <router-view :user="user" v-on:login="login">
        </router-view>
      </div>
  </div>
</template>
<script>
  import Navbar from './components/Navbar.vue'
  import Menubar from './components/Menubar.vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  export default {
    name: "App",
    components: {Menubar, Navbar},
    data () {
      return {
        menubar: false,
        user: null
      }
    },
    methods: {
      toggleMenubar () {
        if (!this.menubar) this.menubar = true;
        else this.menubar = false;
      },
      closeMenubar () {
        this.menubar = false;
      },
      logout () {
        localStorage.removeItem('user')
        this.user = null
        this.closeMenubar();
        this.$router.push('/login')
      },
      login (user) {
        localStorage.setItem('user',JSON.stringify(user))
        this.user = user
        this.$router.push("/")
      }
    },
    created () {
      if (localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user'));
      }else {
        this.$router.push('login')
      }
    }
  }
</script>

<style>
  a {
    color: white;
  }
  a:hover {
    text-decoration-line: none;
    color: white;
  }
  #app {
    display: flex;
    overflow-x: hidden;
    min-height: 100vh;
  }
  .view-container {
    width: 100vw;
    position: relative;
  }
  .shadow {
    position: absolute;
    width: 100vw;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    z-index: 1;
  }
</style>
