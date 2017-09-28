import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Error404 from '@/components/404'
import Error from '@/views/error'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/error',
      name: 'Error',
      component: Error,
      children: [{
        path: '/error/404',
        component: Error404
      }]
    }
  ]
})
