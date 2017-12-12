import Confirm from './confirm'

export default Vue => {
  Vue.prototype.$confirm = Confirm(Vue)
}
