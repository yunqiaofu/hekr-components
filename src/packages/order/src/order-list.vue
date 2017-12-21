
<template lang="pug">
  .hk-order-list
    hk-header.hk-order-list-title(
      :title="'定时预约'",
      @click-left="back",
      :rightText="value.length===0?'':isEdit?'完成':'编辑'",
      @click-right="toEdit"
    )
    .hk-order-list-body
      hk-order-item(
        v-for="t,k in list",
        :border="k<len-1",
        :key="t.taskId",
        v-model="list[k]",
        @check="check(t,k)",
        :isEdit="isEdit",
        @remove="remove(t,k)",
        @edit="edit(t,k)",
        :options="options"
      )
    .hk-order-list-footer
      hk-button.hk-order-list-btn(
        :type="'primary'",
        @click="go('add')"
      ) 添加预约
</template>

<script>
  export default {
    name: 'hk-order',
    props: {
      value: {
        type: Array,
        default: () => []
      },
      options: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      len () {
        return this.list.length || 0
      }
    },
    data () {
      return {
        list: this.value,
        isEdit: false
      }
    },
    activated () {
      this.isEdit = false
    },
    watch: {
      value (n, o) {
        this.list = n
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
        this.$emit('check', item)
        this.$emit('input', this.list)
      },
      remove (item, index) {
        this.list.splice(index, 1)
        this.$emit('remove', item)
        this.$emit('input', this.list)
      }
    }
  }
</script>

<style lang="stylus">
  .hk-order-list
    background-color: #f5f5f5;
    &-title
      position fixed !important
      background-color #fff
      top 0
      width 100%
      z-index: 100
    &-body
      margin 2.75rem 0 4rem 0
      background-color: #f5f5f5;
    &-footer
      position fixed
      left 0
      right 100%
      width 100%
      height 4rem
      bottom 0
      background-color #fff
    &-btn
      width 80%
      position: absolute !important;
      margin 1rem auto
      left 50%
      transform translateX(-50%)
      max-width 16rem

</style>
