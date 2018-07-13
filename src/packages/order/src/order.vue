
<template lang="pug">
.hk-order
  hk-order-list(
    v-if="page==='list'",
    :tasks="list",
    :options="options",
    :title="title",
    :maxlength="maxlength",
    @go="go",
    @check="check",
    @remove="remove",
    @edit="edit",
    @back="back",
  )
  hk-order-edit(
    v-if="showEdit",
    v-back="vback",
    :type="page",
    :template="getTemplate",
    :options="options",
    :selected="selected",
    @go="go",
    @onAdd="onAdd",
    @onEdit="onEdit"
  )
</template>

<script>
import HkOrderList from './order-list.vue'
import HkOrderEdit from './order-edit.vue'
export default {
  name: 'hk-order',
  components: {
    HkOrderList,
    HkOrderEdit
  },
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    template: {
      type: Object,
      default: () => ({ taskName: '', code: { cmdTag: '' } })
    },
    options: {
      type: Array,
      default: () => []
    },
    title: {
      type: String
    },
    maxlength: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      page: 'list',
      list: [...this.lists],
      date: new Date(),
      index: null,
      selected: null
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
    },
    showEdit () {
      return this.page === 'add' || this.page === 'edit'
    },
    vback () {
      return {
        action: this.showEdit,
        callback: () => {
          this.page = 'list'
        }
      }
    }
  },
  activated () {
    this.page = 'list'
  },
  watch: {
    lists: {
      deep: true,
      handler (val) {
        this.list = [ ...val ]
      }
    },
    page (val) {
      this.date = new Date()
      if (val === 'add' || val === 'list') {
        this.selected = null
      }
    }
  },
  methods: {
    back () {
      this.$emit('back')
    },
    go (page) {
      this.page = page
    },
    edit (item, index) {
      this.index = index
      const date = item.date
      const code = item.code
      this.selected = {
        ...item,
        code: { ...code },
        date: {
          ...date,
          hour: date.hour,
          minute: date.minute,
          repeatList: [...(date.repeatList || [])]
        }
      }
      this.page = 'edit'
    },
    check (item, index) {
      const tasks = [ ...this.list ]
      tasks[index] = item
      this.list = [ ...tasks ]
      this.$emit('onEdit', item)
    },
    onAdd (data) {
      const tasks = [ ...this.list ]
      tasks.push(data)
      this.list = [ ...tasks ]
      this.$emit('onAdd', data)
    },
    remove (item, index) {
      const tasks = [ ...this.list ]
      tasks.splice(index, 1)
      this.list = [ ...tasks ]
      this.$emit('onRemove', item, index)
    },
    onEdit (item) {
      const tasks = [ ...this.list ]
      tasks[this.index] = item
      this.list = [ ...tasks ]
      this.$emit('onEdit', item, this.index)
      this.selected = null
      this.index = null
    }
  }
}
</script>

<style lang="stylus">
.hk-order
  position fixed
  top 0
  right 0
  bottom 0
  left 0
</style>
