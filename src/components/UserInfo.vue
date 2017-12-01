<template>
  <div class="user">
    <div class="wrap">
      <Card>
        <Avatar :src="$store.state.userInfo.avatar" size="large"></Avatar>
        <h2>
          <span>{{$store.state.userInfo.name}}</span> &bull; <span>{{$store.state.userInfo.uid}}</span>
        </h2>
      </Card>
    </div>
  </div>
</template>

<script>
import theCookie from "../config/theCookie";
export default {
  name: "user",
  mixins: [theCookie],
  methods: {
    logout(){
      this.delCookie("session");
    }
  },
  created () {
    console.log(this.$store.state.userInfo);
  }
};
</script>

<style lang="less" scoped>
.user{
  .wrap{
    width: 700px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
}
</style>>
