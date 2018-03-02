# hk-order
## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| lists | 预约列表 | array | - | - |
| template.taskName | 预约名称 | string | - | - |
| template.code.cmdTag | 预约命令 | string | - | - |
| options | 命令中的每一个参数配置项 | array | - | -|
| maxlength | 预约列表最多条数 | number | - | 10 |

### Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| onRemove | 删除预约 | 删除的预约对象 |
| onEdit | 编辑预约 | 编辑的预约对象 |
| onAdd | 新增预约 | 新增的预约对象 |
| back | 返回 | - |
