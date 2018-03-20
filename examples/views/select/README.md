# hk-select

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| title | 标题 | string | - | - |
| items | 操作选项 | array | - | - |
| disabled | 列表不可修改 | boolean | - | false |
| multiple | 多选 | boolean | - | false |

### items结构
```js
{
  name: '左侧标题',
  icon?: '', // 左侧图标
  checkProps?: // 右侧check组件选项，可参考check组件
}
```

### Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| change | 选项改变回调 | 包含选择对象的所有信息的一个对象 |
