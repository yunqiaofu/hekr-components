<template lang="pug">
  .hk-week
    .hk-week-header {{title}}
    .hk-week-body
      .hk-week-body-item(
        v-for="(i, index) in weeksList",
        :key="index",
        @click="select(index)"
      )
        .hk-week-body-item-title {{i.name}}
        .hk-week-body-item-btn(
          :class="getClass(index)"
        )

</template>

<script>
  export default {
    name: 'hk-week',
    props: {
      title: {
        type: String,
        default: '重复'
      },
      value: {
        type: Array,
        default: () => []
      },
      disabled: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        weeksList: [
          {
            name: '周日',
            value: 0
          },
          {
            name: '周一',
            value: 1
          },
          {
            name: '周二',
            value: 2
          },
          {
            name: '周三',
            value: 3
          },
          {
            name: '周四',
            value: 4
          },
          {
            name: '周五',
            value: 5
          },
          {
            name: '周六',
            value: 6
          }],
        valueList: [false, false, false, false, false, false, false]
      }
    },
    mounted () {
      this.value.map((item) => {
        this.$set(this.valueList, item, true)
      })
    },
    computed: {
    },
    methods: {
      select (index) {
        for (let i = 0; i < this.disabled.length; i++) {
          if (this.disabled[i] === index) {
            return
          }
        }
        this.$set(this.valueList, index, !this.valueList[index])
        let value = []
        this.valueList.map((item, key) => {
          if (item) {
            value.push(this.weeksList[key].value)
          }
        })
        this.$emit('input', value)
        this.$emit('weekChange', value)
      },
      getClass (index) {
        for (let i = 0; i < this.disabled.length; i++) {
          if (this.disabled[i] === index) {
            return {
              'hk-week-body-item-disabled': true
            }
          }
        }
        return {
          'hk-week-body-item-active': this.valueList[index]
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../stylus/variables.styl"
  .hk-week
    background-color $color-white
    width 100%
    border-top solid 1px #DEDEDE
    border-bottom solid 1px #DEDEDE
    &-header
      height 2.5rem
      border-bottom solid 1px #DEDEDE
      font-size: 0.85rem
      color: #030303
      letter-spacing: -0.41px
      line-height 2.5rem
      text-align left
      padding-left 4.5%
    &-body
      height 5.5rem
      &-item:first-child
        margin-left 1%
      &-item:last-child
        margin-right 1%
      &-item
        width 14%
        text-align center
        float left
        &-title
          font-size 0.7rem
          color #666666
          margin 0.7rem 0
        &-btn
          background-image url("week_select.png")
          width 1.3rem
          height 1.3rem
          text-align center
          background-size cover
          margin 0 auto
        &-btn&-active
          background-image url("week_select_active.png")
        &-btn&-disabled
          background-image url("week_select_disabled.png")
</style>
