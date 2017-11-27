import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'sidebar-nav-item-active',
  routes: [
    {
      path: '/header',
      name: 'header',
      component: () => import('../views/header')
    },
    {
      path: '/button',
      name: 'button',
      component: () => import('../views/button')
    },
    {
      path: '/week',
      name: 'week',
      component: () => import('../views/week')
    }
  ]
})
