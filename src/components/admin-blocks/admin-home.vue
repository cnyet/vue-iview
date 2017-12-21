<template>
  <div class="home-container">
    <Row>
      <Col :md="24" :lg="8">
        <Row class="home-row1" :gutter="10">
          <Col :md="12" :lg="24">
            <Card>
              <Row type="flex" class="user-info">
                <Col span="8">
                  <img :src="imgSrc" class="user-img">
                </Col>
                <Col span="16">
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
          <Col :md="12" :lg="24"></Col>
        </Row>
      </Col>
      <Col :md="24" :lg="16"></Col>
    </Row>
  </div>
</template>

<script>
import imgSrc from "../../assets/avatar.jpg";
import util from "../../util";
export default {
  name: "adminHome",
  data(){
    return {
      imgSrc: imgSrc,
      userName: "",
      prevAddr: "上海"
    };
  },
  filters: {
    format(date, fmt){
      return util.formatDate(date, "yyyy-MM-dd");
    }
  },
  methods: {

  },
  created (){
    this.userName = util.getCookie("user");
  }
};
</script>

<style lang="less" scoped>
.home-container{
  .home-row1{
    .user-info{
      .user-img{
        width: 100px;
        vertical-align: middle;
      }
      .user-name{
        color: #2d8cf0;
      }
    }
    .line-grey{
      height: 0;
      margin: 15px 0;
      border-bottom: 2px solid #dcdcdc;
    }
  }
}
</style>
