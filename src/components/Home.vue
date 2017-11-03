<template>
  <div class="wrap">
    <h1>{{title}}</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  data () {
    return {
      title: "Home"
    }
  }
}
</script>

<style>
.box{
  display: flex;
  transition: all 1s;
}
</style>
