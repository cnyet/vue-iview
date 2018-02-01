<template>
  <div class="home-container">
    <Row :gutter="10">
      <Col :md="24" :lg="8">
        <Row class="home-row1" :gutter="10">
          <Col :md="12" :lg="24">
            <Card>
              <Row type="flex" class="user-info">
                <Col span="8">
                  <img :src="imgSrc" class="user-img">
                </Col>
                <Col span="16" class="user-box">
                  <div>
                    <h1 class="user-name">{{userName}}</h1>
                    <p>管理员</p>
                  </div>
                </Col>
              </Row>
              <div class="line-grey"></div>
              <p class="prev-date">上次登录时间：{{new Date() | format}}</p>
              <p class="prev-addr">上次登录地点：{{prevAddr}}</p>
            </Card>
          </Col>
          <Col :md="12" :lg="24" class="todo-wrap">
            <Card>
              <p slot="title" class="card-title">
                <Icon type="android-checkbox-outline"></Icon> 待办事项
              </p>
              <a type="text" slot="extra" @click.prevent="addNewToDoItem">
                <Icon type="plus-round"></Icon>
              </a>
              <Modal v-model="showNewTodo" title="添加新的代办事项" @on-ok="addNewTodo" @on-cancel="cancelAdd">
                <Row type="flex" justify="center">
                  <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px"></Input>
                </Row>
                <Row slot="footer">
                  <Button type="text" @click="cancelAdd">取消</Button>
                  <Button type="primary" @click="addNewTodo">确定</Button>
                </Row>
              </Modal>
              <div class="todo-content">
                <div class="todo-list" v-for="(item, index) in todoList" :key="item.id">
                  <Row>
                    <Col span="2" class="todo-left">
                      <Checkbox @on-change="changeTodoItem"></Checkbox>
                    </Col>
                    <Col span="22" class="todo-right">
                      <p class="todo-list-text">{{item.name}}</p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col :md="24" :lg="16">
        <Row :gutter="5">
          <Col :xs="24" :sm="12" :md="6">
            <Card :padding="0">
              <Row class="infor-card">
                <Col class="infor-icon infor-color1" span="8">
                  <Icon type="android-person-add" size="40"></Icon>
                </Col>
                <Col span="16" class="infor-text">
                  <p class="infor-text-num">496</p>
                  <p class="infor-text-val">今日新增用户</p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col :xs="24" :sm="12" :md="6">
            <Card :padding="0">
              <Row class="infor-card">
                <Col class="infor-icon infor-color2" span="8">
                  <Icon type="ios-eye" size="40"></Icon>
                </Col>
                <Col span="16" class="infor-text">
                  <p class="infor-text-num">3264</p>
                  <p class="infor-text-val">今日浏览量</p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col :xs="24" :sm="12" :md="6">
            <Card :padding="0">
              <Row class="infor-card">
                <Col class="infor-icon infor-color3" span="8">
                  <Icon type="upload" size="40"></Icon>
                </Col>
                <Col span="16" class="infor-text">
                  <p class="infor-text-num">5K+</p>
                  <p class="infor-text-val">今日数据采集量</p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col :xs="24" :sm="12" :md="6">
            <Card :padding="0">
              <Row class="infor-card">
                <Col class="infor-icon infor-color4" span="8">
                  <Icon type="shuffle" size="40"></Icon>
                </Col>
                <Col span="16" class="infor-text">
                  <p class="infor-text-num">3498</p>
                  <p class="infor-text-val">今日服务调用量</p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Card :padding="0" class="map-card">
            <p slot="title" class="card-title">
              <Icon type="map"></Icon> 今日服务调用地理分布
            </p>
            <div class="map-wrap">
              <Col span="10">
              <div class="map-table">
                <Table height="260" :columns="columns" :data="cityData" style="width:100%;"></Table>
              </div>
              </Col>
              <Col span="14" class="map-content">
                <Row type="flex" justify="center" align="middle">
                  <admin-map></admin-map>
                </Row>
              </Col>
            </div>
          </Card>
        </Row>
      </Col>
    </Row>
    <Row :gutter="10" class="chart-wrap">
      <Col :md="24" :lg="8">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="android-map"></Icon> 上周每日来访量统计
          </p>
          <div class="chart-content">
            <visite-volume></visite-volume>
          </div>
        </Card>
      </Col>
      <Col :md="24" :lg="8">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon> 数据来源统计
          </p>
          <div class="chart-content">
            <data-source-pie></data-source-pie>
          </div>
        </Card>
      </Col>
      <Col :md="24" :lg="8">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="android-wifi"></Icon> 各类用户服务调用变化统计
          </p>
          <div class="chart-content">
            <user-flow></user-flow>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import imgSrc from "@/assets/avatar.jpg";
