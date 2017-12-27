import Confirm from './confirm'

export default (Vue, lang) => {
  Vue.prototype.$confirm = Confirm(Vue, lang)
}
