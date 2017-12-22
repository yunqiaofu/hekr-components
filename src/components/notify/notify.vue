<template lang="pug">
.hk-notify(v-if="value")
  .hk-notify-container
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
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  z-index $zindex-base
  &-container
    max-width 13.5rem
    position absolute
    top 50%
    left 50%
    z-index 1
    transform translate(-50%, -50%)
    margin 0 auto
    border-radius 0.2rem
    background-color $color-white
    border 0.05rem solid rgba(0, 0, 0, 0.1)
    box-shadow 0 0.3rem 1rem rgba(0, 0, 0, 0.1)
    animation fade-up 0.3s
    &-body
      min-width 4rem
      padding 0.5rem 0.7rem
      font-size 0.7rem
      color #999

@keyframes fade-up
  from
    opacity 0
    transform translate(-50%, -70%)
  to
    opacity 1
    transform translate(-50%, -50%)
</style>
