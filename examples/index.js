// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import HekrComponents from '../dist/hekr-components'
// import '../dist/hekr-components.css'

Vue.config.productionTip = false
console.log(window.hekrComponents)
Vue.use(window.hekrComponents)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
