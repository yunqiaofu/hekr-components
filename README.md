# hekr-components

> A Vue.js UI Toolkit for Hekr

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 开发规范

> 关于组件规范请阅读[vue风格指南](https://cn.vuejs.org/v2/style-guide/)

### 整体规范风格
1. 所有的js都必须强制使用eslint进行格式的规范，eslint规则使用eslint-config-standard规则，并且书写js时请尽量采用es6+的特性，并适时书写必要的注释
2. 所有组件的css预处理语言使用stylus，在项目中不得使用其他css处理器
3. template模板统一使用pug，使用pug的目的是规范template的格式，使整个项目更整洁代码风格一致
4. 每个组件都必须放在一个文件夹下面，在文件夹下必须编写组件的README.md文件
5. 每个组件文件夹下必须有一个index.js文件，该文件主要是负责导出组件的install函数，可参考[src/components/button](./src/components/button)
6. 编写组件必须在examples文件夹下编写对应的demo，开发的时候的入口文件就是examples/index.js

### 命名规则
1. 所有文件（文件夹）命名必须采用kebab-case (短横线分隔命名)的方式
2. 所有的的组件都必须给定一个name，并且name也是采用kebab-case方式命名，并且必须添加前缀hk，如：hk-button
3. 所有的css类都必须采用kebab-case命令的方式
4. js变量都必须采用camelCase（驼峰命名），不使用也可以，只要你能通过eslint检测
5. 组件的props声明时采用camelCase命名方式，在template中使用的时候采用kebab-case的方式，如下：
```javascript
props: {
  greetingText: String
}
```
```html
<WelcomeMessage greeting-text="hi"/>
```
6. 事件名称统一都采用kebab-case的方式

### template模板书写风格
1. 当模板中一个标签有多个属性时，请换行书写，以提高可读性
```html
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```
2. template中属性的最外层引号请使用双引号("")
3. template指令都采用缩写的方式，如v-bind => :

## 注意事项
1. 开发一个组件(component)或者一个包(package)之后，必须手动在components或packages文件夹下index.js中添加导出模块的代码
2. 编写的组件必须同时支持鼠标事件和触摸事件，且不能狗冲突或者同时发生
3. 项目中所有使用到的单位都必须是rem，HTML根元素的font-szie为20px，所以我们定义一个大小为20px的时候使用1rem，注意：定义html为20xp是由于在chrome PC版上最小字体为12px，所以调试的时候会出现偏差
4. 目录结构说明
```
examples
│  App.vue
│  index.js // 开发环境入口文件
│
├─router // vue 路由和导航相关
│      index.js // 定义路由
│      Sidebar.vue // 侧边导航
│
└─views // 路由视图
    └─button // 路由页面文件夹
            index.vue // 编写对应名字组件的demo
```
```
src
│  index.js // 导出所有组件
│
├─components // 基础组件
│  │  index.js // 导出所有components
│  │
│  └─button // button组件
│          button.vue
│          index.js // 编写install函数并导出
│          README.md // 组件README文件
│
├─packages // 复合组件 开发时和components保持下相似目录结构
│      index.js
│
└─stylus // 样式文件
        hekr-components.styl
        variables.styl // 样式变量
```
