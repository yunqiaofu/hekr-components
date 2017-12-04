<template lang="pug">
.hk-slider-demo
  .hk-slider-demo-title 基本样式
  .hk-slider-demo-container
    hk-slider(
      v-model="value",
      :min="0",
      :max="100",
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
</template>

<script>
export default {
  name: 'hk-slider-demo',
  data () {
    return {
      value: 30,
      disabled: true,
      loading: true
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
</style>
