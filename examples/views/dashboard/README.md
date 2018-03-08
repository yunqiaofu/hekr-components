# hk-dashboard

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| type | 按钮类型 | string | both / touch / button / none
| maxR | 外径值(绘制外圈圆的直径,通过此设置来加长或缩短刻度条的长度) | number | - | 125 |
| minR | 内径值(绘制内圈圆的直径,通过此设置来加长或缩短刻度条的长度) | number | - | 100 |
| min | value的最小值 | number | - | 16 |
| max | value的最大值 | number | - | 32 |
| equalCount | 刻度的数量 | number | - | 50 |
| step | 每一个刻度之间的间隔值 | number | - | 1 |
| beginColor | value值对应刻度条颜色渐变的开始值(不支持以颜色名称为值, 如: 'red') | array | - |  |
| endColor | value值对应刻度条颜色渐变的结束值(不支持以颜色名称为值, 如: 'red') | array | - |  |
| defaultColor | 默认刻度颜色 | string | - |  |
| disabled | 是否禁用状态 | boolean |	- | false |
| block | 是否为块级样式 | boolean | - | false |
| loading | 是否显示加载动画 | boolean | - | false |
| unit | 单位 | string | - |  |
| valueStyle | 内容的样式 | object | - |  |
| title | 标题 | string | - |  |



## Slot
| name | 说明|
| --- | --- |
| inner | 内容(设置后会覆盖默认的内容) |

## Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| change | 点击事件 | - |
