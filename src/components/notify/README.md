# hk-notify

## 调用方式
1. 在模板中使用hk-notify调用
2. this.$notify的方式调用即可

## 函数方式调用
1. 种直接传字符串，这种情况会直接把传递的参数作为提示文字展示出来
```javascript
this.$confirm('提示信息')
```
2. 传入对象的方式调用
```javascript
this.$confirm({ ... })
```
### 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| showMask | 控制显示背景遮罩 | boolean | - | true |
| maskClickDisabled | 控制显示背景遮罩点击事件 | boolean | - | false |
| notify | 提示内容文字 | string | - | - |
| delay | 自动关闭延时时长(ms) | number | - | 3000 |
| align | 文字对齐方式 | string | left/center/right | left |
| closeabled | 是否可点击关闭 | boolean | - | true |

### 返回值
返回值是一个函数，可以用来关闭当前提示


## 组件调用方式
### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| value | 绑定值，控制显示隐藏 | boolean | - | false |
| showMask | 控制显示背景遮罩 | boolean | - | true |
| maskClickDisabled | 控制显示背景遮罩点击事件 | boolean | - | false |
| notify | 提示内容文字 | string | - | - |
| delay | 自动关闭延时时长(ms) | number | - | 3000 |
| align | 文字对齐方式 | string | left/center/right | left |
| closeabled | 是否可点击关闭 | boolean | - | true |