<template>
  <div class="user">
    <div class="wrap">
      <Card>
        <Avatar class="login-avatar" icon="person" size="large" />
        <h2>
          <span>{{session.account}}</span> &bull; <span>{{session.uid}}</span>
        </h2>
        <Button type="primary" @click="logout">退出</Button>
      </Card>
    </div>
  </div>
</template>

<script>
import mixin from "../util/mixin";
export default {
  name: "user",
  mixins: [mixin],
  computed: {
/*    user() {
      return this.$store.state.session;
    }*/
  },
  methods: {
    logout(){
      // handleCookie.delCookie("session");
      sessionStorage.removeItem("uid");
      this.$router.push("/login");
    }
  },
  created () {

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
