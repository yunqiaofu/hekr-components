import Item from './item.vue'
import Box from './box.vue'
import TimePicker from './timePicker.vue'

export default Vue => {
  Vue.component(Item.name, Item)
  Vue.component(Box.name, Box)
  Vue.component(TimePicker.name, TimePicker)
}
