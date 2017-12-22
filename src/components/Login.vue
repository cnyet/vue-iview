<template>
  <div class="wrap">
    <Card class="card" v-if="status">
      <Avatar class="login-avatar" icon="person" size="large" />
      <Form ref="loginForm" :model="loginForm" class="login" :rules="loginRule">
        <FormItem prop="account" key="login-account">
          <Input type="text" placeholder="账号" v-model="loginForm.account">
            <Icon type="person" slot="prepend" size="16"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password" key="login-password">
          <Input type="password" placeholder="密码" v-model="loginForm.password" @keyup.enter.native="login">
            <Icon type="locked" slot="prepend" size="14"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long v-on:click="login">登录</Button>
        </FormItem>
      </Form>
      <div class="card-tip" v-show="errorCount > 3">
        <Alert type="error" show-icon>错误次数超过3次&emsp;<router-link to="/registe">注册</router-link></Alert>
      </div>
    </Card>
    <Card class="card" v-else>
      <Avatar class="registe-avatar" icon="person" size="large" />
      <Form class="registe" ref="registeForm" :model="registeForm" :rules="registeRule">
        <FormItem prop="account" key="registe-account">
          <Input type="text" placeholder="账号" v-model="registeForm.account">
            <Icon type="person" slot="prepend" size="16"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password" key="registe-password">
          <Input type="password" placeholder="密码" v-model="registeForm.password">
            <Icon type="locked" slot="prepend" size="14"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="confirm" key="registe-confirm">
          <Input type="password" placeholder="确认密码" v-model="registeForm.confirm">
            <Icon type="locked" slot="prepend" size="14"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long v-on:click="registe">注册</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import util from "../util";
export default {
  name: "home",
  props: ["status"],
  data () {
    const validPwd = (rule, value, callback, source, options) => {
      if(value === ""){
        callback(new Error("input valid password"));
      }else{
         console.log(this.registeForm.confirm);
        if(this.registeForm.confirm !== "") {
          this.$refs.registeForm.validateField("confirm");
        }
        callback();
      }
    };
    const validConfirm = (rule, value, callback, source, options) => {
      if(value === ""){
        callback(new Error("input valid password again"));
      }else if(value !== this.registeForm.password){
        callback(new Error('The two input passwords do not match!'));
      }else{
        callback();
      }
    };
    return {
      errorCount: 0,
      loginForm: {
        account: "",
        password: ""
      },
      registeForm: {
        account: "",
        password: "",
        confirm: ""
      },
      loginRule: {
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
      },
      registeRule: {
        account: [{
          required: true,
          message: "input valid accout",
          trigger: "blur",
        }],
        password: [{
          validator: validPwd,
          trigger: "blur"
        }],
        confirm: [{
          validator: validConfirm,
          trigger: "blur"
        }]
      }
    };
  },
  methods: {
    login(){
      this.$refs['loginForm'].validate((valid) => {
        if(valid && this.loginForm.account==="admin" && this.loginForm.password==="123"){
          this.$Message.success("登录成功!");
          this.setUserInfo();
          let currentTag = this.$store.state.currentTag;
          if(currentTag){
            this.$router.push({
              name: currentTag,
              query: ""
            });
          }else{
            this.$router.push("/admin");
          }

        }else{
          this.errorCount ++;
          this.$Message.error("登录失败!");
        }
      });
      //重置表单
      this.$refs.loginForm.resetFields();
    },
    registe(){
      this.$refs['registeForm'].validate((valid) => {
        console.log(valid);
        if(valid){
          this.$Message.success("注册成功!");
        }else{
          this.$Message.error("注册失败!");
        }
      });
    },
    setUserInfo(){
      const user = this.loginForm.account;
      const uid = new Date().getTime().toString(16);
      util.setCookie("user", user, 1);
      util.setCookie("uid", uid, 1);
      // this.$store.commit("updateCurrentTag", "admin");
      if(typeof (Storage) !== "undefined"){
        localStorage.setItem("isLogin", true);
        // localStorage.setItem("currentTag", "admin");
        // localStorage.setItem("openedTags", JSON.stringify(this.$store.state.openedTags));
        // localStorage.setItem("currentPath", JSON.stringify(this.$store.state.currentPath));
      }else{
        console.error("your browser doesn't support localstorage and sessionstorage.");
      }
    }
  },
  created(){

  },
  mounted(){

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
.card{
  background-color: rgba(250,250,250,.93);
  width: 360px;
  text-align: center;
  padding: 15px 30px;
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
.registe .ivu-form-item:last-child{
  margin-bottom: 0;
}
</style>
