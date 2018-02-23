import Colorpicker from './colorpicker.vue'
import PopColorpicker from './pop-colorpicker.vue'

export default Vue => {
  Vue.component(Colorpicker.name, Colorpicker)
  Vue.component(PopColorpicker.name, PopColorpicker)
}
