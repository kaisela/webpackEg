<template>
  <div
    v-show="visible"
    class="msg-inner"
    @after-leave="handleAfterLeave" >
    <div class="msg-inner-spinner">
      <div class="msg-inner-icon" :class="[iconClass]"></div>
      <p v-if="text" class="el-loading-text">{{ text }}</p>
    </div>
  </div>
  </template>
<style lang="scss">
.msg-inner{
  position: absolute;
  z-index: 10000;
  background-color: rgba(255, 255, 255, 1);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

}
.msg-inner-spinner{
  top: 50%;
  margin-top: -29px;
  width: 100%;
  text-align: center;
  position: absolute;

}
.msg-inner-icon{
  background: url(../../assets/fail-inner.png) no-repeat center top;
  height: 35px;
  width: 24px;
  margin: 0 auto;
}
.msg-inner-no-data{
  background: url(../../assets/no-data-inner.png) no-repeat center top;
}
</style>
<script>
export default {
  data () {
    return {
      text: null,
      fullscreen: true,
      visible: false,
      customClass: '',
      iconClass: ''
    };
  },

  methods: {
    handleAfterLeave () {
      this.$emit('after-leave');
    },
    setText (text) {
      this.text = text;
    }
  }
};
</script>
