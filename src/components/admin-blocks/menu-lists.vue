<style scoped lang="less">
  .menu-container{
    .layout-logo-left{
      width: 90%;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      margin: 15px auto;
    }
  }
</style>

<template>
  <Menu class="menu-container" theme="dark" width="auto" @on-select="changeMenu">
    <div class="layout-logo-left"></div>
    <MenuItem name="auth">
      <Icon type="key"></Icon>
      <span class="layout-text">权限管理</span>
    </MenuItem>
    <Submenu name="table">
      <template slot="title">
        <Icon type="grid"></Icon>
        <span class="layout-text">表格管理</span>
      </template>
      <MenuItem name="表格一">
        <span class="layout-text">表格一</span>
      </MenuItem>
      <MenuItem name="表格二">
        <span class="layout-text">表格二</span>
      </MenuItem>
      <MenuItem name="表格三">
        <span class="layout-text">表格三</span>
      </MenuItem>
    </Submenu>
    <Submenu name="form">
      <template slot="title">
        <Icon type="android-checkbox"></Icon>
        <span class="layout-text">表单管理</span>
      </template>
      <MenuItem name="表单一">
        <span class="layout-text">表单一</span>
      </MenuItem>
      <MenuItem name="表单二">
        <span class="layout-text">表单二</span>
      </MenuItem>
    </Submenu>
  </Menu>
</template>

<script>
  export default {
    name: "menuLists",
    porps: [],
    methods: {
      changeMenu (active){
        const tags = {
          title: "权限管理",
          name: "auth",
          path: "auth"
        };
        /* 默认接受点击导航的name,name是组件名 */
        // this.$emit("on-change", active);
        this.$router.push({
          name: active
        });
        this.$store.commit("updateOpenedTags", tags);
      }
    }
  };
</script>
