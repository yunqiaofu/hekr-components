import Item from './item.vue'
import Timepicker from './timepicker.vue'

export default Vue => {
  Vue.component(Item.name, Item)
  Vue.component(Timepicker.name, Timepicker)
}
