import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [
  {
    path: '/alert',
    name: 'alert',
    component: () => import('../views/alert')
  },
  {
    path: '/bar',
    name: 'bar',
    component: () => import('../views/bar')
  },
  {
    path: '/button',
    name: 'button',
    component: () => import('../views/button')
  },
  {
    path: '/header',
    name: 'header',
    component: () => import('../views/header')
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
  },
  {
    path: '/loading',
    name: 'loading',
    component: () => import('../views/loading')
  }
]

export default new Router({
  linkActiveClass: 'sidebar-nav-item-active',
  routes
})
