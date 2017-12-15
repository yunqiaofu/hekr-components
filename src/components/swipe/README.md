# hk-swipe

## hk-swipe
### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| defaultIndex | 默认轮播下标 | number | - | 0 |
| auto | 自动轮播时长，设置为0停止轮播 | number | - | 3000 |
| speed | 过渡动画时长 | number | - | 300 |
| indicator | 是否显示指示器 | boolean | - | true |

### Slot
| name | 说明|
| --- | --- |
| - | 用于放置hk-swipe-item组件 |

## Events
| 事件名称 | 说明 |	回调参数 |
|--- | --- | --- |
| change | 下标变化 | 下标值 |

## hk-swipe-item
该组件用于显示轮播项目，是hk-swipe的子组件
