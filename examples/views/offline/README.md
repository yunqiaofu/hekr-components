# hk-offline

## 调用方式
1. 在模板中使用hk-offline调用
2. this.$offline的方式调用即可

## 函数方式调用
1. 直接传字符串，这种情况会直接把传递的参数作为提示文字展示出来
```javascript
this.$offline('提示文字')
```
2. 传入对象的方式调用
```javascript
this.$offline({ ... })
```
### 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| icon | 显示图标 | string | - | hk-icons-offline |
| text | 提示内容文字 | string | - | - |
| closeabled | 是否可点击中心文字图标关闭 | boolean | - | false |


## 组件调用方式
### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| value | 绑定值，控制显示隐藏 | boolean | - | false |
| icon | 显示图标 | string | - | hk-icons-offline |
| text | 提示内容文字 | string | - | - |
| closeabled | 是否可点击中心文字图标关闭 | boolean | - | false |

### Slot

| name | 说明|
| --- | --- |
| - | 提示区域的内容 |
