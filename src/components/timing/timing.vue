<template lang="pug">
.hk-timing
  timing-list(
    v-if="!showEdit",
    :tasks="list",
    :options="options",
    :title="title",
    :maxlength="maxlength",
    @add="add",
    @check="check",
    @remove="remove",
    @edit="edit",
    @back="back"
  )
  timing-edit(
    v-else
    v-back="vback",
    :template="getTemplate",
    :options="options",
    @back="closeEdit",
    @onAdd="onAdd",
    @onEdit="onEdit"
  )
</template>

<script>
import TimingList from './timing-list.vue'
import TimingEdit from './timing-edit.vue'

export default {
  name: 'hk-timing',
  components: {
    TimingList,
    TimingEdit
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    code: {
      type: Object,
      default: () => ({ cmdTag: '' })
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
      showEdit: false,
      list: [...this.items],
      date: new Date(),
      index: null,
      selected: null
    }
  },
  computed: {
    getTemplate () {
      if (this.selected) {
        return this.selected
      }
      return {
        taskName: this.$i('timing.taskName'),
        code: {
          cmdTag: '',
          ...this.code
        },
        date: {
          minute: this.date.getMinutes(),
          hour: this.date.getHours(),
          repeatList: []
        }
      }
    },
    vback () {
      return {
        action: this.showEdit,
        callback: () => {
          this.showEdit = false
        }
      }
    }
  },
  watch: {
    items: {
      deep: true,
      handler (val) {
        this.list = [ ...val ]
      }
    },
    showEdit (val) {
      this.date = new Date()
      if (!val) this.selected = null
    }
  },
  methods: {
    back () {
      this.$emit('back')
    },
    add () {
      this.showEdit = true
    },
    closeEdit () {
      this.showEdit = false
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
      this.showEdit = true
    },
    check (item, index) {
      const tasks = [ ...this.list ]
      tasks[index] = item
      this.list = [ ...tasks ]
      this.$emit('onEdit', item, index)
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
.hk-timing
  position fixed
  top 0
  right 0
  bottom 0
  left 0
</style>
