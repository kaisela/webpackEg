<template>
  <div id="error">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'error',
  data () {
    return {
      msg: '404错误'
    }
  }
}
</script>
