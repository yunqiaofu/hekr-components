// 存储back操作
const stack = []

if (process.env.NODE_ENV === 'development') {
  const splice = stack.splice
  stack.splice = (...arg) => {
    splice.call(stack, ...arg)
    console.warn(back)
  }
}

const deleteBack = key => {
  for (let i = 0, length = stack.length; i < length; i++) {
    if (key === stack[i].key) {
      stack.splice(i, 1)
      break
    }
  }
}

const directive = {
  // 指令绑定时调用
  bind ($el, binding, vnode, oldVnode) {
    const key = `${binding.expression}-${Date.now()}-${Math.round(Math.random() * 1000)}-${stack.length}`
    $el.__BACK__ = key
    stack.push({
      key: key,
      callback () {
        if (typeof binding.value === 'boolean') {
          vnode.context[binding.expression] = false
        } else if (typeof binding.value === 'function') {
          binding.value()
        }
        deleteBack($el.__BACK__)
      }
    })
  },
  unbind ($el, binding, vnode, oldVnode) {
    deleteBack($el.__BACK__)
  }
}

// 不让外部修改
const back = new Proxy(stack, {
  get (target, key, receiver) {
    if (target.hasOwnProperty(key)) {
      return Reflect.get(target, key, receiver)
    }
    switch (key) {
      case 'pop':
        return () => {
          if (stack.length) {
            stack.pop().callback()
          }
        }
      case 'push':
        return callback => {
          if (typeof callback !== 'function') {
            throw new TypeError('[push]参数callback必须是Function')
          }
          const key = `function-${Date.now()}-${Math.round(Math.random() * 1000)}-${stack.length}`
          stack.push({
            key,
            callback () {
              callback()
              deleteBack(key)
            }
          })
          return key
        }
      case 'delete':
        return deleteBack
      default:
        break
    }
  },
  set (target, key, value, receiver) { }
})

export default Vue => {
  Vue.prototype.$back = back
  Vue.directive('back', directive)
}
