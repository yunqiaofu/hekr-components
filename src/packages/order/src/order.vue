
<template lang="pug">
  .order
    order-list(
      v-if="page==='list'",
      @go="go",
      v-model="list",
      @check="check"
    )
    order-edit(
      v-if="page==='edit'",
      v-model="list",
      @go="go",
      @remove="remove"
    )
    order-add(
      v-if="page==='add'",
      @go="go",
      @add="add"
    )
</template>

<script>
  import orderList from './order-list.vue'
  import orderEdit from './order-edit.vue'
  import orderAdd from './order-add.vue'

  export default {
    name: 'hk-order',
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        page: 'list'
      }
    },
    computed: {
    },
    components: {
      orderList,
      orderEdit,
      orderAdd
    },
    methods: {
      go (page) {
        this.page = page
      },
      check () {
        console.log('order', this.list)
      },
      add (date) {
        console.log('order', date)
      },
      remove () {
        this.$emit('remove', this.oValue)
      }
    }
  }
</script>

<style lang="stylus">
  .order
    height 100vh
    background-color #f5f5f5
</style>
