// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import hekrComponents from '../src'

Vue.config.productionTip = false

hekrComponents.locale.extend({
  fr: {
    dialog: {
      confirmText: 'Déterminer'
    }
  }
})
Vue.use(hekrComponents, {
  lang: 'fr'
})
console.log(hekrComponents)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
