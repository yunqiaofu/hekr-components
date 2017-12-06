import Item from './item.vue'
import TimePicker from './timepicker.vue'

export default Vue => {
  Vue.component(Item.name, Item)
  Vue.component(TimePicker.name, TimePicker)
}
