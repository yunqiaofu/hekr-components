# hk-timepickder
## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| value | 绑定值 | string | - | {h:'00',m:'00',s:'00'} |
| type | 默认样式 | string | 'hh:mm:ss' | 'hh:mm' |


## Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| onChange | 选中值改变事件 | value |


## 自定义子组件

### hk-time-item
### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| listData | 滚动内容 | array | - | - |
| type | 类型,是否循环 | string | line,cycle | line |
| slot(name = unit) | 单位 | html | - | - |
| value | 绑定值 | Object | - | - |

### Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| onChange | 选中值改变事件 | value |
