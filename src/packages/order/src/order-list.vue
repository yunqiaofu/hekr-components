
<template lang="pug">
  .order-list
    hk-header(
      :title="'定时预约'",
      @click-left="back",
      :rightText="isEdit?'完成':'编辑'",
      @click-right="edit"
    )
    .order-list-body
      hk-order-item(
        v-for="t,k in list",
        :border="k<len-1",
        :key="t.id",
        v-model="t",
        @check="check",
        :isEdit="isEdit",
        @remove="remove(t,k)"
      )
    hk-button.order-list-btn(
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
    methods: {
      edit () {
        this.isEdit = !this.isEdit
      },
      back () {
        this.$router.go(-1)
      },
      go (route) {
        this.$emit('go', route)
      },
      check () {
        console.log('order-list', this.list)
        this.$emit('check', this.list)
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
  .order-list
    height 100vh
    &-body
      margin-top 10px
    &-btn
      width 80%
      max-width 320px
      position absolute !important
      left 50%
      transform translateX(-50%)
      bottom 20px
</style>
