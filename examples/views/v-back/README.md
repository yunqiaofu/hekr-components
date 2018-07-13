# v-back指令

> 该指令可用来控制安卓机上返回键的操作，如对话框等组建没有路由不能进行路由回退，当点击返回键时，应该先关闭对话框，让后再次点击返回才会去进行其他操作

## 指令参数
1. 指令参数可为函数，函数中去调用方法关闭浮层，或者进行其他操作
2. 指令参数为boolean，直接控制浮层显示于隐藏的变量

## vue原型对象结构
```javascript
this.$back // back对象
this.$back.length // back的深度
this.$back.pop() // 关闭最后一个打开的浮层
this.$back.push(callback: Function) // 添加一个控制量进入,并返回添加进去的对象标识key
this.$back.delete(key: String) // 移除回退队列，key为push返回的标识
```
