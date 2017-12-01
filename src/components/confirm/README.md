# hk-confirm

## 调用方式

该组件为函数调用方式，加载组件之后直接用this.$confirm的方式调用即可

## 参数传递方式
1. 种直接传字符串，这种情况会直接把传递的参数作为对话框body部分的数据展示出来
```javascript
this.$confirm('提示信息')
  .then(() => {
    // 确定按钮点击
  }, () => {
    // 取消按钮点击
  })
```
2. 传入对象的方式调用
```javascript
this.$confirm({ ... })
  .then(() => {
    // 确定按钮点击
  }).catch(() => {
    // 取消按钮点击
  })
```
### 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| showMask | 控制显示背景遮罩 | boolean | - | true |
| maskClickDisabled | 控制显示背景遮罩点击事件 | boolean | - | false |
| title | 对话框标题 | string | - | - |
| text | 对话框内容文字 | string | - | - |
| bodyTextAlign | 对话框body部分文字对齐方式 | string | left/center/right | left |
| showCancel | 控制显示取消按钮 | boolean | - | true |
| cancelText | 取消按钮文字 | string | - | 取消 |
| showConfirm | 控制显示确定按钮 | boolean | - | true |
| confirmText | 确定按钮文字 | string | - | 确定 |

## 返回值
返回值是一个经过封装的Promise对象，对象有一个```close```方法可以用来关闭当前对话框
