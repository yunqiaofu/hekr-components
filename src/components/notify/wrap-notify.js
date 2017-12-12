import Notify from './notify.vue'

export default Vue => {
  const NotifyConstructor = Vue.extend(Notify)
  return options => {
    if (typeof options === 'string') {
      options = {
        notify: options
      }
    }
    if (typeof options !== 'object') {
      throw TypeError('[options] is not object')
    }
    options.value = true

    let vm = new NotifyConstructor({
      propsData: options
    }).$mount()
    vm.$once('input', () => {
      vm.$destroy()
      document.body.removeChild(vm.$el)
    })
    document.body.appendChild(vm.$el)

    // 关闭方法
    return () => vm.$emit('input')
  }
}
