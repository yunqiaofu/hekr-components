import I18n from './i18n'

const i18n = new I18n()
i18n.install = (Vue, {
  lang = 'en-US',
  langs
} = {}) => {
  if (langs) {
    i18n.extend(langs)
  }
  i18n.use(lang)

  // 使其响应，可用在计算属性中
  i18n.vm = new Vue({ data: i18n })
  Vue.prototype.$i18n = i18n
  Vue.prototype.$i = key => i18n.get(key)

  Vue.mixin({
    beforeCreate () {
      this.lang = i18n.i18n // 兼容上一个版本，后续会删除
      i18n.append(this)
    },
    beforeDestroy () {
      delete this.lang // 兼容上一个版本，后续会删除
      i18n.delete(this)
    }
  })
}

export default i18n
