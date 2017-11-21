# hk-ui

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
5. 每个组件文件夹下必须有一个index.js文件，该文件主要是负责导出组件的install函数，可参考[src/components/header](./src/components/header)
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
