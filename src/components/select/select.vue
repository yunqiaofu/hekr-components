<template lang="pug">
  .hk-select
    .hk-select-header {{title}}
    ul.hk-select-body
      li.hk-select-body-item(
        v-for="(item,index) in options",
        :key="index",
        @click="select(index)"
      ) {{item.name}}
        i.hk-select-body-item-icon.icon.hk-icon(
          :class="{'hk-select-body-item-icon-disabled': item.disabled}"
        ) {{value === item.value? '&#xe9c1;':'&#xe9bf'}}
</template>

<script>
  export default {
    name: 'hk-select',
    props: {
      title: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default: () => []
      },
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        selected: null
      }
    },
    mounted () {
      this.options.map((item, key) => {
        if (this.value === item.value) {
          this.selected = key
        }
      })
    },
    computed: {
    },
    methods: {
      select (index) {
        if (this.options[index].disabled) {
          return
        }
        this.selected = index
        this.$emit('input', this.options[index].value)
        this.$emit('change', this.options[index].value)
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../stylus/variables.styl"
  .hk-select
    background-color $color-white
    width 100%
    &-header
      height 2.8rem
      line-height 2.8rem
      border-bottom solid 1px #DFDFDF
      margin-left 1rem
      text-align left
    &-body
      margin 0 0 0.7rem 1rem
      padding 0
      max-height 8.25rem
      overflow: auto
      &-item
        list-style none
        text-align left
        border-bottom solid 1px #DFDFDF
        height 2.75rem
        line-height 2.75rem
        position relative
        &-icon
          position absolute
          background-size: cover;
          right 1rem
          top 0rem
          line-height 2.75rem
          font-size 24px
          color #0195fb
        &-icon&-icon-disabled
          color #CCCCCC
</style>
