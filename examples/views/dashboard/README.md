# hk-dashboard

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| type | 按钮类型 | string | both / touch / button / none
| maxR | 外径值 | number | - | 125 |
| minR | 内径值 | number | - | 100 |
| min | value的最小值 | number | - | 16 |
| max | value的最大值 | string | - | 32 |
| equalCount | 刻度的数量 | number | - | 50 |
| step | 间隔 | number | - | 1 |
| beginColor | 开始的颜色 | string | - | 50 |
| endColor | 结束的颜色 | string | - | 50 |
| disabled | 是否禁用状态 | boolean |	- | false |
| block | 是否为块级样式 | boolean | - | false |
| loading | 是否显示加载动画 | boolean | - | false |

## Slot
| name | 说明|
| --- | --- |
| inner | 内容 |

## Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| change | 点击事件 | - |
