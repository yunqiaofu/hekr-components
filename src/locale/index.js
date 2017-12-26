import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'

const langs = {
  'zh-CN': zhCN,
  'en-US': enUS
}

// 语言合并
const merge = (...arg) => {
  let i = 0
  while (i < arg.length) {
    if (!arg[i + 1]) {
      i++
      continue
    }
    if (typeof arg[0] !== 'object') {
      arg[0] = arg[i + 1]
      i++
      continue
    }
    Object.keys(arg[i + 1])
      .forEach(key => {
        if (!arg[0][key] || typeof arg[0][key] !== 'object' || typeof arg[i + 1][key] !== 'object') {
          arg[0][key] = arg[i + 1][key]
        } else {
          arg[0][key] = merge(arg[0][key], arg[i + 1][key])
        }
      })
    i++
  }
  return arg[0]
}

const extend = lang => {
  Object.keys(lang)
    .forEach(key => {
      langs[key] = merge({}, langs['zh-CN'], langs[key], lang[key])
    })
}

const install = (Vue, lang) => {
  if (typeof lang !== 'string') {
    Vue.util.warn('hekrComponents语言选项lang不是有效字符串')
  }
  if (!langs[lang]) {
    Vue.util.warn(`没有找到语言包${lang}，使用默认语言包zh-CN`)
  }
  lang = langs[lang] ? lang : 'zh-CN'

  Vue.mixin({
    beforeCreate () {
      this.lang = langs[lang]
    },
    beforeDestroy () {
      delete this.lang
    }
  })
  locale.lang = lang
}

const locale = {
  extend,
  install,
  langs
}

export default locale
