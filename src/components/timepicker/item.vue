<template  lang="pug">
  .hk-select-item(
    @touchstart.prevent="itemTouchStart",
    @touchmove.prevent="itemTouchMove",
    @touchend.prevent="itemTouchEnd",
    @mousedown.stop="itemTouchStart",
    @mousemove.stop="itemTouchMove",
    @mouseup.stop="itemTouchEnd",
    @mouseleave.stop="itemTouchEnd"
  )
    .hk-select-line
      slot(name="unit")
    .hk-select-list(
      style="opacity: 0"
    )
      .hk-select-ul(
        ref="list",
        style="display: none"
      )
        .hk-select-list-item(
          v-for="el,index in renderData",
          :class="{'hidden':setHidden(el.index)}",
          :key="index"
        ) {{el.value}}
    .hk-select-wheel(ref="wheel")
      .hk-select-wheel-item(
        v-for="el,index in renderData ",
        :class="{'hidden':setHidden(el.index)}",
        :style="setWheelItemDeg(el.index)",
        :index="el.index",
        :key="index"
      ) {{el.value}}
</template>
<script>
  export default{
    name: 'hk-time-item',
    props: {
      listData: {
        type: Array,
        required: true
      },
      type: {
        type: String,
        default: 'line'
      },
      unit: {
        type: String
      },
      value: {}
    },
    data () {
      return {
        spin: {start: -9, end: 9, branch: 9},
        finger: {startY: 0, lastY: 0, startTime: 0, lastTime: 0, transformY: 0},
        start: false,
        selected: this.value
      }
    },
    computed: {
      renderData () {
        let temp = []
        for (let k = this.spin.start; k <= this.spin.end; k++) {
          let data = {
            value: this.getSpinData(k),
            index: k
          }
          temp.push(data)
        }
        return temp
      }
    },
    mounted () {
      /* 初始化状态 */
      let index = this.listData.indexOf(this.value)
      if (index === -1) {
        this.setListTransform()
        this.getPickValue(0)
      } else {
        let move = index * 34
        /* 因为往上滑动所以是负 */
        this.setStyle(-move)
        this.setListTransform(-move, -move)
      }
    },
    activated () {
      setTimeout(() => {
        this.spin = {start: -9, end: 9, branch: 9}
        this.finger = {startY: 0, lastY: 0, startTime: 0, lastTime: 0, transformY: 0}
        this.selected = this.value
        let index = this.listData.indexOf(this.value)
        if (index === -1) {
          this.setListTransform()
          this.getPickValue(0)
        } else {
          let move = index * 34
          /* 因为往上滑动所以是负 */
          this.setStyle(-move)
          this.setListTransform(-move, -move)
        }
      }, 200)
    },
    methods: {
      /* 根据type 控制滚轮显示效果 */
      setHidden (index) {
        if (this.type === 'line') {
          return index < 0 || index > this.listData.length - 1
        } else {
          return false
        }
      },
      setWheelItemDeg (index) {
        let count = index % this.listData.length
        if (count < 0) {
          count = this.listData.length + count
        }
        return {
          transform: `rotate3d(1, 0, 0, ${-index * 20 % 360}deg) translate3d(0rem, 0rem, 5rem)`,
          color: this.selected === this.listData[count] ? '#000' : null
        }
      },
      setWheelDeg (updateDeg, type, time = 1000) {
        if (type === 'end') {
          this.$refs.wheel.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`
          this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`
        } else {
          this.$refs.wheel.style.webkitTransition = ''
          this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`
        }
      },
      setListTransform (translateY = 0, marginTop = 0, type, time = 1000) {
        if (type === 'end') {
          this.$refs.list.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`
          this.$refs.list.style.webkitTransform = `translateY(${(translateY - this.spin.branch * 34) / 20}rem)`
          this.$refs.list.style.marginTop = `${-marginTop / 20}rem`
          this.$refs.list.setAttribute('scroll', translateY)
        } else {
          this.$refs.list.style.webkitTransition = ''
          this.$refs.list.style.webkitTransform = `translateY(${(translateY - this.spin.branch * 34) / 20}rem)`
          this.$refs.list.style.marginTop = `${-marginTop / 20}rem`
          this.$refs.list.setAttribute('scroll', translateY)
        }
      },
      itemTouchStart (event) {
        this.start = true
        let finger
        if (event.changedTouches) {
          finger = event.changedTouches[0]
        } else {
          finger = event
        }
        this.finger.startY = finger.pageY
        this.finger.startTime = event.timestamp || Date.now()
        this.finger.transformY = this.$refs.list.getAttribute('scroll')
      },
      itemTouchMove (event) {
        if (!this.start) {
          return
        }
        let finger
        if (event.changedTouches) {
          finger = event.changedTouches[0]
        } else {
          finger = event
        }
        this.finger.lastY = finger.pageY
        this.finger.lastTime = event.timestamp || Date.now()
        /* 设置css */
        let move = this.finger.lastY - this.finger.startY
        this.setStyle(move)
      },
      itemTouchEnd (event) {
        if (!this.start) {
          return
        }
        this.start = false
        let finger
        if (event.changedTouches) {
          finger = event.changedTouches[0]
        } else {
          finger = event
        }
        this.finger.lastY = finger.pageY
        this.finger.lastTime = event.timestamp || Date.now()
        let move = this.finger.lastY - this.finger.startY
        /* 计算速度 */
        /* 速度计算说明
         * 当时间小于300毫秒 最后的移动距离等于 move + 减速运动距离
         * */
        let time = this.finger.lastTime - this.finger.startTime
        let v = move / time
        /* 减速加速度a */
        let a = 1.8
        /* 设置css */
        if (time <= 300) {
          move = v * a * time
          time = 1000 + time * a
          this.setStyle(move, 'end', time)
        } else {
          this.setStyle(move, 'end')
        }
      },
      /* 设置css */
      setStyle (move, type, time) {
        const singleHeight = 34
        const deg = 20
        const singleDeg = deg / singleHeight
        let currentListMove = this.finger.transformY
        let updateMove = move + Number(currentListMove)
        /* 根据滚轮类型 line or cycle 判断 updateMove最大距离 */
        if (this.type === 'line') {
          if (updateMove > 0) {
            updateMove = 0
          }
          if (updateMove < -(this.listData.length - 1) * singleHeight) {
            updateMove = -(this.listData.length - 1) * singleHeight
          }
        }
        let updateDeg = -updateMove * singleDeg
        let spinAim = Math.round(updateDeg / 20)
        let margin = Math.round(updateMove / singleHeight) * singleHeight // 如果不这么写 会导致没有滚动效果
        /* 计算touchEnd移动的整数距离 */
        let endMove = margin
        let endDeg = Math.round(updateDeg / deg) * deg
        if (type === 'end') {
          this.setListTransform(endMove, margin, type, time)
          this.setWheelDeg(endDeg, type, time)
          /* 设置$emit 延迟 */
          setTimeout(() => this.getPickValue(endMove), 300)
        } else {
          this.setListTransform(updateMove, margin)
          this.setWheelDeg(updateDeg)
        }
        this.updateSpin(spinAim)
      },
      /* 更新spin */
      updateSpin (spinAim) {
        this.spin.start = this.spin.branch * -1 + spinAim
        this.spin.end = this.spin.start + this.spin.branch * 2
      },
      /* 获取spin 数据 */
      getSpinData (index) {
        index = index % this.listData.length
        return this.listData[index >= 0 ? index : index + this.listData.length]
      },
      /* 获取选中值 */
      getPickValue (move) {
        let index = move / 34 % this.listData.length
        let pickValue = this.listData[index <= 0 ? -index : this.listData.length - index]
        this.selected = pickValue
        this.$emit('input', pickValue)
        this.$emit('onChange', pickValue)
      }
    }
  }
