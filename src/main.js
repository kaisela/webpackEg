// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axiosPlugin from './utils/server'
import Element from 'my-element-ui'
import msgInnerPlugin from 'MsgInnerPlugin'
import 'my-element-ui/lib/theme-default/index.css';
import router from './router'

Vue.config.productionTip = false
Vue.use(axiosPlugin);
Vue.use(Element);
Vue.use(msgInnerPlugin);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
