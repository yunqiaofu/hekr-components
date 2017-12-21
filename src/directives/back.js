// 存储back操作
const stack = []

// 打印日志
const log = title => {
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
    console.log('%cbefore', 'color: gray', [...back])
  } else {
    console.log('%cafter', 'color: gray', [...back])
    console.groupEnd()
  }
}

// 不让外部修改
const back = new Proxy(stack, {
  get (target, key, receiver) {
    switch (key) {
      case 'pop':
        return () => {
          log('移除back-->pop')
          if (target.length) {
            target.pop().callback()
          }
          log()
        }
      case 'push':
        return callback => {
          if (typeof callback !== 'function') {
            throw new TypeError('[push]参数callback必须是Function')
          }
          log('添加back-->push')
          const key = `v-back-${Date.now()}-${Math.round(Math.random() * 10000)}-${target.length}`
          target.push({
            key,
            callback () {
              callback()
              back.delete(key)
            }
          })
          log()
          return key
        }
      case 'delete':
        return key => {
          log('移除back-->delete')
          for (let i = 0, length = target.length; i < length; i++) {
            if (key === target[i].key) {
              target.splice(i, 1)
              break
            }
          }
          log()
        }
      default:
        if (target.hasOwnProperty(key)) {
          return Reflect.get(target, key, receiver)
        }
        break
    }
  },
  set (target, key, value, receiver) { }
})

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
