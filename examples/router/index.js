import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hellword',
      name: 'hellword',
      component: () => import('../views/HelloWorld')
    },
    {
      path: '/hell',
      name: 'hell',
      component: () => import('../views/Hello')
    }
  ]
})
