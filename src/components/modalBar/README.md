# hk-modal-bar

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| item | 图标文字信息 | array | --- | --- |
| theme | 主题 |	string | dark/light | dark |
| bgColor | 背景颜色 | string | --- | 跟随theme改变 |
| fontColor | 未激活状态颜色 | string | --- | 跟随theme改变 |
| activeColor | 激活状态颜色 | string | --- | 跟随theme改变 |

### item参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| icon | 图标class | string | --- | --- |
| label | 图标下文字 |	string | --- | --- |
| name | 标识 | string | --- | --- |
| active | 是否处于激活状态 | boolean | --- | false |
| disabled | 是否禁用 | boolean | --- | false |
| fontColor | 未激活状态颜色 | string | --- | 跟随theme改变 |
| activeColor | 激活状态颜色 | string | --- | 跟随theme改变 |

注：item.fontColor 优先于 fontColor 优先于 theme中的fontColor

## Slot
| name | 说明|
| --- | --- |

## Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| change | 点击事件 | 点击的name字段 |
