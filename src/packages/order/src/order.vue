
<template lang="pug">
  .hk-order
    order-list(
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
    order-add(
      v-if="page==='add'",
      v-back="vback",
      @go="go",
      @onAdd="onAdd",
      @onEdit="onEdit",
      :template="myTemplate",
      :options="options"
    )
    order-add(
      v-if="page==='edit'",
      v-back="vback",
      :type="'edit'",
      @go="go",
      @onAdd="onAdd",
      @onEdit="onEdit",
      :selected="selected",
      :template="myTemplate",
      :options="options"
    )
</template>

<script>
  import orderList from './order-list.vue'
  import orderAdd from './order-add.vue'

  export default {
    name: 'hk-order',
    props: {
      lists: {
        type: Array,
        default: () => []
      },
      template: {
        type: Object,
        default: () => {
          return {
            date: {
              minute: 1,
              hour: 1,
              repeatList: []
            },
            taskName: '未命名'
          }
        }
      },
      options: {
        type: Array,
        default: () => []
      },
      setting: {
        type: Object,
        default: () => {
          return {
            maxLen: 10
          }
        }
      }
    },
    data () {
      return {
        page: 'list',
        list: this.lists,
        index: -1,
        selected: {}
      }
    },
    computed: {
      myTemplate () {
        return {
          date: {
            minute: 1,
            hour: 1,
            repeatList: []
          },
          taskName: '未命名',
          ...this.template
        }
      }
    },
    components: {
      orderList,
      orderAdd
    },
    mounted () {
    },
    activated () {
      this.page = 'list'
    },
    watch: {
      lists (n, o) {
        this.list = n
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
      check (item) {
        this.$emit('onEdit', item)
      },
      onAdd (date) {
        this.$emit('onAdd', date)
        this.list.push(date)
      },
      remove (item, index) {
        this.$emit('onRemove', item)
      },
      onEdit (date) {
        this.$emit('onEdit', date)
        this.selected = date
        this.list[this.index] = date
        this.$emit('input', this.list)
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
