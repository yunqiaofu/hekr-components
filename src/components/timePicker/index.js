import Item from './item.vue'
import Box from './box.vue'

export default Vue => {
  Vue.component(Item.name, Item)

  Vue.component(Box.name, Box)
}
