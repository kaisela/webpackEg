import Vue from 'vue';
import MsgInnerVue from './main.vue';
import merge from '@/utils/merge';

const MsgInnerConstructor = Vue.extend(MsgInnerVue);

const defaults = {
  text: null,
  body: false,
  lock: true
};

MsgInnerConstructor.prototype.originalPosition = '';

MsgInnerConstructor.prototype.close = function () {
  if (this.body) {
    document.body.style.position = this.originalPosition;
  } else {
    this.target.style.position = this.originalPosition;
  }
  this.$on('after-leave', _ => {
    this.$el &&
    this.$el.parentNode &&
    this.$el.parentNode.removeChild(this.$el);
    this.$destroy();
  });
  this.visible = false;
};

const addStyle = (options, parent, instance) => {
  let maskStyle = {};
  if (options.body) {
    instance.originalPosition = document.body.style.position;
    ['top', 'left'].forEach(property => {
      let scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
      maskStyle[property] = options.target.getBoundingClientRect()[property] +
        document.body[scroll] +
        document.documentElement[scroll] +
        'px';
    });
    ['height', 'width'].forEach(property => {
      maskStyle[property] = options.target.getBoundingClientRect()[property] + 'px';
    });
  } else {
    instance.originalPosition = parent.style.position;
  }
  Object.keys(maskStyle).forEach(property => {
    instance.$el.style[property] = maskStyle[property];
  });
};

const MsgInner = (options = {}) => {
  if (Vue.prototype.$isServer) return;
  options = merge({}, defaults, options);
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;
  if (options.target !== document.body) {
    options.fullscreen = false;
  } else {
    options.body = true;
  }
  let parent = options.body ? document.body : options.target;
  let instance = new MsgInnerConstructor({
    el: document.createElement('div'),
    data: options
  });

  addStyle(options, parent, instance);
  if (instance.originalPosition !== 'absolute') {
    parent.style.position = 'relative';
  }
  if (options.lock) {
    parent.style.overflow = 'hidden';
  }
  parent.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
  return instance;
};

export default MsgInner;
