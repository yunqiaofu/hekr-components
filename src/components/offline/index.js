import Offline from './offline.vue'
import WrapOffline from './wrap-offline'
export default Vue => {
  Vue.component(Offline.name, Offline)
  Vue.prototype.$offline = WrapOffline(Vue)
}
