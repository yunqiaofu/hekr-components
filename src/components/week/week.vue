<template lang="pug">
  .hk-week
    .hk-week-header {{header}}
    .hk-week-body
      .hk-week-body-item(
        v-for="(i, index) in weeksList",
        :key="index",
        @click="select(index)"
      )
        .hk-week-body-item-title {{i.name}}
        .hk-week-body-item-btn(
          :class="{'hk-week-body-item-active': i.value}"
        )

</template>

<script>
  export default {
    name: 'hk-week',
    props: {
      header: {
        type: String,
        default: '重复'
      },
      weeksList: {
        type: Array,
        default: () => [
          {
            name: '周日',
            value: false
          },
          {
            name: '周一',
            value: false
          },
          {
            name: '周二',
            value: false
          },
          {
            name: '周三',
            value: false
          },
          {
            name: '周四',
            value: false
          },
          {
            name: '周五',
            value: false
          },
          {
            name: '周六',
            value: false
          }
        ]
      }
    },
    computed: {
    },
    methods: {
      select (index) {
        this.weeksList[index].value = !this.weeksList[index].value
        this.$emit('weekChange', this.weeksList)
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../stylus/variables.styl"
  .hk-week
    background-color $color-white
    width 100%
    border solid 1px #DEDEDE
    &-header
      height 50px
      border-bottom solid 1px #DEDEDE
      font-size: 17px
      color: #030303
      letter-spacing: -0.41px
      line-height 50px
      text-align left
      padding-left 4.5%
    &-body
      height 110px
      &-item:first-child
        margin-left 1%
      &-item:last-child
        margin-right 1%
      &-item
        width 14%
        text-align center
        float left
        &-title
          font-size $font-size-4
          color #666666
          margin 14px 0
        &-btn
          background-image url("../../assest/icon/week_select.png")
          width 26px
          height 26px
          text-align center
          background-size cover
          margin 0 auto
        &-btn&-active
          background-image url("../../assest/icon/week_select_active.png")
</style>
