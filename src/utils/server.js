import axios from 'axios';
import qs from 'qs';
import {Message, Loading} from 'my-element-ui';
import router from '../router'
import MsgInner from 'MsgInner';
const Axios = axios.create({
  baseURL: '/', // 因为我本地做了反向代理
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
});
let otherConfig = {
  el: document.body,
  loadingTxt: '加载中...'
}
let loading = null;
// POST传参序列化(添加请求拦截器)

Axios.interceptors.request.use(
  config => {
    if (config.data.other) {
      otherConfig = Object.assign(otherConfig, config.data.other)
    }
    // 在发送请求之前做某件事
    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete'
    ) {
      // 序列化
      config.data = qs.stringify(config.data.data || {});
    } else {
      config.data = config.data.data || {}
    }
    // 若是有做鉴权token , 就给头部带上token
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token;
    }
    if (!loading) {
      if (otherConfig.el === document.body) {
        loading = Loading.service({fullscreen: true, text: otherConfig.loadingTxt});
      } else {
        loading = Loading.service({target: otherConfig.el, text: otherConfig.loadingTxt});
      }
    }
    return config;
  },
  error => {
    loading.close();
    Message({
      //  饿了么的消息弹窗组件,类似toast
      showClose: true,
      message: error,
      type: 'error.data.error.message'
    });
    return Promise.reject(error.data.error.message);
  }
);

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    loading.close();
    // 对响应数据做些事
    if (res.data && !res.data.success) {
      MsgInner({
        target: otherConfig.el,
        iconClass: 'msg-inner-no-data',
        text: '暂无数据'
      });
      // Message({
      //   //  饿了么的消息弹窗组件,类似toast
      //   showClose: true,
      //   message: res.data.msg,
      //   type: 'error'
      // });
      return Promise.reject(res.data);
    }
    return res.data;
  }, (error) => {
  if (!window.localStorage.getItem('loginUserBaseInfo')) {
      // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
    router.push({
      path: '/login'
    });
  } else {
      // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
      // 乖乖的返回去登录页重新登录
    let lifeTime =
        JSON.parse(window.localStorage.getItem('loginUserBaseInfo')).lifeTime *
        1000;
    let nowTime = new Date().getTime(); // 当前时间的时间戳
    if (nowTime > lifeTime) {
      Message({
        showClose: true,
        message: '登录状态信息过期,请重新登录',
        type: 'error'
      })
    } else {
        // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
      if (error.response.status === 403) {
        router.push({
          path: '/error/403'
        });
      }
      if (error.response.status === 500) {
        router.push({
          path: '/error/500'
        });
      }
      if (error.response.status === 502) {
        router.push({
          path: '/error/502'
        });
      }
      if (error.response.status === 404) {
        router.push({
          path: '/error/404'
        });
      }
    }
  }
    // 返回 response 里的错误信息
  let errorInfo = error.data.error ? error.data.error.message : error.data;
  return Promise.reject(errorInfo);
}
);

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$http', {value: Axios});
  }
};
