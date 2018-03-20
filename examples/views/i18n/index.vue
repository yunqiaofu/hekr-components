<template lang="pug">
.hk-i18n-demo
  .hk-i18n-demo-title 语言包
  hk-button(@click="click") 切换语言
  div 当前语言：{{ this.$i18n.lang }}
  div props默认文本不能改变，因为只会求值一次
  br
  div  propTest： {{ propTest }}
  br
  div 可改为 {{ propTest2 || $i('i18n.test') }}
  div 或其他会重新求值的方式
  br
  div {{ $i('i18n.test') }}
  div 计算属性: {{ getTest }}
  div 未定义的属性: {{ $i('i18n.test2') }}
  div 属性为false: {{ $i('i18n.false') }}
</template>

<script>
export default {
  name: 'hek-i18n-demo',
  props: {
    propTest: {
      type: String,
      default () {
        return this.$i('i18n.test')
      }
    },
    propTest2: {
      type: String
    }
  },
  computed: {
    getTest () {
      return this.$i('i18n.test')
    }
  },
  methods: {
    click () {
      if (this.$i18n.lang === 'zh-CN') {
        this.$i18n.use('en-US')
      } else {
        this.$i18n.use('zh-CN')
      }
      console.log(this.propTest)
    }
  }
}
</script>

<style lang="stylus">
.hk-i18n-demo
  text-align center
  &-title
    font-size 1rem
    font-weight 600;
</style>

