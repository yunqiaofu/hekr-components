import merge from './merge'
import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'

export default class I18n {
  constructor ({
    lang = 'en-US'
  } = {}) {
    this.lang = lang
    this.langs = {
      'zh-cn': zhCN,
      'en-us': enUS,
      'zh': zhCN,
      'en': enUS
    }
    this.vm = null
    this.vms = []
  }

  get i18n () {
    return this.langs[this.lang.toLocaleLowerCase().replace(/_/g, '-')]
  }

  get (key) {
    if (typeof key !== 'string') return
    const k = key.split('.')
    let val = this.i18n[k[0]]
    if (typeof val !== 'object') return val
    for (let i = 1, length = k.length; i < length; i++) {
      val = val[k[i]]
      if (val === undefined) break
    }
    return val
  }

  use (lang) {
    const lan = lang.toLocaleLowerCase().replace(/_/g, '-')
    if (this.langs[lan]) {
      this.lang = lang
    } else {
      let l = lan.split('-')[0]
      if (this.langs[l]) {
        this.lang = l
      } else {
        this.lang = 'en-US'
        console.warn(`没有找到语言包${lang}，使用默认语言包en-US`)
      }
    }
    this.vms.forEach(vm => {
      vm.lang = this.i18n // 后续会废弃
      vm.$forceUpdate()
    })
  }

  extend (langs) {
    const _langs = this.langs
    Object.keys(langs)
      .forEach(key => {
        const k = key.toLocaleLowerCase().replace(/_/g, '-')
        _langs[k] = merge({}, _langs['en-us'], _langs[k], langs[key])
      })
    // 确保vue响应
    this.langs = _langs
  }

  append (vm) {
    this.vms.push(vm)
  }

  delete (vm) {
    for (let i = 0, length = this.vms.length; i < length; i++) {
      if (vm._uid === this.vms[i]._uid) {
        this.vms.splice(i, 1)
        break
      }
    }
  }
}
