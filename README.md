# webeg

> vue webpack example

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

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

#淘宝镜像安装
npm install --registry=http://registry.npm.taobao.org
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 框架元素

```
src/utils  ==> 基础功能封装，包括cookies，dom ，Axios的二次封装
src/plugins ==> 一些功能性组件的封装，项目中封装了嵌入式的错误提示
src/views ==> 项目的页面模块
src/components ==> 页面所包含的组件模块
src/router ==> 项目的路由
src/css ==> 总体项目的样式，引入了element的postcss-salad插件
```
