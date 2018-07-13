import Dialog from './confirm.vue'

export default Vue => {
  const ConfirmConstructor = Vue.extend(Dialog)
  return options => {
    if (typeof options === 'string') {
      options = {
        text: options
      }
    }
    if (typeof options !== 'object') {
      throw TypeError('[options] is not object')
    }
    options.value = true

    let vm = new ConfirmConstructor({
      propsData: options
    }).$mount()
    vm.$once('confirm', () => vm.resolve())
    vm.$once('cancel', () => vm.reject())
    document.body.appendChild(vm.$el)
    const $ = new Promise((resolve, reject) => {
      vm.resolve = resolve
      vm.reject = reject
    })
    // 关闭方法
    $.close = () => vm.$emit('cancel')

    // 回退支持
    let key = vm.$back.push(() => {
      key = undefined
      $.close()
    })
    const destroy = () => {
      vm.value = false
      vm.$back.delete(key)
      setTimeout(() => {
        vm.$destroy()
        document.body.removeChild(vm.$el)
      }, 230)
    }
    /**
     * Promise结束之后执行
     */
    $
      .then(() => destroy())
      .catch(() => destroy())
    return $
  }
}
