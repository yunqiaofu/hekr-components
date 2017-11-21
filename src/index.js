import * as components from './components'
import * as packages from './packages'
import './stylus/hekr-components.styl'

const install = Vue => {
  if (install.installed) {
    return
  }
  Object
    .keys(components)
    .forEach(name => {
      Vue.use(components[name])
    })

  Object
    .keys(packages)
    .forEach(name => {
      Vue.use(packages[name])
    })
}

export default {
  version: process.env.VERSION,
  install,
  ...components,
  ...packages
}
