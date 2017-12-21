<template lang="pug">
.hk-list(
    :class="getClass",
    @click="click"
  )
  slot(name="list")
    .hk-list-left
      slot(name="left")
        i.hk-list-left-icon(
          v-if="leftIcon",
          :class="leftIcon"
        )
        span.hk-list-left-icon(
          v-if="leftText"
        ) {{ leftText }}

    .hk-list-right(v-if="type === 'input'")
      input.hk-list-right-input(
        v-bind="inputProps",
        v-model="getValue",
        :type="getInputType"
      )
    .hk-list-right(v-else-if="type === 'switch'")
      hk-switch(
        v-bind="switchProps",
        v-model="getValue"
      )
    .hk-list-right(v-else-if="type === 'check'")
      hk-check(
        v-bind="checkProps",
        v-model="getValue"
      )
    .hk-list-right(
      v-else,
      :style="getRightStyle",
      @click="rightClick"
    )
      slot(name="right")
        span(v-if="rightText") {{ rightText }}
        i.hk-list-right-icon(
          v-if="rightIcon",
          :class="rightIcon"
        )
</template>

<script>
export default {
  name: 'hk-list',
  props: {
    type: {
      type: String,
      default: 'text',
      validator (val) {
        return [
          'text',
          'input',
          'switch',
          'check'
        ].indexOf(val) !== -1
      }
    },
    leftText: {
      type: String
    },
    leftIcon: {
      type: String
    },
    rightText: {
      type: String
    },
    rightIcon: {
      type: String
    },
    textColor: {
      type: String,
      default: '#999999'
    },
    border: {
      type: Boolean,
      default: false
    },
    value: {},
    inputProps: {
      type: Object,
      default: () => {}
    },
    switchProps: {
      type: Object,
      default: () => {}
    },
    checkProps: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    getClass () {
      return {
        'hk-list-border': this.border
      }
    },
    getRightStyle () {
      return {
        'color': this.textColor
      }
    },
    getInputType () {
      return (this.inputProps || {}).type || 'text'
    },
    getValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    click () {
      this.$emit('click')
    },
    rightClick () {
      this.$emit('right-click')
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"
ellipsis() {
  white-space nowrap
  overflow hidden
  text-overflow ellipsis
}

.hk-list
  display flex
  justify-content center
  align-items center
  margin-left 1rem
  height 2.2rem
  line-height 2.2rem
  padding .2rem 1rem .2rem 0
  font-size $font-size-4
  ellipsis()
  &-border
    border-bottom 0.05rem solid #ccc
  &-left
    width 40%
    ellipsis()
    &-icon
      padding-right .2rem
  &-right
    width 60%
    ellipsis()
    text-align right
    &-icon
      padding-left .2rem
    &-input
      width 100%
      background none
      outline none
      border 0

</style>
