# hk-dialog

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| value | 绑定值，控制显示隐藏 | boolean | - | false |
| type | 对话框类型，文字或输入框 | string | text/input | text |
| showMask | 控制显示背景遮罩 | boolean | - | true |
| maskClickDisabled | 控制显示背景遮罩点击事件 | boolean | - | false |
| title | 对话框标题 | string | - | - |
| text | 对话框内容文字 | string | - | - |
| bodyTextAlign | 对话框body部分文字对齐方式 | string | left/center/right | left |
| inputProps | 对话框为input时，input的属性，可以传入输入框的初始值 | object | - | - |
| showCancel | 控制显示取消按钮 | boolean | - | true |
| cancelText | 取消按钮文字 | string | - | 取消 |
| showConfirm | 控制显示确定按钮 | boolean | - | true |
| confirmText | 确定按钮文字 | string | - | 确定 |

## Slot
| name | 说明|
| --- | --- |
| - | 对话框整体内容 |
| header | 对话框头部 |
| body | 对话框内容区域 |
| footer | 对话框底部 |


## Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| cancel | 取消按钮点击事件 | - |
| confirm | 确定按钮点击事件 | type=input时为输入框值，否者为空 |
