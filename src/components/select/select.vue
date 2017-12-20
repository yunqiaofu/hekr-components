<template lang="pug">
  .hk-select
    .hk-select-header(
      v-if="title"
    ) {{title}}
    ul.hk-select-body
      li.hk-select-body-item(
        v-for="(item,index) in getOptions",
        :key="index",
        @click="select(index)"
      ) {{item.name}}
        i.hk-select-body-item-icon.icon.hk-icon(
          :class="{'hk-select-body-item-icon-disabled': item.disabled}"
        )
          hk-icon(
            :name="getIcon(item)"
          )
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
      }
    },
    data () {
      return {
        selected: null,
        oldOptions: null,
        offIcon: 'hk-icons-circle',
        onIcon: 'hk-icons-check-checked'
      }
    },
    mounted () {
      this.oldOptions = this.options
    },
    computed: {
      getOptions () {
        return this.oldOptions
      }
    },
    watch: {
      selected (Nval) {
        this.oldOptions.map((item, key) => {
          if (key === Nval) {
            this.oldOptions[key].checked = true
          } else {
            this.oldOptions[key].checked = false
          }
        })
      }
    },
    methods: {
      select (index) {
        if (this.options[index].disabled) {
          return
        }
        this.selected = index
        this.$emit('change', this.selected)
      },
      getIcon (item) {
        let icon = item.checked ? item.onIcon : item.offIcon
        if (!item.onIcon && item.checked) {
          icon = this.onIcon
        }
        if (!item.offIcon && !item.checked) {
          icon = this.offIcon
        }
        return icon
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
          font-size 1.2rem
          padding 0 !important
          color #0195fb
        &-icon&-icon-disabled
          color #CCCCCC
</style>
