<template>
  <div class="wrap">
    <Card class="card">
      <Avatar class="avatar" icon="person" size="large" />
      <Form class="login">
        <FormItem prop="user">
          <Input type="text" placeholder="账号">
            <Icon type="person" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" placeholder="密码">
            <Icon type="locked" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long>登录</Button>
        </FormItem>
      </Form>
      <div class="login-tip">直接输入账号和密码即可</div>
    </Card>
    <!-- 路由出口,路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  data () {
    return {};
  }
};
</script>

<style>
.wrap{
  height: 100vh;
  background-color: #f8f8f9;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card{
  width: 360px;
  padding: 15px 30px;
  box-shadow: 0 30px 30px -15px #ccc;
}
.avatar{
  margin-bottom: 20px;
}
.login-tip{
  font-size: 10px;
  text-align: center;
  color: #c3c3c3;
}
</style>
