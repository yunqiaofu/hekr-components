<template lang="pug">
hk-pop.hk-pop-colorpicker(v-model="val")
  .hk-pop-colorpicker-button
    button.hk-pop-colorpicker-button-cancel(@click="cancel") {{ $i('pop-colorpicker.cancel') }}
    button.hk-pop-colorpicker-button-confirm(@click="confirm") {{ $i('pop-colorpicker.confirm') }}
  hk-colorpicker(
    v-model="rgb",
    :disabled="disabled"
  )
</template>

<script>
export default {
  name: 'hk-pop-colorpicker',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    color: {
      type: Object,
      default: () => ({ r: 0, g: 0, b: 0 })
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      rgb: this.color
    }
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    value () {
      this.rgb = this.color
    },
    color () {
      this.rgb = this.color
    }
  },
  methods: {
    confirm () {
      this.$emit('confirm', this.rgb)
      this.val = false
    },
    cancel () {
      this.$emit('cancel', this.color)
      this.val = false
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"

.hk-pop-colorpicker
  .hk-pop-container
    padding 0 0 0.2rem 0
  &-button
    border-top 0.05rem solid rgba(0,0,0,0.1)
    border-bottom 0.05rem solid rgba(0,0,0,0.1)
    &-confirm
    &-cancel
      width 50%
      display inline-block
      padding 0.7rem 0.3rem
      background-color transparent
      border none
      font-size $font-size-4
      text-align center
      outline none
      cursor pointer
      &:active
        background-color darken($color-white, 3%)
    &-cancel
      color #333
    &-confirm
      color #0096fb
      border-left 0.05rem solid rgba(0,0,0,0.25)
</style>

