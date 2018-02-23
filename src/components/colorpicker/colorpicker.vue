<template lang="pug">
.hk-colorpicker
  hk-colorpicker-saturation(
    v-model="hsv",
    :disabled="disabled"
  )
  .hk-colorpicker-color(
    :style="bgcolor"
  )
  hk-colorpicker-hue(
    v-model="h",
    :disabled="disabled"
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
        this.rgb = hsvToRgb(val)
      }
    },
    h: {
      get () {
        return this.hsv.h
      },
      set (val) {
        this.hsv = { ...this.hsv, h: val }
      }
    },
    bgcolor () {
      const r = parseInt(this.rgb.r)
      const g = parseInt(this.rgb.g)
      const b = parseInt(this.rgb.b)

      return {
        'background-color': `rgb(${r},${g},${b})`
      }
    }
  }
}
</script>

<style lang="stylus">
.hk-colorpicker
  &-color
    width 1rem
    height 1rem
    margin 0.5rem 0.4rem
    border-radius 50%
    box-shadow 0 0 0 1px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4)
  &-hue
    margin -1.2rem 0.4rem 0.7rem 2rem
</style>
