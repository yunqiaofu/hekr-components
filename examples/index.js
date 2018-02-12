// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import hekrComponents, { i18n } from '../src'

Vue.config.productionTip = false

i18n.extend({
  'zh-CN': {
    i18n: {
      test: '测试文本，中文'
    }
  },
  'en_US': {
    i18n: {
      test: 'test text, English'
    }
  },
  fr: {
    confirm: {
      title: 'pointe'
    },
    dialog: {
      cancelText: 'annulé',
      confirmText: 'déterminer'
    }
  }
})

Vue.use(hekrComponents, {
  lang: 'en-US'
})

console.log(hekrComponents, i18n)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
