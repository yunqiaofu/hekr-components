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
    },
    {
      path: '/slider',
      name: 'slider',
      component: () => import('../views/slider')
    },
    {
      path: '/select',
      name: 'select',
      component: () => import('../views/select')
    },
    {
      path: '/timePicker',
      name: 'timePicker',
      component: () => import('../views/timePicker')
    },
    {
      path: '/icon',
      name: 'icon',
      component: () => import('../views/icon')
    },
    {
      path: '/modal-bar',
      name: 'modal-bar',
      component: () => import('../views/modal-bar')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/list')
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import('../views/chart')
    },
    {
      path: '/dialog',
      name: 'dialog',
      component: () => import('../views/dialog')
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: () => import('../views/confirm')
    }
  ]
})
