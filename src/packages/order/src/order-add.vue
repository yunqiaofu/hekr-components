
<template lang="pug">
  .add
    hk-header.add-header(
      :title="'预约设置'",
      @click-left="go('list')",
      :rightText="'保存'",
      @click-right="save"
    )
    .add-tag
      span 标签
      input.add-tag-input(
        placeholder="未命名",
        v-model="taskName"
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
        :class="{'add-control-active':!enable}",
        @click="enable=false"
      ) 定时关
      .add-control-btn(
        @click="enable=true",
        :class="{'add-control-active':enable}"
      ) 定时开
</template>

<script>
  const weeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  export default {
    name: 'order-add',
    props: {
      selected: {
        type: Object,
        default: () => {}
      },
      type: {
        type: String,
        default: 'add'
      },
      template: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      let myTemplate = this.selected || this.template
      return {
        myTemplate: myTemplate,
        taskName: myTemplate.taskName,
        enable: myTemplate.enable,
        week: [],
        date: {h: 1, m: 1}
      }
    },
    mounted () {
      const repeatList = this.myTemplate.date.repeatList || []
      let l = []
      for (let i = 0; i < repeatList.length; i++) {
        l.push(weeks.indexOf(repeatList[i]))
      }
      this.week = l
      this.date = {h: this.myTemplate.date.hour || 0, m: this.myTemplate.date.minute || 0}
      this.taskName = this.myTemplate.taskName
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
      },
      repeatList () {
        let l = []
        for (let i = 0; i < this.week.length; i++) {
          l.push(weeks[this.week[i]])
        }
        return l
      }
    },
    methods: {
      go (route) {
        this.$emit('go', route)
      },
      save () {
        let ob = {
          ...this.myTemplate,
          date: {
            hour: this.date.h,
            minute: this.date.m,
            repeatList: this.repeatList
          },
          taskName: this.taskName,
          enable: this.enable
        }
        this.$emit('input', ob)
        if (this.myTemplate.taskId || this.type === 'edit') {
          this.$emit('onEdit', ob)
        } else {
          this.$emit('onAdd', ob)
        }
        this.go('list')
      }
    }
  }
</script>

<style lang="stylus">
  .add
    height 100vh
    background-color #f5f5f5
    &-header
      background-color #fff
    &-tag
      background #ffffff
      height 2.2rem
      text-align left
      line-height 2.2rem
      padding-left 1rem
      border-bottom 1px solid #dedede
      margin-top 2.75rem
      &-input
        margin-left 0.5rem
        border none
        outline none
      span:first-child
        font-size 0.8rem
        color #030303
        letter-spacing -0.39px
      span:nth-child(2)
        color #cccccc
        margin-left 1rem
    &-timepick-title
      background-color #fff
      padding-left 1rem
      height 2.2rem
      line-height 2.2rem
      font-size 0.8rem
      color #030303
      text-align left
      letter-spacing -0.39px
    &-timepick
      margin-bottom 0.5rem
      padding-bottom 0.5rem
      background-color #fff
    &-control
      background #ffffff
      height 2.2rem
      line-height 2.2rem
      padding-left 1rem
      margin-top 0.5rem
      text-align left
      &-btn
        border 1px solid #cccccc
        border-radius 0.2rem
        width 2.7rem
        height 1.15rem
        float right
        text-align center
        font-size 0.6rem
        color rgba(0,0,0,0.65)
        margin 0.5rem
        line-height 1.05rem
        cursor pointer
      &-active
        border 1px solid #3aa4f7
        color #3aa4f7
</style>
