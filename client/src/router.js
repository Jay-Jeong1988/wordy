import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Workspace from './views/Workspace.vue'
import Create from './views/Create.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
// import { routerHistory } from 'vue-router-back-button'

Vue.use(Router)
// Vue.use(routerHistory)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/workspaces/:id',
      name: 'workspace',
      component: Workspace
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
