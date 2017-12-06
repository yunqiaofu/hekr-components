import Item from './item.vue'
import TimePicker from './timePicker.vue'

export default Vue => {
  Vue.component(Item.name, Item)
  Vue.component(TimePicker.name, TimePicker)
}
