<style scoped lang="less">
.menu-container{
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .dropdown-container{
    width: 60px;
    color: #f5f5f5;
    text-align: center;
    .dropdown-menu{
      text-align: left;
    }
    .dropdown-btn{
      margin: 8px;
      border: 0;
      color: rgba(255,255,255,.7);
      &:hover{
        color: #fff;
      }
    }
  }
}
</style>

<template>
  <div class="menu-container">
    <Menu theme="dark" width="auto" @on-select="changeMenu" v-show="!shrink">
      <div class="layout-logo-left"></div>
      <MenuItem name="auth">
        <Icon type="key"></Icon>
        <span ref="auth" class="layout-text">权限管理</span>
      </MenuItem>
      <Submenu name="table">
        <template slot="title">
          <Icon type="grid"></Icon>
          <span class="layout-text">表格管理</span>
        </template>
        <MenuItem name="tabMove">
          <Icon type="arrow-move"></Icon>
          <span ref="tabMove" class="layout-text">可拖拽排序表格</span>
        </MenuItem>
        <MenuItem name="tabEdit">
          <Icon type="edit"></Icon>
          <span ref="tabEdit" class="layout-text">可编辑表格</span>
        </MenuItem>
        <MenuItem name="tabSearch">
          <Icon type="search"></Icon>
          <span ref="tabSearch" class="layout-text">可搜索表格</span>
        </MenuItem>
      </Submenu>
      <Submenu name="form">
        <template slot="title">
          <Icon type="android-checkbox"></Icon>
          <span class="layout-text">表单管理</span>
        </template>
        <MenuItem name="formCompose">
          <Icon type="compose"></Icon>
          <span ref="formCompose" class="layout-text">文章发布</span>
        </MenuItem>
        <MenuItem name="formSwap">
          <Icon type="arrow-swap"></Icon>
          <span ref="formSwap" class="layout-text">工作流</span>
        </MenuItem>
      </Submenu>
    </Menu>
    <div class="dropdown-container" v-show="shrink">
      <div class="layout-logo-left"></div>
      <Dropdown placement="right-start" name="auth">
        <Button type="text" class="dropdown-btn" @click="changeMenu('auth')">
          <Icon type="key" size="20"></Icon>
        </Button>
      </Dropdown>
      <Dropdown placement="right-start" transfer trigger="click" @on-click="changeMenu">
        <Button type="text" class="dropdown-btn">
          <Icon type="grid" size="20"></Icon>
        </Button>
        <DropdownMenu class="dropdown-menu" slot="list">
          <DropdownItem name="tabMove">
            <Icon type="arrow-move"></Icon>
            <span class="layout-text">可拖拽排序表格</span>
          </DropdownItem>
          <DropdownItem name="tabEdit">
            <Icon type="compose"></Icon>
            <span class="layout-text">可编辑表格</span>
          </DropdownItem>
          <DropdownItem name="tabSearch">
            <Icon type="search"></Icon>
            <span class="layout-text">可搜索表格</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown placement="right-start">
        <Button type="text" class="dropdown-btn">
          <Icon type="android-checkbox" size="20"></Icon>
        </Button>
        <DropdownMenu class="dropdown-menu" slot="list">
          <DropdownItem name="formCompose">
            <Icon type="compose"></Icon>
            <span class="layout-text">文章发布</span>
          </DropdownItem>
          <DropdownItem name="formSwap">
            <Icon type="arrow-swap"></Icon>
            <span class="layout-text">工作流</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: "menuLists",
    props: ["shrink"],
    methods: {
      changeMenu (active){
        const openedTags = {
          title: this.$refs[active].innerText,
          name: active,
          path: active
        };
        const pathArr = this.$route.fullPath.split("/").filter(item => item!=='');
        console.log(active, pathArr);
        /* 默认接受点击导航的name,name是组件名 */
        // this.$emit("on-change", active);
        this.$router.push({
          name: active
        });
        this.$store.commit("addOpenedTags", openedTags);
        this.$store.commit("updateCurrentPath", pathArr);
      }
    }
  };
</script>
