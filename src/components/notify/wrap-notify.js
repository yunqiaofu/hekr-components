import Notify from './notify.vue'

export default Vue => {
  const NotifyConstructor = Vue.extend(Notify)
  const $notify = options => {
    if (typeof options === 'string') {
      options = {
        notify: options
      }
    }
    if (typeof options !== 'object') {
      throw TypeError('[options] is not object')
    }
    while ($notify._.length) {
      $notify._.shift()()
    }
    options.value = true

    const vm = new NotifyConstructor({
      propsData: options
    }).$mount()
    vm.$once('input', () => {
      vm.$destroy()
      document.body.removeChild(vm.$el)
    })
    document.body.appendChild(vm.$el)

    // 保证当前只会出现一条提示
    const colse = () => vm.$emit('input')
    if (!options.only) {
      $notify._.push(colse)
    }
    console.dir($notify._)
    // 关闭方法
    return colse
  }
  $notify._ = []
  return $notify
}
