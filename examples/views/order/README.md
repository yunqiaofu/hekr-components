# hk-order
## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| lists | 预约列表 | array | - | - |
| template.taskName | 预约名称 | string | - | - |
| template.code.cmdTag | 预约命令 | string | - | - |
| options | 命令中的每一个参数配置项 | array | - | -|
| setting | 配置信息 | object | - | { maxLen: 10 } |

### Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| onRemove | 删除预约 | object |
| onEdit | 编辑预约 | object |
| onAdd | 新增预约 | object |
| back | 返回 | - |

