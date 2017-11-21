<template>
  <div class="wrap">

    <Form class="login">
      <h1>{{title}}</h1>
      <Card class="card">
        <Avatar class="avatar" icon="person" size="large" />
        <FormItem prop="user">
          <Input type="text" placeholder="账号">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" placeholder="密码">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
            <Button type="primary">登录</Button>
            <Button type="ghost" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Card>
    </Form>
    <!-- 路由出口,路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  data () {
    return {
      title: "Hello Vue"
    };
  }
};
</script>

<style>
.login{
  display: inline-block;
  width: 400px;
}
.login .card{
  padding: 15px 30px;
}
.login .avatar{
  margin-bottom: 20px;
}
</style>
