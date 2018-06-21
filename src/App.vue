<template>
  <transition name="fade">
    <keep-alive>
      <!-- 路由出口,路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
html, body{
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  color: #2c3e50;
}
.fade-enter-active, .fade-leave-active{
  transition: opacity .2s;
}
</style>
