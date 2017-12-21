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
      path: '/timepicker',
      name: 'timepicker',
      component: () => import('../views/timepicker')
    },
    {
      path: '/pop',
      name: 'pop',
      component: () => import('../views/pop')
    },
    {
      path: '/icon',
      name: 'icon',
      component: () => import('../views/icon')
    },
    {
      path: '/bar',
      name: 'bar',
      component: () => import('../views/bar')
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
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: () => import('../views/confirm')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard')
    },
    {
      path: '/notify',
      name: 'notify',
      component: () => import('../views/notify')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/order')
    },
    {
      path: '/swipe',
      name: 'swipe',
      component: () => import('../views/swipe')
    },
    {
      path: '/v-back',
      name: 'v-back',
      component: () => import('../views/v-back')
    },
    {
      path: '/select',
      name: 'select',
      component: () => import('../views/select')
    }
  ]
})
