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
    <Menu theme="dark" width="auto" :active-name="$route.name"
     :open-names="openedSubmenuArr" @on-select="changeMenu" @on-open-change="changeSubmenu" v-show="!shrink">
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
      <Submenu name="comp">
        <template slot="title">
          <Icon type="gear-b"></Icon>
          <span class="layout-text">组件管理</span>
        </template>
        <MenuItem name="imageEdit">
          <Icon type="crop"></Icon>
          <span class="layout-text">图片预览编辑</span>
        </MenuItem>
        <MenuItem name="uploadFile">
          <Icon type="android-upload"></Icon>
          <span class="layout-text">文件上传</span>
        </MenuItem>
      </Submenu>
    </Menu>
    <div class="dropdown-container" active-name="" v-show="shrink">
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
      <Dropdown placement="right-start">
        <Button type="text" class="dropdown-btn">
          <Icon type="gear-b" size="20"></Icon>
        </Button>
        <DropdownMenu class="dropdown-menu" slot="list">
          <DropdownItem name="imageEdit">
            <Icon type="crop"></Icon>
            <span class="layout-text">图片预览编辑</span>
          </DropdownItem>
          <DropdownItem name="swapForm">
            <Icon type="android-upload"></Icon>
            <span class="layout-text">文件上传</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import mixin from "../../utils/mixin";
import { adminRouter } from "../../router/admin";
export default {
  name: "menuLists",
  mixins: [mixin],
  props: ["shrink"],
  data(){
    return {

    };
  },
  methods: {
    changeMenu (active){
      if(this.currentTag !== active){
        let tags = null;
        for(let ele of adminRouter){
          if(ele.name===active){
            tags = {
              title: ele.title,
              name: ele.name,
              path: ele.path
            };
            break;
          }else{
            if(ele.children.length){
              for(let val of ele.children){
                if(val.name === active){
                  tags = {
                    title: val.title,
                    name: val.name,
                    path: val.path
                  };
                  break;
                }
              }
            }
          }
        }
        localStorage.setItem("currentTag", active);
        this.$store.commit("updateCurrentTag", active);
        this.$store.commit("updateOpenedTags", [tags]);
        this.$store.commit("updateCurrentPath", active);
        this.$router.push({
          name: active
        });
      }
    },
    changeSubmenu(arr){
      this.$store.commit("openedSubmenu", arr);
      localStorage.setItem("openedSubmenu", JSON.stringify(arr));
    }
  },
  created (){

  }
};
</script>
