// 存储back操作
const stack = []

if (process.env.NODE_ENV === 'development') {
  let style = {
    'color': '#fff',
    'background-color': '#272822',
    'padding': '4px 7px',
    'border-radius': '3px',
    'font-weight': 'lighter'
  }
  style = Object.keys(style).map(key => `${key}:${style[key]}`).join(';')

  const log = (title, action) => {
    console.groupCollapsed(`%c${title}`, style)
    console.log('%c变化前', 'color: gray', [...stack])
    const val = action()
    console.log('%c变化后', 'color: gray', [...stack])
    console.groupEnd()
    return val
  }
  const splice = stack.splice
  const push = stack.push
  const pop = stack.pop
  stack.pop = (...arg) => log('移除back-->pop', () => pop.call(stack, ...arg))
  stack.push = (...arg) => log('添加back-->push', () => push.call(stack, ...arg))
  stack.splice = (...arg) => log('移除back-->splice', () => splice.call(stack, ...arg))
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
          console.log(key)
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
        if (target.hasOwnProperty(key)) {
          return Reflect.get(target, key, receiver)
        }
        break
    }
  },
  set (target, key, value, receiver) { }
})

export default Vue => {
  Vue.prototype.$back = back
  Vue.directive('back', directive)
}
