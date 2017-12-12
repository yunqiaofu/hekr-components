import Notify from './notify.vue'
import WrapNotify from './wrap-notify'
export default Vue => {
  Vue.component(Notify.name, Notify)
  Vue.prototype.$notify = WrapNotify(Vue)
}
