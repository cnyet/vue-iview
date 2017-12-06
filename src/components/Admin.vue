<template>
<div class="layout">
  <Row type="flex">
    <Col class="layout-menu-left">
      <Menu active-name="1" theme="dark" width="auto">
        <div class="layout-logo-left"></div>
        <MenuItem name="1">
          <Icon type="ios-navigate"></Icon>
          <span class="layout-text">option 1</span>
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-keypad"></Icon>
          <span class="layout-text">option 2</span>
        </MenuItem>
        <MenuItem name="3">
          <Icon type="ios-analytics"></Icon>
          <span class="layout-text">option 3</span>
        </MenuItem>
      </Menu>
    </Col>
    <Col class="layout-menu-right">
      <div class="layout-header">
        <div class="layout-header-menu">
          <Button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem href="#">index</BreadcrumbItem>
            <BreadcrumbItem href="#">apps</BreadcrumbItem>
            <BreadcrumbItem href="#">app</BreadcrumbItem>
          </Breadcrumb>
        </div>
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
export default {
  name: "admin",
  data(){
    return {

    };
  },
  methods: {
    toggleClick(){

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
    z-index: 10;
    transition: width .3s;
    background: #464c5b;
    .layout-logo-left{
      width: 90%;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      margin: 15px auto;
    }
    .layout-text{

    }
  }
  &-menu-right{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 280px;
    .layout-header{

      .layout-header-menu{
        height: 60px;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        background: #fff;
      }
      .layout-breadcrumb{
        padding: 10px 15px 0;
      }
    }

    .layout-content{
      width: 100%;
      position: absolute;

      top: 100px;
      overflow:auto;
      border-radius: 4px;
      &-wrap{
        margin: 15px;
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
</style>
