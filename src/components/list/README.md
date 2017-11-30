# hk-list

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| type | 列表类型，主要为右侧内容 | string | text/input/checkbox | --- |
| leftText | 左侧文字 |	string | --- | --- |
| leftIcon | 左侧图标class | string | --- | --- |
| rightText | 右侧文字 | string | --- | --- |
| rightIcon | 右侧图标class | string | --- | --- |
| textColor | 右侧图标和文字颜色(type='text'时可用) | string | --- | --- |
| value | type='input'或'checkout'时传值使用,v-model绑定 | --- | --- | --- |
| inputType | type='input'时使用, input类型 | string | text | text |
| inputMaxLength | 输入框最大长度 | number | --- | 12 |
| border | 是否有下边框 | boolean | --- | false |

## Slot
| name | 说明|
| --- | --- |
| list | list一行内容, 不区分左右 |
| left | list左侧内容, 占40% |
| right | list右侧内容, 占60% |

## Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| @list-click | 整条点击事件 | - |
| @right-click | 右侧点击事件, type='text'时使用 | - |
