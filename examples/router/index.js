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
      path: '/switch',
      name: 'switch',
      component: () => import('../views/switch')
    },
    {
      path: '/check',
      name: 'check',
      component: () => import('../views/check')
    {
      path: '/confirm',
      name: 'confirm',
      component: () => import('../views/confirm')
    }
  ]
})
