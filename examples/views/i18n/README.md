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
import hekrComponents, { i18n } from '@hekr/hekr-components'
// 使用自定义语言
i18n.extend = {
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
  .hk-dialog-demo-title 属性上也挂在有{{ this.lang.demo.title }}
  .hk-dialog-demo-title 推荐使用方式{{ $i('demo.title') }}
  hk-button(@click) 切换语言
</template>

<script>
export default {
  name: 'hk-dialog-demo',
  methods: {
    click () {
      if (this.$i18n.lang === 'zh-CN') {
        this.$i18n.use('en-US')
      } else {
        this.$i18n.use('zh-CN')
      }
    }
  }
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
1. 语言包对应的键值必须和语言包中的语言键值形式一致，如`zh-CN`可写为`zh_CN`、`zh_cn`或者`zh-cn`
2. 扩展语言时，可以不把语言包写全，例如扩展中文，则已经内置的一些可以不用再写一次，扩展时会采用合并的策略，写出来的会覆盖原有的方式进行
3. ~~由于在语言包给组件混入了`lang`属性，所以在组件中不应再定义该属性~~未来会被废弃
4. Vue原型上挂在了`$i18n`和`$i`两个对象，其中`$i18n`是语言配置类对象，`$i`可快速通过`$i('dialog.title')`的形式拿到对应的语言，且操作是安全的，即如没有dialog属性也不会报错
