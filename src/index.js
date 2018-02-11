import rem from './rem'
import i18n from './i18n'
import * as packages from './packages'
import * as directives from './directives'
import * as components from './components'
import './stylus/hekr-components.styl'

const install = (Vue, {
  lang = 'zh-CN',
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
  ...components,
  ...packages,
  ...directives
}

export {
  i18n,
  components,
  packages,
  directives
}