import util from "@/util";
import adminMap from "./admin-map";
import visiteVolume from "./visite-volume";
import dataSourcePie from "./data-source";
import userFlow from "./user-flow";
export default {
  name: "adminHome",
  components: {
    adminMap,
    visiteVolume,
    dataSourcePie,
    userFlow
  },
  data(){
    return {
      imgSrc: imgSrc,
      userName: "",
      prevAddr: "上海",
      todoList: null,
      visibleData: null,
      todoItem: [],
      showNewTodo: false,
      newToDoItemValue: "",
      columns: [
        {
          title: "编号",
          key: "id"
        }, {
          title: '城市',
          key: 'name'
        }, {
          title: '流量',
          key: 'value'
        }
      ],
      cityData: []
    };
  },
  filters: {
    format(date, fmt){
      return util.formatDate(date, "yyyy-MM-dd");
    }
  },
  methods: {
    getTodoList(vm){
      this.$http.get("/GET/todolist").then(function(res){
        if(res.status === 200){
          vm.todoList = res.data.data;
        }
      }).catch(function(error){
        console.log(error);
      });
    },
    getCityList(vm){
      this.$http.get("/GET/citylist").then(function(res){
        if(res.status === 200){
          vm.cityData = res.data.data;
        }
      }).catch(function(error){
        console.log(error);
      });
    },
    addNewToDoItem(){
      this.showNewTodo = true;
    },
    changeTodoItem(value){
      console.log(value);
      // this.todoItem = !this.todoItem;
    },
    cancelAdd(){
      this.showNewTodo = false;
      this.newToDoItemValue = '';
    },
    addNewTodo(){
      if (this.newToDoItemValue.length !== 0) {
        this.todoList.unshift({
            name: this.newToDoItemValue
        });
        setTimeout(() => {
            this.newToDoItemValue = '';
        }, 200);
        this.showNewTodo = false;
      } else {
        this.$Message.error('请输入待办事项内容');
      }
    },
  },
  created (){
    this.userName = util.getCookie("user");
    this.getTodoList(this);
    this.getCityList(this);
  }
};
</script>

<style lang="less" scoped>
.home-container{
  .home-row1{
    .user-info{
      .user-img{
        width: 100px;
      }
      .user-box{
        display: flex;
        align-items: center;
        .user-name{
          color: #2d8cf0;
        }
      }
    }
    .line-grey{
      height: 2px;
      margin: 15px 0;
      background-color: #dcdcdc;
    }
    .todo-wrap{
      margin-top: 10px;
      .todo-content{
        height: 145px;
        overflow: auto;
        .todo-list-text{
          height: 36px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: pointer;
        }
      }
    }
  }
  .card-title{
    color: #1c2438;
  }
  .infor-card{
    height: 100px;
    padding: 0;
    .infor-icon{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: white;
      border-radius: 3px 0 0 3px;
      &.infor-color1{
        background-color: #2d8cf0;
      }
      &.infor-color2{
        background-color: #64d572;
      }
      &.infor-color3{
        background-color: #ffd572;
      }
      &.infor-color4{
        background-color: #f25e43;
      }
    }
    .infor-text{
      padding: 15px 10px;
      text-align: center;
      height: 100%;
      .infor-text-num{
        font-size: 30px;
        font-weight: bold;
        color: #2d8cf0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .infor-text-val{
        line-height: 20px;
        font-size: 12px;
        font-weight: 500;
        color: #c8c8c8;
      }
    }
  }
  .map-card{
    margin-top: 10px;
    .map-wrap{
      height:290px;
      .map-table{
        padding: 15px 5px;
      }
    }
  }
  .chart-wrap{
    margin-top: 10px;
    .chart-content{
      padding: 15px;
    }
  }
}
</style>
