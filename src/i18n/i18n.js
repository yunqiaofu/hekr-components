import merge from './merge'
import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'

export default class I18n {
  constructor () {
    this.$ = null
    this.lang = 'zh-CN'
    this.langs = {
      'zh-cn': zhCN,
      'en-us': enUS
    }
    this.vm = []
  }

  get i18n () {
    return this.langs[this.lang.toLocaleLowerCase().replace(/_/g, '-')]
  }

  get (key) {
    if (typeof key !== 'string') return
    const k = key.split('.')
    let val = this.i18n[k[0]]
    if (!val) return val
    for (let i = 1, length = k.length; i < length; i++) {
      if (!val[k[i]]) return
      val = val[k[i]]
    }
    return val
  }

  use (lang) {
    const lan = lang.toLocaleLowerCase().replace(/_/g, '-')

    if (this.langs[lan]) {
      this.lang = lang
    } else {
      this.lang = 'zh-CN'
      console.warn(`没有找到语言包${lang}，使用默认语言包zh-CN`)
    }
    this.vm.forEach(vm => {
      vm.lang = this.i18n
      vm.$forceUpdate()
    })
  }

  extend (langs) {
    const _langs = this.langs
    Object.keys(langs)
      .forEach(key => {
        const k = key.toLocaleLowerCase().replace(/_/g, '-')
        _langs[k] = merge({}, _langs['zh-cn'], _langs[k], langs[key])
      })
    // 确保vue响应
    this.langs = _langs
  }

  append (vm) {
    this.vm.push(vm)
  }

  delete (vm) {
    for (let i = 0, length = this.vm.length; i < length; i++) {
      if (vm._uid === this.vm[i]._uid) {
        this.vm.splice(i, 1)
        break
      }
    }
  }
}
