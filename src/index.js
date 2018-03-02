import rem from './rem'
import i18n from './i18n'
import * as packages from './packages'
import * as directives from './directives'
import * as components from './components'
import './stylus/hekr-components.styl'

const install = (Vue, {
  lang = 'en-US',
  langs
} = {}) => {
  if (install.installed) {
    return
  }

  // rem单位支持
  Vue.use(rem)

  // 安装语言包
  Vue.use(i18n, { lang, langs })

  Object.keys(packages)
    .forEach(key => Vue.use(packages[key]))

  Object.keys(directives)
    .forEach(key => Vue.use(directives[key]))

  Object.keys(components)
    .forEach(key => Vue.use(components[key]))
}

export default {
  version: process.env.VERSION,
  install,
  i18n,
  locale: i18n, // 兼容上一个版本
  ...components,
  ...packages,
  ...directives
}

export {
  i18n,
  i18n as locale, // 兼容上一个版本
  components,
  packages,
  directives
}
