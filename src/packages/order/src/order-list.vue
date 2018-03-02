
<template lang="pug">
.hk-order-list
  hk-header(
    :title="$i('order.timing')",
    @click-left="back",
    :rightText="rightText",
    @click-right="toEdit"
  )
  .hk-order-list-container
    hk-order-item(
      v-for="(task, index) in list",
      :key="index",
      :task="task",
      :isEdit="isEdit",
      :options="options",
      @remove="remove(task, index)",
      @edit="edit(task, index)",
      @check="check(task, index)"
    )
  .hk-order-list-footer
    hk-button(
      :type="'primary'",
      :disabled="list.length + 1 > maxlength",
      block,
      @click="go('add')"
    ) {{ $i('order.add') }}
</template>

<script>
import hkOrderItem from './order-item.vue'
export default {
  name: 'hk-order-list',
  components: {
    hkOrderItem
  },
  props: {
    tasks: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    maxlength: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      list: [ ...this.tasks ],
      isEdit: false
    }
  },
  computed: {
    len () {
      return this.list.length || 0
    },
    rightText () {
      return this.list.length === 0
        ? ''
        : this.isEdit
          ? this.$i('order.done')
          : this.$i('order.edit')
    }
  },
  activated () {
    this.isEdit = false
  },
  watch: {
    tasks: {
      deep: true,
      handler (val) {
        this.list = [ ...val ]
      }
    }
  },
  methods: {
    toEdit () {
      this.isEdit = !this.isEdit
    },
    back () {
      this.$emit('back')
    },
    go (route) {
      this.$emit('go', route)
    },
    edit (selected, index) {
      this.$emit('edit', selected, index)
    },
    check (item, index) {
      const data = {
        ...item,
        enable: item.expired ? true : !item.enable
      }
      this.$emit('check', data, index)
    },
    remove (item, index) {
      this.$emit('remove', item, index)
    }
  }
}
</script>

<style lang="stylus">
.hk-order-list
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  background-color #f5f5f5
  .hk-header
    background-color #fff
  &-container
    position absolute
    top 2.25rem
    right 0
    bottom 4rem
    left 0
    padding 0.5rem 0
    overflow-x hidden
    overflow-y auto
  &-footer
    height 4rem
    position absolute
    right 0
    bottom 0
    left 0
    background-color #fff
    .hk-button
      width 80%
      max-width 16rem
      margin 1rem auto
</style>
