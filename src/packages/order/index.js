import Order from './src/order.vue'
import OrderItem from './src/order-item.vue'

export default Vue => {
  Vue.component(Order.name, Order)
  Vue.component(OrderItem.name, OrderItem)
}
