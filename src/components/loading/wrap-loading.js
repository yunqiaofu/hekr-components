import Loading from './loading.vue'

export default Vue => {
  const LoadingConstructor = Vue.extend(Loading)

  // 存储vue实例对象
  let $ = null
  return options => {
    if (typeof options === 'boolean') {
      options = {
        show: options
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
    vm.value = options.show
    if (options.icon) {
      vm.icon = options.icon
    }
    // 保证当前只会出现一条提示
    $ = vm
  }
}
