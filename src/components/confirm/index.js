import Confirm from './confirm.vue'
import WrapConfirm from './wrap-confirm'

export default (Vue) => {
  Vue.component(Confirm.name, Confirm)
  Vue.prototype.$confirm = WrapConfirm(Vue)
}
