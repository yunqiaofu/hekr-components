import * as components from './components'
import * as packages from './packages'
import * as directives from './directives'
import * as utils from './utils'
import './stylus/hekr-components.styl'

const install = Vue => {
  if (install.installed) {
    return
  }
  Object.keys(components)
    .forEach(key => Vue.use(components[key]))

  Object.keys(packages)
    .forEach(key => Vue.use(packages[key]))

  Object.keys(directives)
    .forEach(key => Vue.use(directives[key]))

  Object.keys(utils)
    .forEach(key => utils[key](Vue))
}

export default {
  version: process.env.VERSION,
  install,
  ...components,
  ...packages,
  ...directives
}
