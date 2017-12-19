
<template lang="pug">
  .hk-add
    hk-header.hk-add-header(
      :title="'预约设置'",
      @click-left="go('list')",
      :rightText="'保存'",
      @click-right="save"
    )
    .hk-add-tag
      span 标签
      input.hk-add-tag-input(
        placeholder="未命名",
        v-model="taskName"
      )
    .hk-add-timepick-title 时间
    .hk-add-timepick
      hk-timepicker(
        v-model="date",
        :type="'hh:mm'",
        :needTitle="false"
      )
    hk-week(
      v-model="week"
    )
    .hk-add-control(
      v-for="item in options",
      :key="item.argument"
    ) {{item.label}}
      .hk-add-control-btn(
        v-for="i,k in item.maps",
        :key="k",
        :class="{'hk-add-control-active':code[item.argument]===i.value}",
        @click="click(item.argument, i.value)"
      ) {{i.name}}
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
      },
      options: {
        type: Array,
        default: () => []
      }
    },
    data () {
      let myTemplate = this.selected || this.template
      return {
        myTemplate: myTemplate,
        taskName: myTemplate.taskName,
        enable: myTemplate.enable,
        week: [],
        date: {h: 1, m: 1},
        code: {}
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
      this.code = this.myTemplate.code
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
    watch: {
    },
    methods: {
      go (route) {
        this.$emit('go', route)
      },
      click (argument, value) {
        this.code[argument] = value
        this.code = {
          ...this.code
        }
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
          code: this.code
        }
        this.$emit('input', ob)
        if (this.myTemplate.taskId || this.type === 'edit') {
          this.$emit('onEdit', ob)
        } else {
          ob.enable = true // 新增默认可用
          this.$emit('onAdd', ob)
        }
        this.go('list')
      }
    }
  }
</script>

<style lang="stylus">
  .hk-add
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
