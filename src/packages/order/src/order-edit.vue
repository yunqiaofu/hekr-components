
<template lang="pug">
  .order
    hk-header(
      :title="'定时预约'",
      @click-left="go('list')",
      :rightText="'完成'"
    )
    .order-list-body
      hk-order-item(
        v-for="t,k in list",
        :border="k<len-1",
        :key="k",
        v-model="t",
        @check="check",
        :isEdit="true",
        @remove="remove"
      )
</template>

<script>
  export default {
    name: 'order-edit',
    props: {
      value: {
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
        list: this.value
      }
    },
    methods: {
      go (route) {
        this.$emit('go', route)
      },
      remove () {
        this.$emit('remove', this.oValue)
      }
    }
  }
</script>

<style lang="stylus">
  .order
    &-btn
      width 80%
      max-width 320px
      position absolute
      left 50%
      transform translateX(-50%)
      bottom 20px
</style>
