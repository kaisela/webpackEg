<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div ref="test" style="height: 300px;width: 600px;border:1px solid #ccc;margin: 0 auto;">

    </div>
    <div ref="test1" style="height: 300px;width: 600px;border:1px solid #ccc;margin: 0 auto;">

    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to My Vue.js App'
    }
  },
  mounted () {
    this.$http.post('Yishang2/test/get', {other: {el: this.$refs.test, loadingTxt: ''}}).then(resp => {
      console.log(resp);
    }, resp => {
      console.log(resp);
    })
    this.$msgInner({
      target: this.$refs.test1,
      text: '加载出错'
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
