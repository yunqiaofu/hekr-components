
<template lang="pug">
.hk-order
  hk-order-list(
    v-if="page==='list'",
    @go="go",
    v-model="list",
    @check="check",
    @remove="remove",
    @edit="edit",
    :options="options",
    @back="back",
    :setting="setting"
  )
  hk-order-add(
    v-if="page==='add'",
    v-back="vback",
    @go="go",
    @onAdd="onAdd",
    @onEdit="onEdit",
    :template="getTemplate",
    :options="options"
  )
  hk-order-add(
    v-if="page==='edit'",
    v-back="vback",
    :type="'edit'",
    @go="go",
    @onAdd="onAdd",
    @onEdit="onEdit",
    :selected="selected",
    :template="getTemplate",
    :options="options"
  )
</template>

<script>
import HkOrderList from './order-list.vue'
import HkOrderAdd from './order-add.vue'
export default {
  name: 'hk-order',
  components: {
    HkOrderList,
    HkOrderAdd
  },
  props: {
    template: {
      type: Object,
      default () {
        return {
          taskName: '',
          code: {
            cmdTag: ''
          }
        }
      }
    },
    options: {
      type: Array,
      default: () => []
    },
    lists: {
      type: Array,
      default: () => []
    },
    setting: {
      type: Object,
      default: () => ({ maxLen: 10 })
    }
  },
  data () {
    return {
      page: 'list',
      list: [...this.lists],
      date: new Date(),
      index: -1,
      selected: {}
    }
  },
  computed: {
    getTemplate () {
      return {
        taskName: this.$i('order.taskName'),
        code: {
          cmdTag: ''
        },
        date: {
          minute: this.date.getMinutes(),
          hour: this.date.getHours(),
          repeatList: []
        },
        ...this.template
      }
    }
  },
  activated () {
    this.page = 'list'
  },
  watch: {
    lists (n, o) {
      this.list = n
    },
    page () {
      this.date = new Date()
    }
  },
  methods: {
    vback () {
      this.page = 'list'
    },
    back () {
      this.$emit('back')
    },
    go (page) {
      this.page = page
    },
    edit (item, index) {
      this.index = index
      this.selected = this.list[this.index]
      this.page = 'edit'
    },
    check (item, index) {
      console.log('item', item, index)
      this.$emit('onEdit', this.list[index])
    },
    onAdd (data) {
      this.$emit('onAdd', data)
      this.list.push(data)
    },
    remove (item, index) {
      this.$emit('onRemove', item)
    },
    onEdit (data) {
      this.$emit('onEdit', data)
      this.selected = data
      this.list[this.index] = data
    }
  }
}
</script>

<style lang="stylus">
.hk-order
  position fixed
  height 100%
  width 100%
  overflow auto
  background-color #f5f5f5
</style>
