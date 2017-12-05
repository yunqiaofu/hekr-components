<template lang="pug">
.hk-week
  .hk-week-header {{ title }}
  .hk-week-body
    .hk-week-body-item(
      v-for="(item, index) in items",
      :key="index",
      :style="items | getItemStyle"
      @click="select(item, index)"
    )
      .hk-week-body-item-title {{ item.name }}
      .hk-week-body-item-check(:class="item | getIconClass")
        i(:class="icon")
</template>

<script>
const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
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
    },
    labels: {
      type: Array,
      default: () => week
    },
    icon: {
      type: String,
      default: 'hk-icons-week-checked'
    }
  },
  computed: {
    items () {
      return this.labels.map((item, index) => ({
        name: item,
        checked: this.value.find(val => val === index) !== undefined,
        disabled: this.disabled.find(val => val === index) !== undefined
      }))
    }
  },

  filters: {
    getItemStyle (val) {
      return {
        width: `${100 / val.length}%`
      }
    },
    getIconClass (val) {
      return {
        'hk-week-body-item-check-checked': val.checked,
        'hk-week-body-item-check-disabled': val.disabled
      }
    }
  },

  methods: {
    select (item, itemIndex) {
      if (item.disabled) {
        return
      }
      let index = -1
      for (let i = 0; i < this.value.length; i++) {
        if (this.value[i] === itemIndex) {
          index = i
          break
        }
      }
      const value = [...this.value]
      if (index !== -1) {
        value.splice(index, 1)
      } else {
        value.push(itemIndex)
      }
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="stylus">
  @import "../../stylus/variables.styl"
  .hk-week
    background-color $color-white
    width 100%
    &-header
      height 2.5rem
      border-bottom solid 1px #DEDEDE
      font-size 0.85rem
      color #030303
      letter-spacing: -0.41px
      line-height 2.5rem
      text-align left
      padding-left 4.5%
    &-body
      height 5.5rem
      &:before
      &:after
        content ""
        display table
        clear both
        float none
      &-item
        width 14%
        text-align center
        float left
        &-title
          font-size 0.7rem
          color #666666
          margin 0.7rem 0
        &-check
          text-align center
          background-size cover
          margin 0 auto
          font-size 1.3rem
          color #ccc
          &&-disabled
            cursor not-allowed
            color lighten(#ccc, 30%)
          &-checked
            color #3ba4f7
            &&^[-1]-disabled
              color lighten(#3ba4f7, 30%)
</style>
