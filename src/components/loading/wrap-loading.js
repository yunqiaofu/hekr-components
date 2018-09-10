import Loading from './loading.vue'

export default Vue => {
  const LoadingConstructor = Vue.extend(Loading)

  // 存储vue实例对象
  let $ = null
  return options => {
    if (typeof options === 'boolean') {
      options = {
        value: options
      }
    } else if (typeof options === 'string') {
      options = {
        value: true,
        text: options
      }
    }
    if (typeof options !== 'object') {
      throw TypeError('[options] is not object')
    }
    let vm = $
    if (!vm) {
      vm = new LoadingConstructor().$mount()
      document.body.appendChild(vm.$el)
    }
    vm.value = options.value
    if (options.text) {
      vm.text = options.text
    }
    // 保证当前只会出现一条提示
    $ = vm
  }
}
