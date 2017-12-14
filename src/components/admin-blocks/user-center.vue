<style scoped lang="less">
  .user-container{
    .form-contrl{
      width: 300px;
    }
  }
</style>

<template>
  <Card class="user-container">
    <p slot="title">
      <Icon type="person"></Icon> 个人中心
    </p>
    <Form :label-width="80">
      <FormItem label="用户ID：">
        <span>001</span>
      </FormItem>
      <FormItem label="用户名：">
        <Input class="form-contrl"></Input>
      </FormItem>
      <div>
        <Button type="primary" @click="updateUser" style="margin-left:20px;">保存</Button>
      </div>
    </Form>
  </Card>
</template>

<script>
export default {
  name: "user",
  data (){
    return {

    };
  },
  methods: {
    updateUser(){

    }
  }
};
</script>
