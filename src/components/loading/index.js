import Loading from './loading.vue'
import WrapLoading from './wrap-loading'

export default Vue => {
  Vue.component(Loading.name, Loading)
  Vue.prototype.$loading = WrapLoading(Vue)
}
