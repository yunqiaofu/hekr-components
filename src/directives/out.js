// 定义一个listener存储回调
const listener = {}
// 下标计数
let i = 0
const handler = e => {
  Object.keys(listener).forEach(key => {
    if (typeof listener[key] === 'function') {
      listener[key](e)
    }
  })
}

const directive = {
  // 指令绑定时调用
  bind ($el, binding, vnode, oldVnode) {
    if (typeof binding.value === 'function') {
      $el.__OUTKEY__ = i++
      listener[$el.__OUTKEY__] = e => {
        if (!$el.contains(e.target)) {
          binding.value($el)
        }
      }
    }
  },
  // 绑定指令的元素插入DOM时调用
  inserted ($el, binding, vnode, oldVnode) {
    if (typeof binding.value === 'function') {
      binding.value($el)
    }
  },
  unbind ($el, binding, vnode, oldVnode) {
    delete listener[$el.__OUTKEY__]
  }
}
/**
 * 点击对象外部时触发事件
 * 只绑定一个事件监听
 * 从而达到优化事件的目的
 */
document.addEventListener('click', handler)
document.addEventListener('touchend', handler)

export default Vue => {
  Vue.directive('click-out', directive)
  Vue.directive('touch-out', directive)
}
