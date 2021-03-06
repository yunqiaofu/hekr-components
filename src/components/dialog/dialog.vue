<template lang="pug">
.hk-dialog
  transition(
    name="hk-fade-in"
    appear
  )
    .hk-dialog-mask(
      v-if="value && showMask",
      @click="clickMask"
    )
  transition(
    name="hk-dialog-scale"
    appear
  )
    .hk-dialog-container(v-if="value")
      slot
        .hk-dialog-container-header
          slot(name="header") {{ title }}
        .hk-dialog-container-body(:style="getBodyTextAlign")
          slot(name="body")
            input.hk-dialog-container-body-input(
              v-if="type === 'input'",
              v-bind="inputProps",
              :type="getInputType",
              v-model="inputValue"
            )
            .hk-dialog-container-body-text(v-else) {{ text }}
        .hk-dialog-container-footer
          slot(name="footer")
            button.hk-dialog-container-footer-cancel(
              v-if="showCancel",
              :class="getCancelClass",
              @click="cancel"
            ) {{ cancelText || $i('dialog.cancelText') }}
            button.hk-dialog-container-footer-confirm(
              v-if="showConfirm",
              :class="getConfirmClass",
              @click="confirm"
            ) {{ confirmText || $i('dialog.confirmText') }}

</template>

<script>
export default {
  name: 'hk-dialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text',
      validator: val => {
        return [
          'text',
          'input'
        ].indexOf(val) !== -1
      }
    },
    showMask: {
      type: Boolean,
      default: true
    },
    maskClickDisabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    bodyTextAlign: {
      type: String,
      default: 'left',
      validator: val => {
        return [
          'left',
          'center',
          'right'
        ].indexOf(val) !== -1
      }
    },
    inputProps: {
      type: Object,
      default: () => {}
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String
    }
  },
  data () {
    return {
      inputValue: ''
    }
  },
  computed: {
    getBodyTextAlign () {
      return {
        'text-align': this.bodyTextAlign
      }
    },
    getCancelClass () {
      return {
        'hk-dialog-container-footer-cancel-full': !this.showConfirm
      }
    },
    getConfirmClass () {
      return {
        'hk-dialog-container-footer-confirm-full': !this.showCancel
      }
    },
    getInputValue () {
      return (this.inputProps || {}).value || ''
    },
    getInputType () {
      return (this.inputProps || {}).type || 'text'
    }
  },
  mounted () {
    this.inputValue = this.getInputValue
  },
  watch: {
    getInputValue (val) {
      this.inputValue = val
    }
  },
  methods: {
    clickMask () {
      if (!this.maskClickDisabled) {
        this.$emit('input', false)
      }
    },
    cancel () {
      this.$emit('cancel')
      this.$emit('input', false)
      this.inputValue = ''
    },
    confirm () {
      if (this.type === 'input') {
        this.$emit('confirm', this.inputValue)
      } else {
        this.$emit('confirm')
      }
      this.inputValue = ''
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"
$border = 0.05rem solid rgba(0, 0, 0, 0.3)

.hk-dialog
  &-mask
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    z-index $zindex-higher
    background-color rgba(0, 0, 0, 0.4)
  &-container
    width 13.5rem
    position fixed
    top 50%
    left 50%
    z-index $zindex-higher
    transform translate3d(-50%, -50%, 0)
    margin 0 auto
    border-radius 0.15rem
    background-color $color-white
    border 0.05rem solid rgba(0, 0, 0, 0.1)
    &-header
      padding 1rem 0.7rem 0.3rem 0.7rem
      font-size $font-size-3
      font-weight 500
      color #333
      text-align center
    &-body
      padding 0.3rem 0.7rem
      &-text
        font-size $font-size-4
        color #999
      &-input
        display block
        width 100%
        padding 0.35rem 0.4rem
        border 0.05rem solid #ccc
        outline none
        color #999
        font-size $font-size-4

    &-footer
      border-top $border
      margin-top 0.3rem
      &-cancel
      &-confirm
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

        &&-full
          width 100%
          border none
      &-cancel
        color #333
      &-confirm
        color #0096FB
        border-left $border
  &-scale-enter-active
    animation hkDialogScaleIn 0.3s
  &-scale-leave-active
    animation hkDialogScaleOut 0.2s

@keyframes hkDialogScaleIn
  0%
    opacity 0
    transform translate3d(-50%, -50%, 0) scale(0.5, 0.5)
  50%
    opacity 0.4
    transform translate3d(-50%, -50%, 0) scale(1.2, 1.2)
  100%
    opacity 1
    transform translate3d(-50%, -50%, 0) scale(1, 1)

@keyframes hkDialogScaleOut
  0%
    opacity 1
    transform translate3d(-50%, -50%, 0) scale(1, 1)
  50%
    opacity 0.6
    transform translate3d(-50%, -50%, 0) scale(1.1, 1.1)
  100%
    opacity 0
    transform translate3d(-50%, -50%, 0) scale(0.5, 0.5)
</style>
