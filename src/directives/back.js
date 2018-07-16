// 存储back操作
const stack = []

class Back {
  get length () {
    return stack.length
  }

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
    if (!key) return
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

  directive ($el, { action, callback } = {}) {
    if (typeof callback !== 'function') {
      throw new TypeError('[v-back]: The callback must be a function')
    }
    switch (action) {
      case true:
      case 'PUSH':
        if ($el.__BACK__ACTION__ !== true && $el.__BACK__ACTION__ !== 'PUSH') {
          $el.__BACK__ = back.push(() => {
            $el.__BACK__CALLBACK__()
            delete $el.__BACK__
            delete $el.__BACK__ACTION__
            delete $el.__BACK__CALLBACK__
          })
        }
        $el.__BACK__ACTION__ = action
        $el.__BACK__CALLBACK__ = callback
        break
      case false:
      case 'DELETE':
        back.delete($el.__BACK__)
        delete $el.__BACK__
        delete $el.__BACK__ACTION__
        delete $el.__BACK__CALLBACK__
        break
      default:
        break
    }
  }
}

const back = new Back()

const directive = {
  // 指令绑定时调用
  bind ($el, binding, vnode, oldVnode) {
    back.directive($el, binding.value)
  },
  componentUpdated ($el, binding, vnode, oldVnode) {
    back.directive($el, binding.value)
  },
  unbind ($el, binding, vnode, oldVnode) {
    back.delete($el.__BACK__)
    delete $el.__BACK__
    delete $el.__BACK__ACTION__
    delete $el.__BACK__CALLBACK__
  }
}

export default Vue => {
  Vue.prototype.$back = back
  Vue.directive('back', directive)
}
