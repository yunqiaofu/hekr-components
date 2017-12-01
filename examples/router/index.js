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
      path: '/slider',
      name: 'slider',
      component: () => import('../views/slider')
    },
    {
      path: '/icon',
      name: 'icon',
      component: () => import('../views/icon')
    },
    {
      path: '/modal',
      name: 'modal',
      component: () => import('../views/modal')
    },
    {
      path: '/dialog',
      name: 'dialog',
      component: () => import('../views/dialog')
    }
  ]
})
