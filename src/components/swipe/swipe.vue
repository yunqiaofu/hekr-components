<template lang="pug">
.hk-swipe(
  @touchstart.prevent="dragstart",
  @touchmove.prevent="dragging",
  @touchend.prevent="dragend",
  @mousedown="dragstart"
)
  .hk-swipe-container
    slot
  ul.hk-swipe-indicators(v-if="indicator")
    li.hk-swipe-indicators-item(
      v-for="(item, index) in items",
      :key="index",
      :class="getIndicatorsClass(index)"
    )
</template>

<script>
export default {
  name: 'hk-swipe',
  props: {
    defaultIndex: {
      type: Number,
      default: 0
    },
    auto: { // 设置为0就不轮播
      type: Number,
      default: 3000
    },
    speed: { // 动画时间
      type: Number,
      default: 300
    },
    indicator: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      items: [],
      index: this.defaultIndex,
      updateChildrenTimer: null,
      autoplayTimer: null,
      // 不允许拖拽
      noDrag: true,
      isDragging: false,
      // 自动轮播
      oX: 0,
      animateTimer1: null,
      animateTimer2: null
    }
  },
  mounted () {
    this.updateChildren()
    this.autoplay()
    document.addEventListener('mousemove', this.dragging)
    document.addEventListener('mouseup', this.dragend)
  },
  destroyed () {
    clearTimeout(this.updateChildrenTimer)
    clearTimeout(this.autoplayTimer)
    clearTimeout(this.animateTimer1)
    clearTimeout(this.animateTimer2)
    document.removeEventListener('mousemove', this.dragging)
    document.removeEventListener('mouseup', this.dragend)
  },
  watch: {
    auto () {
      this.autoplay()
    },
    index () {
      this.$emit('change', this.index)
    }
  },
  methods: {
    addSwipeItem (item) {
      clearTimeout(this.updateChildrenTimer)
      this.updateChildrenTimer = setTimeout(() => {
        this.updateChildren()
      }, 50)
    },
    delSwipeItem (item) {
      clearTimeout(this.updateChildrenTimer)
      this.updateChildrenTimer = setTimeout(() => {
        this.updateChildren()
      }, 50)
    },
    updateChildren () {
      this.items = this.$children.filter((item, index) => {
        item.active = false
        item.speed = this.speed
        item.offset = 0
        item.show = false
        item.animate = false
        if (this.index === index) {
          item.active = true
        }
        return item.$options.name === 'hk-swipe-item'
      })
      this.noDrag = this.$children.length <= 1
    },
    autoplay () {
      clearTimeout(this.autoplayTimer)
      if (!this.auto) {
        return
      }
      this.autoplayTimer = setTimeout(() => {
        let index = this.index + 1
        if (index > this.$children.length - 1) {
          index = 0
        }
        this.animate(-this.$el.offsetWidth, () => {
          this.index = index
          this.updateChildren()
          this.autoplay()
        })
      }, this.auto)
    },
    animate (offset, callback) {
      clearTimeout(this.animateTimer1)
      if (this.$children.length < 2 || this.isDragging) {
        return
      }
      this.$children.forEach(item => {
        item.show = false
        item.animate = false
      })
      const next = this.$children[this.index + 1] || this.$children[0]
      const prev = this.$children[this.index - 1] || this.$children[this.$children.length - 1]
      this.$children[this.index].show = true
      this.$children[this.index].offset = 0
      if (offset >= 0) {
        prev.show = true
        prev.offset = -offset
      } else {
        next.show = true
        next.offset = -offset
      }
      this.animateTimer1 = setTimeout(() => {
        clearTimeout(this.animateTimer2)
        if (this.isDragging) {
          return
        }
        this.$children[this.index].show = true
        this.$children[this.index].animate = true
        this.$children[this.index].offset = offset
        if (offset >= 0) {
          prev.animate = true
          prev.offset = 0
          prev.show = true
        } else {
          next.animate = true
          next.offset = 0
          next.show = true
        }
        this.animateTimer2 = setTimeout(() => {
          if (this.isDragging) {
            return
          }
          if (typeof callback === 'function') {
            callback()
          }
        }, this.speed)
      }, 30)
    },
    translate (offset) {
      if (this.$children.length < 2) {
        return
      }
      this.$children.forEach(item => {
        item.show = false
        item.animate = false
      })
      const next = this.$children[this.index + 1] || this.$children[0]
      const prev = this.$children[this.index - 1] || this.$children[this.$children.length - 1]
      this.$children[this.index].show = true
      this.$children[this.index].offset = offset
      if (offset >= 0) {
        prev.show = true
        prev.offset = -this.$el.offsetWidth + offset
      } else {
        next.show = true
        next.offset = this.$el.offsetWidth + offset
      }
    },
    getX (e) {
      if (e.type.indexOf('mouse') !== -1) {
        return e.clientX
      } else {
        return e.changedTouches[0].clientX
      }
    },
    dragstart (e) {
      if (this.noDrag) {
        return
      }
      clearTimeout(this.autoplayTimer)
      this.isDragging = true
      this.oX = this.getX(e)
    },
    dragging (e) {
      if (this.noDrag || !this.isDragging) {
        return
      }
      let offset = this.getX(e) - this.oX
      // 不能连续滑动几个
      if (this.$el.offsetWidth < Math.abs(offset)) {
        offset = Math.abs(offset) / offset * this.$el.offsetWidth
      }
      this.translate(offset)
    },
    dragend (e) {
      if (this.noDrag || !this.isDragging) {
        return
      }
      let offset = this.getX(e) - this.oX
      if (!offset) {
        this.isDragging = false
        this.oX = 0
        return
      }
      // 不能连续滑动几个
      if (this.$el.offsetWidth < Math.abs(offset)) {
        offset = Math.abs(offset) / offset * this.$el.offsetWidth
      }
      if (Math.abs(offset) > this.$el.offsetWidth / 2) {
        let index = this.index - Math.abs(offset) / offset
        if (index > this.$children.length - 1) {
          index = 0
        }
        if (index < 0) {
          index = this.$children.length - 1
        }
        this.switchIndex(offset, () => {
          this.index = index
          this.updateChildren()
          this.autoplay()
        })
      } else {
        this.dragAnimate(offset, () => {
          this.updateChildren()
          this.autoplay()
        })
      }
      this.isDragging = false
      this.oX = 0
    },
    switchIndex (offset, callback) {
      clearTimeout(this.animateTimer1)
      this.$children.forEach(item => {
        item.show = false
        item.animate = false
      })
      const next = this.$children[this.index + 1] || this.$children[0]
      const prev = this.$children[this.index - 1] || this.$children[this.$children.length - 1]
      this.$children[this.index].show = true
      this.$children[this.index].offset = offset

      if (offset >= 0) {
        prev.show = true
        prev.offset = -this.$el.offsetWidth + offset
      } else {
        next.show = true
        next.offset = this.$el.offsetWidth + offset
      }

      offset = this.$el.offsetWidth * Math.abs(offset) / offset
      this.animateTimer1 = setTimeout(() => {
        clearTimeout(this.animateTimer2)
        this.$children[this.index].animate = true
        this.$children[this.index].offset = offset
        if (offset >= 0) {
          prev.show = true
          prev.animate = true
          prev.offset = 0
        } else {
          next.show = true
          next.animate = true
          next.offset = 0
        }
        this.animateTimer2 = setTimeout(() => {
          if (typeof callback === 'function') {
            callback()
          }
        }, this.speed)
      }, 30)
    },
    dragAnimate (offset, callback) {
      clearTimeout(this.animateTimer1)
      this.$children.forEach(item => {
        item.show = false
        item.animate = false
      })
      const next = this.$children[this.index + 1] || this.$children[0]
      const prev = this.$children[this.index - 1] || this.$children[this.$children.length - 1]
      this.$children[this.index].show = true
      this.$children[this.index].offset = offset

      if (offset >= 0) {
        prev.show = true
        prev.offset = -this.$el.offsetWidth + offset
      } else {
        next.show = true
        next.offset = this.$el.offsetWidth + offset
      }

      offset = this.$el.offsetWidth * Math.abs(offset) / offset
      this.animateTimer1 = setTimeout(() => {
        clearTimeout(this.animateTimer2)
        this.$children[this.index].animate = true
        this.$children[this.index].offset = 0
        if (offset >= 0) {
          prev.show = true
          prev.animate = true
          prev.offset = -offset
        } else {
          next.show = true
          next.animate = true
          next.offset = -offset
        }
        this.animateTimer2 = setTimeout(() => {
          if (typeof callback === 'function') {
            callback()
          }
        }, this.speed)
      }, 30)
    },
    getIndicatorsClass (index) {
      return {
        'hk-swipe-indicators-item-active': this.index === index
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"
.hk-swipe
  position relative
  overflow-x hidden
  &-container
    height 15rem
    text-align center
  &-indicators
    position absolute
    bottom 0.6rem
    left 50%
    transform translateX(-50%)
    list-style none
    z-index $zindex-higher
    &-item
      width 0.35rem
      height 0.35rem
      display inline-block
      margin 0 0.15rem
      background-color #000
      border-radius 50%
      opacity 0.3
      &&-active
        opacity 1
        background-color #fff
</style>
