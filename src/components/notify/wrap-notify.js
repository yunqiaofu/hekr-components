import Notify from './notify.vue'

export default Vue => {
  const NotifyConstructor = Vue.extend(Notify)

  // 存储vue实例对象
  let $ = null
  return options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    if (typeof options !== 'object') {
      throw TypeError('[options] is not object')
    }
    let vm = $
    options.value = true
    options.only = options.only === undefined ? true : options.only
    if (vm) {
      vm.autoClose()
    } else {
      vm = new NotifyConstructor().$mount()
      vm.$once('input', () => {
        vm.$destroy()
        $ = null
        document.body.removeChild(vm.$el)
      })
      document.body.appendChild(vm.$el)
    }

    vm.value = options.value
    vm.message = options.message
    vm.delay = options.delay === undefined ? 3000 : options.delay
    vm.closeabled = options.closeabled === undefined ? true : options.closeabled
    vm.align = options.align === undefined ? 'left' : options.align

    // 保证当前只会出现一条提示
    if (options.only) {
      $ = vm
    }
    // 关闭方法
    return () => vm.$emit('input')
  }
}
