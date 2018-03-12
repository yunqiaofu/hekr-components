import Offline from './offline.vue'

export default Vue => {
  const OfflineConstructor = Vue.extend(Offline)
  let $ = null
  // 存储vue实例对象
  const offline = options => {
    if (options === undefined) {
      options = {}
    } else if (typeof options === 'string') {
      options = {
        text: options
      }
    }
    if (!$) {
      $ = new OfflineConstructor().$mount()
      $.$once('input', () => offline.close())
      document.body.appendChild($.$el)
    }
    $.value = true
    $.icon = options.icon
    $.text = options.text
    $.closeabled = options.closeabled
  }

  // 关闭离线浮层
  offline.close = () => {
    if ($) {
      $.$destroy()
      document.body.removeChild($.$el)
      $ = null
    }
  }
  return offline
}
