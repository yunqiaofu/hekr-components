
<template lang="pug">
  .add
    hk-header(
      :title="'预约设置'",
      @click-left="go('list')",
      :rightText="'保存'",
      @click-right="save"
    )
    .add-tag
      span 标签
      input.add-tag-input(
        placeholder="未命名",
        v-model="name"
      )
    .add-timepick-title 时间
    .add-timepick
      hk-timepicker(
        v-model="date",
        :type="'hh:mm'",
        :needTitle="false"
      )
    hk-week(
      v-model="week"
    )
    .add-control 开 / 关
      .add-control-btn(
        :class="{'add-control-active':!checked}",
        @click="checked=false"
      ) 定时关
      .add-control-btn(
        @click="checked=true",
        :class="{'add-control-active':checked}"
      ) 定时开
</template>

<script>
  export default {
    name: 'order-add',
    data () {
      return {
        date: {h: 2, m: 3},
        week: [],
        name: '',
        checked: true
      }
    },
    computed: {
      hour () {
        let hour = []
        for (let i = 0; i < 24; i++) {
          hour.push(i)
        }
        return hour
      },
      min () {
        let min = []
        for (let i = 0; i < 60; i++) {
          min.push(i)
        }
        return min
      }
    },
    methods: {
      go (route) {
        this.$emit('go', route)
      },
      save () {
        let ob = {
          date: this.date,
          week: this.week,
          name: this.name,
          checked: this.checked
        }
        this.$emit('add', ob)
        this.$emit('input', ob)
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/variables.styl"
  .add
    height 100vh
    background-color #f5f5f5
    &-tag
      background #ffffff
      height 44px
      text-align left
      line-height 44px
      padding-left 20px
      border-bottom 1px solid #dedede
      margin-top 10px
      &-input
        margin-left 10px
      span:first-child
        font-size 16px
        color #030303
        letter-spacing -0.39px
      span:nth-child(2)
        color #cccccc
        margin-left 20px
    &-timepick-title
      background-color #fff
      padding-left 20px
      height 44px
      line-height 44px
      font-size 16px
      color #030303
      text-align left
      letter-spacing -0.39px
    &-timepick
      margin-bottom 10px
      padding-bottom 10px
      background-color #fff
    &-control
      background #ffffff
      height 44px
      line-height 44px
      padding-left 20px
      margin-top 10px
      text-align left
      &-btn
        border 1px solid #cccccc
        border-radius 4px
        width 54px
        height 23px
        float right
        text-align center
        font-size 12px
        color rgba(0,0,0,0.65)
        margin 10px
        line-height 21px
        cursor pointer
      &-active
        border 1px solid #3aa4f7
        color #3aa4f7
</style>
