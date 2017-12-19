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
      <MenuItem name="authority">
        <Icon type="key"></Icon>
        <span class="layout-text">权限管理</span>
      </MenuItem>
      <Submenu name="table">
        <template slot="title">
          <Icon type="grid"></Icon>
          <span class="layout-text">表格管理</span>
        </template>
        <MenuItem name="dragTab">
          <Icon type="arrow-move"></Icon>
          <span class="layout-text">可拖拽排序表格</span>
        </MenuItem>
        <MenuItem name="editTab">
          <Icon type="edit"></Icon>
          <span class="layout-text">可编辑表格</span>
        </MenuItem>
        <MenuItem name="searchTab">
          <Icon type="search"></Icon>
          <span class="layout-text">可搜索表格</span>
        </MenuItem>
      </Submenu>
      <Submenu name="form">
        <template slot="title">
          <Icon type="android-checkbox"></Icon>
          <span class="layout-text">表单管理</span>
        </template>
        <MenuItem name="composeForm">
          <Icon type="compose"></Icon>
          <span class="layout-text">文章发布</span>
        </MenuItem>
        <MenuItem name="swapForm">
          <Icon type="arrow-swap"></Icon>
          <span class="layout-text">工作流</span>
        </MenuItem>
      </Submenu>
    </Menu>
    <div class="dropdown-container" v-show="shrink">
      <div class="layout-logo-left"></div>
      <Dropdown placement="right-start" name="authority">
        <Button type="text" class="dropdown-btn" @click="changeMenu('authority')">
          <Icon type="key" size="20"></Icon>
        </Button>
      </Dropdown>
      <Dropdown placement="right-start" transfer @on-click="changeMenu">
        <Button type="text" class="dropdown-btn">
          <Icon type="grid" size="20"></Icon>
        </Button>
        <DropdownMenu class="dropdown-menu" slot="list">
          <DropdownItem name="dragTab">
            <Icon type="arrow-move"></Icon>
            <span class="layout-text">可拖拽排序表格</span>
          </DropdownItem>
          <DropdownItem name="editTab">
            <Icon type="compose"></Icon>
            <span class="layout-text">可编辑表格</span>
          </DropdownItem>
          <DropdownItem name="searchTab">
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
          <DropdownItem name="composeForm">
            <Icon type="compose"></Icon>
            <span class="layout-text">文章发布</span>
          </DropdownItem>
          <DropdownItem name="swapForm">
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
    data(){
      return {

      };
    },
    methods: {
      changeMenu (active){
        this.$router.push({
          name: active
        });
        console.log(this.$store.state.currentTag);
        const currentTag = this.$store.state.currentTag;
        this.$store.commit("updateCurrentTag", active);
        localStorage.setItem("currentTag", active);
        if(currentTag !== active){
          this.$store.commit("addOpenedTags", active);
          this.$store.commit("updateCurrentPath", this.$route.fullPath);
        }
      },
      getCurrentPath(pathArr){

      }
    },
    created (){

    }
  };
</script>
