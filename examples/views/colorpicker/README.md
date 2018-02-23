# hk-colorpicker
该组件导出了两个组件分别为`hk-colorpicker`和`hk-pop-colorpicker`

## hk-colorpicker

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| value | rgb颜色值对象，绑定值 | object | - | { r: 0, g: 0, b: 0} |
| disabled | 是否禁用 | boolean | - | false |

## hk-colorpicker

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| value | 显示隐藏pop，绑定值 | boolean | - | false |
| color | rgb颜色值对象 | object | - | { r: 0, g: 0, b: 0} |
| disabled | 是否禁用 | boolean | - | false |

### Events

| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| cancel | 取消按钮点击事件 | rgb颜色值 |
| confirm | 确定按钮点击事件 | rgb颜色值 |
