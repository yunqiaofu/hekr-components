<template lang="pug">
.hk-list(@click="handleClick", :class="{'hk-list-border': border}")
  slot(name="list")
    .hk-list-left
      slot(name="left")
        i.hk-list-left-icon(
          :class="leftIcon",
          v-if="leftIcon"
        )
        span.hk-list-left-icon(
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
        i.hk-list-right-icon(
          v-if="rightIcon",
          :class="rightIcon"
        )
    .hk-list-right(v-if="type === 'input'")
      input.hk-list-input(
        :type="inputProps.type",
        :value="value",
        :maxLength="inputProps.maxLength",
        @input="$emit('input', $event.target.value)"
      )
    .hk-list-right(v-if="type === 'switch'")
      hk-switch(
        :active="value",
        :onColor="switchProps.onColor",
        :offColor="switchProps.offColor",
        :disabled="disabled",
        @click="getSwitch"
      )
    .hk-list-right(v-if="type === 'check'")
      hk-check(
        v-model="checkValue",
        :onColor="checkProps.onColor",
        :offColor="checkProps.offColor",
        :onIcon="checkProps.onIcon",
        :offIcon="checkProps.offIcon",
        :disabled="disabled"
      )
</template>

<script>
export default {
  name: 'hk-list',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: val => {
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
    value: {},
    inputProps: {
      type: Object,
      default: () => {
        return {
          type: 'text',
          maxLength: 12
        }
      }
    },
    switchProps: {
      type: Object,
      default: () => {
        return {
          onColor: '#3AA4F7',
          offColor: '#C0BFBF'
        }
      }
    },
    checkProps: {
      type: Object,
      default: () => {
        return {
          onColor: '#3AA4F7',
          offColor: '#666',
          onIcon: 'hk-icons-check-checked',
          offIcon: 'hk-icons-circle'
        }
      }
    },
    border: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checkValue: this.value
    }
  },
  watch: {
    checkValue () {
      this.$emit('input', this.checkValue)
    },
    value () {
      this.checkValue = this.value
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
      this.$emit('click')
    },
    rightClick () {
      this.$emit('right-click')
    },
    getSwitch (d) {
      const value = !d
      this.$emit('input', value)
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
    border-bottom 1px solid #ccc
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
    border 0px
</style>
