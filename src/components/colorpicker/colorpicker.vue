<template lang="pug">
.hk-colorpicker
  hk-colorpicker-saturation(
    v-model="hsv",
    :disabled="disabled"
  )
  hk-colorpicker-hue(
    v-model="h"
  )
</template>

<script>
import { rgbToHsv, hsvToRgb } from './color'
import ColorpickerHue from './colorpicker-hue.vue'
import ColorpickerSaturation from './colorpicker-saturation.vue'

export default {
  name: 'hk-colorpicker',
  components: {
    'hk-colorpicker-hue': ColorpickerHue,
    'hk-colorpicker-saturation': ColorpickerSaturation
  },
  props: {
    value: {
      type: Object,
      default: () => ({ r: 0, g: 0, b: 0 })
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rgb: {
      get () {
        const r = this.value.r >= 0 && this.value.r <= 255 ? this.value.r : 0
        const g = this.value.g >= 0 && this.value.g <= 255 ? this.value.g : 0
        const b = this.value.b >= 0 && this.value.b <= 255 ? this.value.b : 0
        return { r, g, b }
      },
      set (val) {
        if (!this.disabled) {
          this.$emit('input', val)
        }
      }
    },
    hsv: {
      get () {
        return rgbToHsv(this.rgb)
      },
      set (val) {
        this.$emit('input', hsvToRgb(val))
      }
    },
    h: {
      get () {
        return this.hsv.h
      },
      set (val) {
        const hsv = this.hsv
        if (hsv.s === 0) hsv.s = 0.000001
        if (hsv.v === 0) hsv.v = 0.000001
        this.hsv = { ...hsv, h: val }
      }
    }
  }
}
</script>

<style lang="stylus">
.hk-colorpicker
  &-hue
    margin 0.5rem 0.3rem
</style>
