<template lang="pug">
.hk-slider-demo
  .hk-slider-demo-title 基本样式
  .hk-slider-demo-container
    hk-slider(
      v-model="value",
      :min="20",
      :max="50",
      title="标题",
      unit="%"
    )
  .hk-slider-demo-title 禁用
  .hk-slider-demo-container
    hk-slider(
      v-model="value",
      :min="-10",
      :max="120",
      minText="0$",
      maxText="100$",
      title="标题",
      :disabled="disabled"
    )
    hk-button(@click="toggleDisabled") 切换禁用

  .hk-slider-demo-title 加载中效果
  .hk-slider-demo-container
    hk-slider(
      v-model="value",
      :min="0",
      :max="100",
      title="标题",
      :loading="loading"
    )
    hk-button(@click="toggleLoading") 切换加载
  .hk-slider-demo-title 自定义最大最小值文字
  .hk-slider-demo-container
    hk-slider(
      v-model="value",
      :min="0",
      :max="100",
      minText="0%",
      maxText="100%",
      title="标题"
    )
  .hk-slider-demo-title 定义step 10
  .hk-slider-demo-container
    hk-slider(
      v-model="value",
      :min="0",
      :max="100",
      minText="0%",
      maxText="100%",
      :step="10",
      title="Step"
    )
  .hk-slider-demo-title step为小数
  .hk-slider-demo-container
    hk-slider(
      v-model="value2",
      :min="0",
      :max="1",
      minText="0%",
      maxText="100%",
      :step="0.01",
      title="Step"
      unit="$"
    )
  .hk-slider-demo-title 显示分割点
  .hk-slider-demo-container
    hk-slider(
      v-model="circle",
      :min="0",
      :max="5",
      :step="1",
      :circle="true"
      title="Step"
    )
  .hk-slider-demo-title 显示分割点并自定义样式
  .hk-slider-demo-container
    hk-slider(
      v-model="circle",
      :min="0",
      :max="5",
      :step="1",
      :circle="true"
      title="Step"
    )
      template(slot="circle", slot-scope="props")
        .hk-slider-demo-circle {{ props.index }}

  .hk-slider-demo-title 自定义handle样式
  .hk-slider-demo-container
    hk-slider(
      v-model="circle",
      :min="0",
      :max="5",
      :step="1",
      title="Step"
    )
      .hk-slider-demo-handle(slot="handle") 😭
</template>

<script>
export default {
  name: 'hk-slider-demo',
  data () {
    return {
      value: 30,
      disabled: true,
      loading: true,
      value2: 0,
      circle: 0
    }
  },
  methods: {
    toggleDisabled () {
      this.disabled = !this.disabled
    },
    toggleLoading () {
      this.loading = !this.loading
    }
  }
}
</script>

<style lang="stylus">
.hk-slider-demo
  text-align center
  &-title
    margin 0.5rem auto
  &-container
    margin 0.5rem 0.75rem
  .hk-button
    margin 0.5rem auto
  &-circle
    width 1rem
    height 1rem
    line-height 1rem
    background-color #08f
    border-radius 50%
    cursor pointer
    color #fff
    font-size 0.55rem
    text-align center
  &-handle
    width 1.3rem
    height 1.3rem
    line-height 1.3rem
    background-color #555
    border-radius 50%
    cursor pointer
    color #fff
    margin 0.15rem auto
    font-size 0.55rem
    text-align center
</style>
