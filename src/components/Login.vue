<template>
  <div class="wrap">
    <Card class="card" v-if="status">
      <Avatar class="login-avatar" icon="person" size="large" />
      <Form ref="loginForm" :model="loginForm" class="login" :rules="ruleInline">
        <FormItem prop="account">
          <Input type="text" placeholder="账号" v-model="loginForm.account">
            <Icon type="person" slot="prepend" size="16"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" placeholder="密码" v-model="loginForm.password">
            <Icon type="locked" slot="prepend" size="14"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long v-on:click="login('loginForm')">登录</Button>
        </FormItem>
      </Form>
      <div class="card-tip">
        <!-- <Alert type="error" show-icon>错误次数超过3次&emsp;<router-link to="/registe">注册</router-link></Alert> -->
      </div>
    </Card>
    <Card class="card" v-else>
      <Avatar class="registe-avatar" icon="person" size="large" />
      <Form class="registe">
        <FormItem >
          <Input type="text" placeholder="账号">
            <Icon type="person" slot="prepend" size="16"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Input type="password" placeholder="密码">
            <Icon type="locked" slot="prepend" size="14"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Input type="password" placeholder="确认密码">
            <Icon type="locked" slot="prepend" size="14"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long v-on:click="registe">注册</Button>
        </FormItem>
      </Form>
      <div class="card-tip"></div>
    </Card>
  </div>
</template>

<script>
import cookie from "../assets/scripts/cookie";
export default {
  name: "home",
  props: ["status"],
  mixins: [cookie],
  data () {
    return {
      isLogin: false,
      loginForm: {
        account: "",
        password: ""
      },
      ruleInline: {
        account: [{
          required: true,
          message: "input valid accout",
          trigger: "blur",
        }],
        password: [{
          required: true,
          message: "input valid password",
          trigger: "blur"
        }]
      }
    };
  },
  methods: {
    login(name){
      this.$refs[name].validate((valid) => {
        if(valid && this.loginForm.account==="admin" && this.loginForm.password==="123"){
          this.$Message.success("登录成功!");
          this.isLogin = true;
          this.setCookie("session", "test", 5);
          this.$refs[name].resetFields();
          // this.$router.push("/");
        }else{
          this.$Message.error("登录失败!");
        }
      });
    },
    registe(){

    }
  },
  created: function(){
    console.log(this.getCookie("session"));
  }
};
</script>

<style scoped>
.wrap{
  height: 100vh;
  background: #f8f8f9 url("../assets/images/bg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
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
