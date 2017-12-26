// 存储back操作
const stack = []

class Back {
  pop () {
    this.log('移除back-->pop')
    if (stack.length) {
      stack.pop().callback()
    }
    this.log()
  }
  push (callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('[push]参数callback必须是Function')
    }
    this.log('添加back-->push')
    const key = `v-back-${Date.now()}-${Math.round(Math.random() * 10000)}-${stack.length}`
    stack.push({
      key,
      callback () {
        callback()
        back.delete(key)
      }
    })
    this.log()
    return key
  }
  delete (key) {
    this.log('移除back-->delete')
    for (let i = 0, length = stack.length; i < length; i++) {
      if (key === stack[i].key) {
        stack.splice(i, 1)
        break
      }
    }
    this.log()
  }
  log (title) {
    // 打印日志
    let style = {
      'color': '#fff',
      'background': '#41b883',
      'padding': '1px 4px',
      'border-radius': '3px',
      'font-weight': 'lighter'
    }
    if (title) {
      style = Object.keys(style).map(key => `${key}:${style[key]}`).join(';')
      console.groupCollapsed(`%c${title}`, style)
      console.log('%cbefore', 'color: gray', stack)
    } else {
      console.log('%cafter', 'color: gray', stack)
      console.groupEnd()
    }
  }
  get length () {
    return stack.length
  }
}

const back = new Back()
const directive = {
  // 指令绑定时调用
  bind ($el, binding, vnode, oldVnode) {
    $el.__BACK__ = back.push(() => {
      if (typeof binding.value === 'boolean') {
        vnode.context[binding.expression] = false
      } else if (typeof binding.value === 'function') {
        binding.value()
      }
    })
  },
  unbind ($el, binding, vnode, oldVnode) {
    back.delete($el.__BACK__)
  }
}

export default Vue => {
  Vue.prototype.$back = back
  Vue.directive('back', directive)
}
