# hk-loading

## 调用方式
1. 在模板中使用hk-loading调用
2. this.$loading的方式调用即可

## 函数方式调用
1. 直接传递参数trur/fasle控制显示隐藏
```javascript
this.$loading(true) // 显示
this.$loading(false) // 隐藏
```
2. 传入对象的方式调用
```javascript
this.$confirm({
  show: true,
  text: '加载中...'
})
```
3. 传入文字的方式调用
```javascript
this.$confirm('加载中...')
```
### 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| show | 控制显示隐藏 | boolean | - | - |
| text | 加载提示文字 | string | - | - |

## 组件调用方式
### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| value | 绑定值，控制显示隐藏 | boolean | - | false |
| text | 加载提示文字 | string | - | - |

### Slot

| name | 说明|
| --- | --- |
| - | 加载显示区域内容 |
