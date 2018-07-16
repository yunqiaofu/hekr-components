<template lang="pug">
.hk-picker-demo
  h3 显示文字
  hk-picker(
    v-model="val2"
    :length="34"
    :format="format2"
  )
  h3 单个示例
  hk-picker(v-model="time")
  h3 自定义显示
  hk-picker(
    v-model="val"
    :length="4"
    :format="format"
  )
</template>

<script>
export default {
  name: 'hk-picker-demo',
  data () {
    return {
      val: 1,
      val2: 1,
      time: 10,
      province: [
        '北京',
        '广东',
        '上海',
        '天津',
        '重庆',
        '辽宁',
        '江苏',
        '湖北',
        '四川',
        '陕西',
        '河北',
        '山西',
        '河南',
        '吉林',
        '黑龙江',
        '内蒙古',
        '山东',
        '安徽',
        '浙江',
        '福建',
        '湖南',
        '广西',
        '江西',
        '贵州',
        '云南',
        '西藏',
        '海南',
        '甘肃',
        '宁夏',
        '青海',
        '新疆',
        '香港',
        '澳门',
        '台湾'
      ]
    }
  },
  methods: {
    format (val) {
      return val * 15
    },
    format2 (val) {
      return this.province[val]
    }
  }
}
</script>

<style lang="stylus">
.hk-picker-demo
  margin-top 60px
  text-align center
  font-size 17px
  h3
    margin 1rem auto
    padding 0.5rem
    box-shadow 0 0 0.5rem #ccc
</style>


