<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <!-- 路由出口,路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      isLogin: false

    };
  },
  //组件开始挂载时
  mounted: function(){

  },
  methods: {

  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.fade-enter-active, .fade-leave-active{
  transition: opacity .2s;
}
</style>
