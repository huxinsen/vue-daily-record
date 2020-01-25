import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Manage from '../pages/Manage'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/manage',
      component: Manage,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

export default router
