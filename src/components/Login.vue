<template>
  <div class="wrap">
    <transition name="fade">
      <keep-alive>
        <Card class="card" v-if="status">
          <Avatar class="login-avatar" icon="person" size="large" />
          <Form class="login">
            <FormItem prop="user">
              <Input type="text" placeholder="账号">
                <Icon type="person" slot="prepend" size="16"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" placeholder="密码">
                <Icon type="locked" slot="prepend" size="14"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <div class="card-tip">
            <!-- <Alert type="error" show-icon>错误次数超过3次&emsp;<router-link to="/registe">注册</router-link></Alert> -->
          </div>
        </Card>
        <Card class="card" v-else>
          <Avatar class="registe-avatar" icon="person" size="large" />
          <Form class="registe">
            <FormItem prop="user">
              <Input type="text" placeholder="账号">
                <Icon type="person" slot="prepend" size="16"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" placeholder="密码">
                <Icon type="locked" slot="prepend" size="14"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" placeholder="确认密码">
                <Icon type="locked" slot="prepend" size="14"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" long>注册</Button>
            </FormItem>
          </Form>
          <div class="card-tip"></div>
        </Card>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: "home",
  props: ["status"],
  data () {
    return {

    };
  }
};
</script>

<style scoped>
.wrap{
  height: 100vh;
  background: #f8f8f9 url("../assets/bg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fade-enter-active, .fade-leave-active{
  transition: opacity .5s;
}
.card{
  background-color: rgba(250,250,250,.93);
  width: 360px;
  text-align: center;
  padding: 15px 30px;
}
.card.active{
  display: block;
}
.card .login-avatar{
  background-color: #87d068;
  margin-bottom: 20px;
}
.card .registe-avatar{
  margin-bottom: 12px;
}
.card-tip{
  font-size: 10px;
  text-align: center;
  color: #c3c3c3;
}
.registe .ivu-form-item{
  margin-bottom: 12px;
}
</style>
