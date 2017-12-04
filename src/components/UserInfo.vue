<template>
  <div class="user">
    <div class="wrap">
      <Card>
        <Avatar class="login-avatar" icon="person" size="large" />
        <h2>
          <span>{{user.account}}</span> &bull; <span>{{user.uid}}</span>
        </h2>
        <Button type="primary" @click="logout">退出</Button>
      </Card>
    </div>
  </div>
</template>

<script>
import handleStorage from "../util/handleStorage";
import mixin from "../util/mixin";
export default {
  name: "user",
  mixins: [handleStorage, mixin],
  computed: {
    user() {
      return this.$store.state.session;
    }
  },
  methods: {
    logout(){
      this.delCookie("session");
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
