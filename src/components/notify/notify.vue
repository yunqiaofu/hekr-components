<template lang="pug">
.hk-notify
  transition(
    name="hk-notify-scale"
    appear
  )
    .hk-notify-container(v-if="value")
      .hk-notify-container-body(
        :style="getStyle",
        @click="close"
      )
        slot {{ message }}
</template>

<script>
export default {
  name: 'hk-notify',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    },
    delay: {
      type: Number,
      default: 3000
    },
    closeabled: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'left',
      validator: val => {
        return [
          'left',
          'center',
          'right'
        ].indexOf(val) !== -1
      }
    }
  },
  data () {
    return {
      time: Date.now(),
      timer: null
    }
  },
  computed: {
    getStyle () {
      return {
        'text-align': this.align
      }
    }
  },
  mounted () {
    if (this.value) {
      this.autoClose()
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.autoClose()
      } else {
        clearTimeout(this.timer)
      }
    },
    delay (nVal, oVal) {
      // 已经用掉的时间
      const time = Date.now() - this.time
      if (time < oVal) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$emit('input', false)
        }, nVal - time)
      }
    }
  },
  methods: {
    autoClose () {
      clearTimeout(this.timer)
      this.time = Date.now()
      this.timer = setTimeout(() => {
        this.$emit('input', false)
      }, this.delay)
    },
    clickMask () {
      if (!this.maskClickDisabled) {
        this.close()
      }
    },
    close () {
      if (this.closeabled) {
        clearTimeout(this.timer)
        this.$emit('input', false)
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"

.hk-notify
  &-container
    max-width 13.5rem
    position fixed
    top 50%
    left 50%
    z-index $zindex-higher
    transform translate3d(-50%, -50%, 0)
    margin 0 auto
    border-radius 0.2rem
    background-color rgba(58, 58, 58, 0.9)
    border 0.05rem solid rgba(58, 58, 58, 0.9)
    box-shadow 0 0.3rem 1rem rgba(58, 58, 58, 0.3)
    &-body
      min-width 4rem
      padding 0.5rem 0.7rem
      font-size 0.7rem
      color #fff
  &-scale-enter-active
    animation hkNotifyScaleIn 0.3s
  &-scale-leave-active
    animation hkNotifyScaleOut 0.2s

@keyframes hkNotifyScaleIn
  0%
    opacity 0
    transform translate3d(-50%, -50%, 0) scale(0.5, 0.5)
  60%
    opacity 0.4
    transform translate3d(-50%, -50%, 0) scale(1.1, 1.1)
  100%
    opacity 1
    transform translate3d(-50%, -50%, 0) scale(1, 1)

@keyframes hkNotifyScaleOut
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
