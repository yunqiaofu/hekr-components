<template lang="pug">
.hk-timing-list-item(@click.stop="itemClick")
  i.hk-timing-list-item-left-icon(
    v-show="isEdit",
    :class="getLeftDeleteIcon",
    @click.stop="isDelete=true"
  )
  .hk-timing-list-item-left(:class="getEditIcon")
    .hk-timing-list-item-left-time {{ time }}
    .hk-timing-list-item-left-day {{ days }}
    .hk-timing-list-item-left-name {{ data.taskName }}
  .hk-timing-list-item-right(
    :class="getRightDeleteIcon",
    @click="check"
  )
    span(
      v-for="item in options",
      v-if="data.code[item.argument] !== undefined"
    ) {{ getLabel(item) }}
    i.hk-timing-list-item-right-icon(
      :class="getIcon"
    )
  .hk-timing-list-item-delete(
    :class="getRemoveIcon",
    @click.stop="remove"
  )
    i.hk-icons-delete-device

</template>

<script>
import find from 'lodash/find'

export default {
  name: 'hk-timing-list-item',
  props: {
    task: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      data: { ...this.task } || {},
      isDelete: false
    }
  },
  computed: {
    getIcon () {
      return {
        'hk-timing-list-item-right-icon-disable': !this.data.enable || this.data.expired,
        'hk-icons-check-checked': !this.isEdit,
        'hk-icons-angle-right': this.isEdit
      }
    },
    getLeftDeleteIcon () {
      return {
        'hk-icons-delete-simple': !this.isDelete,
        'hk-timing-list-item-left-icon-delete': this.isDelete
      }
    },
    getEditIcon () {
      return {
        'hk-timing-list-item-left-edit': this.isEdit && !this.isDelete
      }
    },
    getRightDeleteIcon () {
      return {
        'hk-timing-list-item-right-delete': this.isDelete
      }
    },
    getRemoveIcon () {
      return {
        'hk-timing-list-item-delete-active': this.isDelete && this.isEdit
      }
    },
    time () {
      return this.format(this.data.date.hour, 2) + ':' + this.format(this.data.date.minute, 2)
    },
    days () {
      const weeks = {
        SUN: this.$i('week.SUN'),
        MON: this.$i('week.MON'),
        TUE: this.$i('week.TUE'),
        WED: this.$i('week.WED'),
        THU: this.$i('week.THU'),
        FRI: this.$i('week.FRI'),
        SAT: this.$i('week.SAT')
      }
      const repeatList = this.data.date.repeatList || []
      let days = ''
      for (let j = 0; j < repeatList.length; j++) {
        days = days + weeks[repeatList[j]] + ' '
      }
      return days
    }
  },
  watch: {
    task: {
      deep: true,
      handler (val) {
        this.data = { ...val }
      }
    },
    isEdit (val) {
      if (!val) {
        this.isDelete = false
      }
    }
  },
  activated () {
    this.isDelete = false
  },
  methods: {
    getLabel (item) {
      const value = this.data.code[item.argument]
      if (item.maps) {
        return (find(item.maps, item => item.value === value) || {}).name
      } else {
        return item.label + value + item.unit
      }
    },
    format (val, length) {
      val = val.toString()
      while (val.length < length) {
        val = `0${val}`
      }
      return val
    },
    itemClick () {
      if (!this.isDelete && this.isEdit) {
        this.$emit('edit')
      }
      this.isDelete = false
    },
    check () {
      if (this.isEdit) {
        return
      }
      this.$emit('check')
    },
    remove () {
      this.isDelete = false
      this.$emit('remove')
    }
  }
}
</script>

<style lang="stylus">
.hk-timing-list-item
  height 4rem
  padding 0.5rem 1rem
  animation hkSlideRight .5s
  transition all 0.5s ease-in-out
  background-color #ffffff
  overflow hidden
  display flex
  position relative
  &:not(:last-child)
    border-bottom 0.05rem solid #ccc
  .hk-icons-angle-right
    color #b2b2b2
  &-left-icon
    position absolute
    left 0.8rem
    font-size 1.5rem
    height 4rem
    line-height 3rem
    color #f15151
    transition all 0.2s ease-in-out
    &-delete
      transform translateX(-2.5rem)
  &-left-edit
    padding-left 2.5rem
  &-left
    text-align left
    transition all 0.1s ease-in-out
    width 50%
    &-time
      font-size 1rem
      line-height 1.25rem
      color #333
    &-day,
    &-name
      height 0.85rem
      line-height 0.85rem
      font-size 0.6rem
      color #999
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
  &-right
    font-size 0.8rem
    color #a4a4a4
    line-height 3rem
    width 50%
    transition all 0.1s ease-in-out
    position relative
    padding-right 1.3rem
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    &-delete
      padding-right 2.6rem
    &-icon
      font-size 1.2rem
      margin-left 0.5rem
      vertical-align middle
      color #0096fb
      position absolute
      right 0
      top 50%
      transform translateY(-50%)
      &-disable
        color #efefef
  &-delete
    background-color #f15151
    position absolute
    transition all 0.1s ease-in-out
    right -3.5rem
    top 0
    height 3.95rem
    line-height 3.9rem
    opacity 0
    &-active
      right 0
      opacity 1
      width 3.5rem
      text-align center
    i
      line-height 3.9rem
      color #fff
      font-size 1.5rem

@keyframes hkSlideRight
  0%
    opacity 0
    transform translateX(-100%)
  60%
    opacity 0
    transform translateX(-100%)
  100%
    opacity 1
    transform translateX(0)
</style>
