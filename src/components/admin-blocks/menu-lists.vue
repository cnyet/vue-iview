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
    .dropdown-btn{
      margin: 8px 5px;
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
    <div class="dropdown-container" v-show="shrink">
      <div class="layout-logo-left"></div>
      <Dropdown placement="right-start" name="auth">
        <Button type="text" class="dropdown-btn" @click="changeMenu('auth')">
          <Icon type="key" size="20"></Icon>
        </Button>
      </Dropdown>
      <Dropdown placement="right-start">
        <Button type="text" class="dropdown-btn">
          <Icon type="grid" size="20"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="表格一">
            <span class="layout-text">表格一</span>
          </DropdownItem>
          <DropdownItem name="表格二">
            <span class="layout-text">表格二</span>
          </DropdownItem>
          <DropdownItem name="表格三">
            <span class="layout-text">表格三</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown placement="right-start">
        <Button type="text" class="dropdown-btn">
          <Icon type="android-checkbox" size="20"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="表单一">
            <span class="layout-text">表格一</span>
          </DropdownItem>
          <DropdownItem name="表单二">
            <span class="layout-text">表格二</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>

    <!-- <Menu theme="dark" width="auto" @on-select="changeMenu" v-show="shrink">

      <MenuItem name="auth">
        <Icon type="key" size="22"></Icon>
      </MenuItem>
      <Submenu name="table">
        <template slot="title">
          <Icon type="grid" size="22"></Icon>
        </template>
        <MenuItem name="表格一"></MenuItem>
        <MenuItem name="表格二"></MenuItem>
        <MenuItem name="表格三"></MenuItem>
      </Submenu>
      <Submenu name="form">
        <template slot="title">
          <Icon type="android-checkbox" size="22"></Icon>
        </template>
        <MenuItem name="表单一"></MenuItem>
        <MenuItem name="表单二"></MenuItem>
      </Submenu>
    </Menu> -->
  </div>
</template>

<script>
  export default {
    name: "menuLists",
    props: ["shrink"],
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
