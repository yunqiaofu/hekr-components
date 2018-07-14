# hk-timepickder

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| value | 绑定值 | object | - | { hour: 0, min: 0 } |
| hourFormat | 小时显示格式化函数 | function | - | val => val < 10 ? \`0${val}\` : val |
| minFormat | 分钟显示格式化函数 | function | - | val => val < 10 ? \`0${val}\` : val |
