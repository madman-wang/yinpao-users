import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Index from '@/views/index'
import Rank from '@/views/rank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    }
  ]
})
