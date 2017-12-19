
<template lang="pug">
  .order
    order-list(
      v-if="page==='list'",
      @go="go",
      v-model="list",
      @check="check",
      @remove="remove",
      @edit="edit"
    )
    order-add(
      v-if="page==='add'",
      @go="go",
      @onAdd="onAdd",
      @onEdit="onEdit",
      :template="myTemplate"
    )
    order-add(
      v-if="page==='edit'",
      :type="'edit'",
      @go="go",
      @onAdd="onAdd",
      @onEdit="onEdit",
      :selected="selected",
      :template="myTemplate"
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
      console.log('mounted', this.lists)
    },
    activated () {
      this.page = 'list'
      console.log('activated', this.lists)
    },
    watch: {
      lists (n, o) {
        console.log('watch', this.list, n)
        this.list = n
      }
    },
    methods: {
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
  .order
    position fixed
    height 100%
    width 100%
    overflow auto
    background-color #f5f5f5
</style>
