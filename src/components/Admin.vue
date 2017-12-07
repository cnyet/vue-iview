<template>
<div class="layout" :class="{'layout-hide-text': shrink}">
  <Row type="flex">
    <Col class="layout-menu-left">
      <Menu active-name="1" theme="dark" width="auto">
        <div class="layout-logo-left"></div>
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            <span class="layout-text">item 1</span>
          </template>
          <MenuItem name="1-1">
            <span class="layout-text">option 1</span>
          </MenuItem>
          <MenuItem name="1-2">
            <span class="layout-text">option 2</span>
          </MenuItem>
          <MenuItem name="1-3">
            <Icon type="ios-analytics"></Icon>
            <span class="layout-text">option 3</span>
          </MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            <span class="layout-text">item 2</span>
          </template>
          <MenuItem name="2-1">
            <span class="layout-text">option 1</span>
          </MenuItem>
          <MenuItem name="2-2">
            <span class="layout-text">option 2</span>
          </MenuItem>
          <MenuItem name="2-3">
            <span class="layout-text">option 3</span>
          </MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
            <span class="layout-text">item 3</span>
          </template>
          <MenuItem name="3-1">
            <span class="layout-text">option 1</span>
          </MenuItem>
          <MenuItem name="3-2">
            <span class="layout-text">option 2</span>
          </MenuItem>
          <MenuItem name="3-3">
            <span class="layout-text">option 3</span>
          </MenuItem>
        </Submenu>
      </Menu>
    </Col>
    <Col class="layout-menu-right">
      <div class="layout-header">
        <div class="header-menu">
          <Button class="menu-btn" type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <div class="header-panel">
          <div class="header-panel-icon"></div>
          <div class="header-panel-user">
            <Dropdown class="header-dropdown" trigger="click">
              <a href="javascript:void(0)">
                  {{session.account}}<Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                  <DropdownItem>个人中心</DropdownItem>
                  <DropdownItem>退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Avatar class="avatar" :src="avatarSrc"></Avatar>
          </div>
        </div>
        <div class="header-breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem href="#">index</BreadcrumbItem>
            <BreadcrumbItem href="#">apps</BreadcrumbItem>
            <BreadcrumbItem href="#">app</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
      <div class="tags-wrap">
        <Tag type="dot" color="blue">首页</Tag>
      </div>
      <div class="layout-content">
        <div class="layout-content-wrap">

        </div>
      </div>
    </Col>
  </Row>
</div>
</template>

<script>
import mixin from "../util/mixin";
import imgSrc from "../assets/avatar.jpg";
export default {
  name: "admin",
  mixins: [mixin],
  data(){
    const img = new Image().src=imgSrc;
    return {
      shrink: false,
      avatarSrc: img
    };
  },
  methods: {
    toggleClick(){
      if(this.shrink){
        this.shrink = false;
      }else{
        this.shrink = true;
      }
    }
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
    width: 280px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    transition: width .3s;
    background: #464c5b;
    transition: width .2s ease-in-out;
    .layout-logo-left{
      width: 90%;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      margin: 15px auto;
    }
  }
  &-menu-right{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 280px;
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
        margin-right: 300px;
        padding: 15px 15px;
      }
      .header-panel{
        height: 100%;
        width: 300px;
        float: right;
        overflow: hidden;
        .header-panel-icon{

        }
        .header-panel-user{
          width: 50%;
          height: 60px;
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
      padding: 5px 15px 0;
      height: 40px;
    }
    .layout-content{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 100px;
      margin: 10px 15px;
      border-radius: 4px;
      overflow: auto;
      &-wrap{
        background-color: #fff;
        height: 100%;
      }
    }
    .layout-copyright{
      font-size: 14px;
      text-align: center;
    }
  }
}
.layout-hide-text {
  .layout-text{
    display: none;
  }
  .layout-menu-left{
    width: 80px;
  }
  .layout-menu-right{
    left: 80px;
  }
}
</style>
