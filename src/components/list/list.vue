<template lang="pug">
.hk-list(@click="handleClick", :class="{'hk-list-border': border}")
  slot(name="list")
    .hk-list-left
      slot(name="left")
        i(
          :class="leftIcon",
          v-if="leftIcon"
        )
        span(
          v-if="leftText"
        ) {{ leftText }}
    .hk-list-right(
      v-if="type === 'text'",
      @click="rightClick",
      :style="getColorStyle"
    )
      slot(name="right")
        span(
          v-if="rightText"
        ) {{ rightText }}
        i(
          v-if="rightIcon",
          :class="rightIcon"
        )
    .hk-list-right(v-if="type === 'input'")
      input.hk-list-input(
        type="text",
        :value="value",
        v-if="inputType === 'text'",
        :maxLength="inputMaxLength",
        @input="$emit('input', $event.target.value)"
      )
</template>

<script>
export default {
  name: 'hk-list',
  props: {
    type: {
      type: String
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
    value: {
      type: String
    },
    inputType: {
      type: String,
      default: 'text'
    },
    inputMaxLength: {
      type: Number,
      default: 12
    },
    checked: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getColorStyle () {
      return {
        'color': this.textColor
      }
    }
  },
  methods: {
    handleClick () {
      this.$emit('list-click')
    },
    rightClick () {
      this.$emit('right-click')
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"

.hk-list
  display flex
  width calc(100% - 1rem)
  margin-left 1rem
  height 2.2rem
  line-height 2.2rem
  padding .5rem 1rem .5rem 0
  font-size $font-size-4
  &-border
    border-bottom 1px solid #ccc
  &-left
    width 40%
    i
      padding-right .2rem
  &-right
    width 60%
    text-align right
    i
      padding-left .2rem
  &-input
    width 100%
    background none
    outline none
    border 0px
</style>
