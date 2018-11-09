<template>
<div class="layout" :class="{'layout-hide-text': shrink}">
  <Row type="flex">
    <Col class="layout-menu-left">
      <menu-lists :shrink="shrink"></menu-lists>
    </Col>
    <Col class="layout-menu-right">
      <div class="layout-header">
        <div class="header-menu">
          <Button class="menu-btn" type="text" @click="toggleClick">
            <Icon type="arrow-right-c" size="32" v-if="shrink"></Icon>
            <Icon type="navicon" size="32" v-else></Icon>
          </Button>
        </div>
        <div class="header-panel">
          <div class="header-panel-icon">
            <message-tip v-model="mesCount"></message-tip>
          </div>
          <div class="header-panel-user">
            <Dropdown transfer class="header-dropdown" trigger="click" @on-click="handleDropdown">
              <a href="javascript:void(0)" :data-uid="userInfo.uid">
                  {{userInfo.user}}<Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                  <DropdownItem name="userCenter">个人中心</DropdownItem>
                  <DropdownItem name="logout">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Avatar class="avatar" :src="avatarSrc"></Avatar>
          </div>
        </div>
        <div class="header-breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem
              v-for="(item, index) in currentPath"
              :key="item.name"
              :href="showHref(item, index)">{{item.title}}</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
      <div class="tags-wrap">
        <tag-lists :shrink="shrink" :offsetLeft="tagOffsetLeft"></tag-lists>
      </div>
      <div class="layout-content">
        <div class="layout-page">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </Col>
  </Row>
</div>
</template>

<script>
import mixin from "../utils/mixin";
import { adminRouter } from "../router/admin";
import utils from "../utils";
import messageTip from "../components/admin-blocks/message-tip";
import menuLists from "../components/admin-blocks/menu-lists";
import tagLists from "../components/admin-blocks/tag-lists";
import imgSrc from "../assets/images/avatar.jpg";
export default {
  name: "admin",
  mixins: [mixin],
  components: {
    messageTip,
    menuLists,
    tagLists,
  },
  data(){
    const img = new Image().src=imgSrc;
    return {
      shrink: false,
      avatarSrc: img,
      dataSource: null,
      mesCount: 3,
      userInfo: null,
      tagOffsetLeft: false
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    toggleClick(){
      this.shrink = !this.shrink;
    },
    handleDropdown(name){
      if(name === "userCenter"){
        if(this.currentTag !== name){
          let tags = null;
          for(let ele of adminRouter){
            if(ele.name===name){
              tags = {
                title: ele.title,
                name: ele.name,
                path: ele.path
              };
              break;
            }else{
              if(ele.children.length){
                for(let val of ele.children){
                  if(val.name === name){
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
          localStorage.setItem("currentTag", name);
          this.$store.commit("updateCurrentTag", name);
          this.$store.commit("updateOpenedTags", [tags]);
          this.$store.commit("updateCurrentPath", name);
          this.$router.push({
            name: "userCenter"
          });
        }
      }else if(name === "logout"){
        localStorage.clear();
        this.$store.commit("updateLogin", false);
        this.$store.commit("updateSession", null);
        utils.delCookie("uid");
        utils.delCookie("user");
        this.$router.push("/login");
      }
    },
    showHref(item, index){
      let len = this.currentPath.length;
      if((index!==len-1) && item.name!=='tables' && item.name!=='forms' && item.name!=='component'){
        return item.path;
      }else{
        return null;
      }
    },
    getUserInfo(){
      return {user: utils.getCookie("user"), uid: utils.getCookie("uid")};
      // this.$http.get("/GET/userLists").then(function(res){
      //   if(res.readyState === 4 && res.status === 200){
      //     this.dataSource = res.data;
      //   }
      // }).catch(function(error){
      //   console.log(error);
      // });
    }
  },
  created(){
    this.userInfo = this.getUserInfo();
  }
};
</script>

<style lang="less" scoped>
.layout{
  width: 100%;
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  &-menu-left{
    width: 200px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    transition: width .3s;
    background: #464c5b;
    transition: width .2s ease-in-out;
  }
  &-menu-right{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 200px;
    .layout-header{
      height: 60px;
      padding-left: 60px;
      overflow: hidden;
      box-shadow: 0 1px 2px 2px rgba(0,0,0,.1);
      background: #fff;
      .header-menu{
        float: left;
        margin-left: -60px;
        .menu-btn{
          padding: 13px 20px;
          border: 0;
        }
      }
      .header-breadcrumb{
        line-height: 30px;
        margin-right: 220px;
        padding: 15px 15px;
      }
      .header-panel{
        height: 100%;
        width: 220px;
        float: right;
        overflow: hidden;
        .header-panel-icon{
          float: left;
          width: 40%;
          text-align: right;
          height: 60px;
        }
        .header-panel-user{
          width: 60%;
          font-size: 14px;
          padding: 14px 15px;
          text-align: right;
          float: right;
          .header-dropdown{
            text-align: center;
          }
          .avatar{
            margin-left: 10px;
          }
        }
      }
    }
    .tags-wrap{
      height: 44px;
      box-shadow: 0 1px 1px 1px rgba(128,128,128,.1);
    }
    .layout-content{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 106px;
      border-radius: 4px;
      overflow: auto;
      .layout-page{
        margin: 10px;
      }
    }
    .layout-copyright{
      font-size: 14px;
      text-align: center;
    }
  }
}
.layout-hide-text {
  .layout-menu-left{
    width: 60px;
  }
  .layout-menu-right{
    left: 60px;
  }
}
</style>
