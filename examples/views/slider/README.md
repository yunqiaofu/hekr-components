# hk-slider

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| value | 绑定值 | number | - | 0 |
| min | 最小值 | number | - | 0 |
| max | 最大值 | number | - | 0 |
| step | 步长 | number | - | 0 |
| minText | 最小值文字 | string | - | - |
| maxText | 最大值文字 | string | - | - |
| disabled | 是否禁用 | boolean | - | false |
| loading | 是否加载中 | boolean | - | false |
| title | 标题 | string | - | - |
| unit | 数值单位 | string | - | - |
| circle | 是否显示分割点| boolean | - | false |

## Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| select | 鼠标点选事件 | 改变后的值 |
| dragstart | 拖动开始事件 | 当前的值 |
| dragging | 拖动移动事件 | 当前的值 |
| dragend | 拖动结束事件 | 改变后的值 |

### Slot

| name | 说明|
| --- | --- |
| handle | 拖动手柄 |
| circle | 分割点 |
