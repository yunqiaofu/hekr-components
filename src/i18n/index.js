import I18n from './i18n'

const i18n = new I18n()
i18n.install = (Vue, {
  lang = 'zh-CN',
  langs
} = {}) => {
  if (langs) {
    i18n.extend(langs)
  }
  i18n.use(lang)

  Vue.prototype.$i18n = i18n
  Vue.prototype.$i = key => i18n.get(key)

  Vue.mixin({
    beforeCreate () {
      this.lang = i18n.i18n
      i18n.append(this)
    },
    beforeDestroy () {
      delete this.lang
      i18n.delete(this)
    }
  })
}

export default i18n
