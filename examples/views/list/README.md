# hk-list

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| type | 列表类型，主要为右侧内容 | string | text/input/check/switch | - |
| leftText | 左侧文字 |	string | - | - |
| leftIcon | 左侧图标class | string | - | - |
| rightText | 右侧文字 | string | - | - |
| rightIcon | 右侧图标class | string | - | - |
| textColor | 右侧图标和文字颜色(type='text'时可用) | string | - | - |
| value | type='input'或'checkout'时传值使用,v-model绑定 | - | - | - |
| inputProps | type='input'时使用, input配置项 | object | - | - |
| switchProps | switch配置项 | object | - | 详见switch组件配置项 |
| checkProps | check配置项 | object | - | 详见check组件配置项 |
| border | 是否有下边框 | boolean | - | false |

## Slot
| name | 说明|
| --- | --- |
| list | list一行内容, 不区分左右 |
| left | list左侧内容, 占40% |
| right | list右侧内容, 占60% |

## Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| @click | 整条点击事件 | - |
| @right-click | 右侧点击事件, type='text'时使用 | - |
