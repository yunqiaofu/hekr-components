# hk-time-pickder
## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| value | 绑定值 | string | - | - |
| type | 默认样式 | string | - | default |


## Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| onChange | 选中值改变事件 | value |


## 自定义子组件

### hk-time-box
### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| title | 标题 | string | - | 倒计时时间 |
| show | 是否显示 | boolean | - | false |
| slot | 选择条 | html | - | - |

### hk-time-item
### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| listData | 滚动内容 | array | - | - |
| type | 类型,是否循环 | string | line,cycle | line |
| slot(name = unit) | 单位 | html | - | - |
| value | 绑定值 | Object | - | {h: '00',m: '00'} |
### Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| onChange | 选中值改变事件 | value |
