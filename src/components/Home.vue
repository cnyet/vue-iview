<template>
  <div class="user">
    <h1>{{title}}</h1>
    <div>User Components</div>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data () {
      return {
        title: 'User'
      }
    }
  }
</script>