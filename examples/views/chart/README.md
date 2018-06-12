# hk-chart

## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- | --- | --- | --- | --- |
| type | 图表类型 | string | line/bar/radar/polarArea/pie/doughnut/bubble | line |
| data | 图标显示数据 |	object | - | - |
| options | 配置项 | object | - | - |
| gradients | 渐变颜色 | array | - | - |
| loading | 显示加载动画 | boolean | - | false |

**注: 在使用本插件之前请安装并引入chart.js, chart.js具体参数配置详见[chart.js](http://www.chartjs.org) type，data，options都是new Chart(ctx, config)方法的第二个参数config**

### gradients参数说明
渐变的位置定义：0 -> 1 对应图形顶部到底部，即曲线到坐标轴的方向
如果传递了gradients,则会重写data中的datasets中的backgroundColor为传入的渐变色，其他保持不变，完全和chart.js官方的文档一致
1. gradients项目为对象时：
```javascript
gradients = [{
  pos: 1,
  color: rgba/rgb/hexadecimal // 颜色值
}]
```
2. gradients项目为数组时：
```javascript
gradients = [/** 颜色值，颜色对应位置为颜色下标index/gradients.length */]
```

### options属性中设置坐标轴示例
```js
const options = {
  scales: {
    xAxes: [{
      gridLines: { // 坐标网格
        borderDash: [3], // 点划线长度
        borderDashOffset: 2, // 点划线间隔
        display: true, // 显示隐藏
        drawBorder: false, // 坐标轴是否绘制
        color: 'rgba(255,255,255,0.8)' // 网格颜色
      },
      ticks: {
        fontColor: '#fff' // 坐标上文字颜色
      }
    }],
    yAxes: [{
      gridLines: {
        borderDash: [3],
        borderDashOffset: 2,
        display: true,
        drawBorder: false,
        color: 'rgba(255,255,255,0.8)'
      },
      ticks: {
        fontColor: '#fff'
      }
    }]
  }
}
```
