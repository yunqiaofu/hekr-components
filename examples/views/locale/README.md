# 语言包

## 调用方式
* 使用内置语言
```javascript
import hekrComponents from '@hekr/hekr-components'
// 使用内置的中文
Vue.use(hekrComponents, {
  lang: 'zh-CN'
})
```
* 扩展语言
```javascript
import hekrComponents, { locale } from '@hekr/hekr-components'
// 使用自定义语言
locale.extend = {
  'fr': {/** 语言配置 */},
  'zh-TW': { },
  'zh-CN': {
    demo: {
      title: '示例文字'
    },
    /** 递归合并的方式进行语言替换 */
    dialog: {
      comfirmText: '确定',
      cancelText: '确定'
    }
}

Vue.use(hekrComponents, {
  lang: 'fr'
})
```
* 组件中使用语言包
```html
<template lang="pug">
.hk-dialog-demo
  .hk-dialog-demo-title {{ this.lang.demo.title }}
</template>

<script>
export default {
  name: 'hk-dialog-demo'
}
</script>

<style lang="stylus">
.hk-dialog-demo
  text-align center
</style>
```

## 内置语言
内置了中文（`zh-CN`）和英文（`en-US`）两种语言

## 注意事项
1. 语言包对应的键值必须和定义的相同，如`zh-CN`不能写为`zhCN`或者`zh-cn`
2. 扩展语言时，可以不把语言包写全，例如扩展中文，则已经内置的一些可以不用再写一次，扩展时会采用合并的策略，写出来的会覆盖原有的方式进行
3. 由于在语言包给组件混入了`lang`属性，所以在组件中不应再定义该属性
