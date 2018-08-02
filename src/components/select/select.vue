<template lang="pug">
.hk-select
  .hk-select-header(v-if="title") {{ title }}
  hk-list(
    v-for="(item, index) in items",
    :key="index",
    type="check",
    :leftText="item.name",
    :leftIcon="item.icon",
    :value="getValue(index)",
    :checkProps="getCheckProps(item.checkProps)",
    border,
    @right-click="select(index, item)"
  )
</template>

<script>
export default {
  name: 'hk-select',
  props: {
    value: {
      type: [Number, Array],
      default: 0,
      validator (val) {
        if (Array.isArray(val)) {
          return !val.find(it => typeof it !== 'number')
        }
        return typeof val === 'number'
      }
    },
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getValue (index) {
      if (this.multiple) {
        if (Array.isArray(this.value)) {
          return this.value.indexOf(index) !== -1
        } else {
          return this.value === index
        }
      } else {
        if (Array.isArray(this.value)) {
          return this.value[0] === index
        } else {
          return this.value === index
        }
      }
    },
    getCheckProps (checkProps) {
      const disabled = (checkProps || {}).disabled
      return {
        ...checkProps,
        disabled: disabled === undefined ? this.disabled : disabled
      }
    },
    select (index, item) {
      const { checkProps = {} } = item
      if (checkProps.disabled || this.disabled) {
        return
      }
      if (this.multiple) {
        this.selectMultiple(index, item)
      } else {
        this.selectSingle(index, item)
      }
    },
    selectSingle (index, item) {
      this.$emit('input', index)
      this.$emit('change', {
        value: index,
        checked: true,
        index,
        item
      })
    },
    selectMultiple (index, item) {
      let value = this.value
      if (Array.isArray(value)) {
        value = new Set(value)
        if (!value.has(index)) {
          value.add(index)
        } else {
          value.delete(index)
        }
      } else {
        value = [value, index]
      }
      value = [...value]
      this.$emit('input', value)
      this.$emit('change', {
        value,
        checked: value.indexOf(index) !== -1,
        index,
        item
      })
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"
.hk-select
  background-color $color-white
  text-align left
  &-header
    height 2.2rem
    line-height 2.2rem
    border-bottom solid 0.05rem #dfdfdf
    font-size $font-size-3
    margin-left 1rem
</style>
