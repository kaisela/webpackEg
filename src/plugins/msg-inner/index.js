import MsgInner from './main.js'
export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$msgInner', { value: MsgInner });
  }
};