</script>
<style lang="stylus">
  $color-background = #fff
  $color-checked = #2c97f1
  $color-text-main = #333
  $color-text-second = #a8a8a8
  .hk
    &-select
      &-item
        overflow hidden
        width 100%
        text-align center
        height 8rem
        background $color-background
        position relative
      &-ul
        position relative
      &-line, &-list, &-wheel
        position absolute
        left 0
        right 0
        top 3.15rem
      &-line
        z-index 3
      &-list
        z-index 2
        background $color-background
      &-wheel
        z-index 1
      &-line
        border-bottom solid 0.05rem #DEDEDE
        border-top solid 0.05rem #DEDEDE
        line-height 1.7rem
        font-size 0.6rem
        color #333333
      &-line, &-list
        height 1.7rem
        transform translate3d(0rem, 0rem, 5.5rem)
      &-list
        overflow hidden
      &-list-item
        text-shadow 0 0.05rem 0.05rem rgba(102, 102, 102, 0.6)
      &-list-item-span
        color #333333
        font-size 0.65rem
        margin-left 0.5rem
      &-list-item, &-wheel-item
        white-space nowrap
        overflow hidden
        /*text-overflow ellipsis*/
        line-height 1.7rem
        font-size 0.9rem
        color $color-text-main
        &.hidden
          visibility hidden
          opacity 0
      &-wheel
        transform-style preserve-3d
        height 1.7rem
        &-item
          backface-visibility hidden
          position absolute
          top 0
          width 100%
          color $color-text-second
</style>
