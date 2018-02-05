import rem from './rem'
import locale from './locale'
import * as packages from './packages'
import * as directives from './directives'
import * as components from './components'
import './stylus/hekr-components.styl'

const install = (Vue, {
  lang = 'zh-CN'
} = {}) => {
  if (install.installed) {
    return
  }

  // rem单位支持
  Vue.use(rem)

  // 安装语言包
  Vue.use(locale, lang)

  Object.keys(packages)
    .forEach(key => Vue.use(packages[key], locale.langs[locale.lang]))

  Object.keys(directives)
    .forEach(key => Vue.use(directives[key], locale.langs[locale.lang]))

  Object.keys(components)
    .forEach(key => Vue.use(components[key], locale.langs[locale.lang]))
}

export default {
  version: process.env.VERSION,
  install,
  locale,
  ...components,
  ...packages,
  ...directives
}

export {
  locale,
  components,
  packages,
  directives
}
