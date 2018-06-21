<template>
  <div class="contianer">
    <Carousel v-model="value" autoplay loop>
      <CarouselItem>
        <div class="carousel-item">
          <img src="../assets/bg_01.jpg" alt="">
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="carousel-item">
          <img src="../assets/bg_02.jpg" alt="">
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="carousel-item">
          <img src="../assets/bg_03.jpg" alt="">
        </div>
      </CarouselItem>
    </Carousel>
    <div class="nav-container">
      <div class="nav-logo">
        <img src="../assets/logo.png">
      </div>
      <div class="nav-navbar">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Business</a></li>
          <li><a href="#">Work</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li style="margin-left:20px;"><Button type="info" @click="toLogin">登录</Button></li>
        </ul>
      </div>
    </div>
    <div class="row-container">
      <Row :gutter="40" type="flex" justify="center" class="row">
      <Col span="6">
        <span class="circle"></span>
        <h2>HEAD</h2>
        <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
        <p><Button type="primary">Primary</Button></p>
      </Col>
      <Col span="6">
        <span class="circle"></span>
        <h2>HEAD</h2>
        <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
        <p><Button type="primary">Primary</Button></p>
      </Col>
      <Col span="6">
        <span class="circle"></span>
        <h2>HEAD</h2>
        <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
        <p><Button type="primary">Primary</Button></p>
      </Col>
    </Row>
    <Row :gutter="40" type="flex" justify="center" align="middle" class="wrap">
      <Col span="8">
        <h2>First featurette heading. </h2>
        <p>Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
      </Col>
      <Col span="8">
        <span class="wrap-content"></span>
      </Col>
    </Row>
    <Row :gutter="40" type="flex" justify="center" align="middle" class="wrap">
      <Col span="8">
        <span class="wrap-content"></span>
      </Col>
      <Col span="8">
        <h2>First featurette heading. </h2>
        <p>Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
      </Col>
    </Row>
    <Row :gutter="40" type="flex" justify="center" class="wrap">
      <Col span="8">vue</Col>
      <Col span="8" class="wrap-right">&copy; 2017 Company, Inc. &middot;</Col>
    </Row>
  </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data () {
    return {
      value: 0
    };
  },
  methods: {
    toLogin(){
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.contianer{
  position: relative;
  .carousel-item{
    height: 100vh;
    background-color: #f8f8f9;
  }
  .nav-container{
    width: 100%;
    height: 80px;
    padding: 0 80px;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    .nav-logo{
      padding: 15px;
      float: left;
      img{
        width: 50px;
        height: 50px;
      }
    }
    .nav-navbar{
      float: right;
      ul{
        li{
          display: inline-block;
          float: left;
          line-height: 80px;
          a{
            display: block;
            height: 100%;
            color: #fff;
            padding: 0 20px;
            font-size: 14px;
            &:hover{
              color: #5cadff;
              text-decoration: none;
            }
          }
        }
        &:after{
          content: "";
          display: table;
          clear: both;
        }
      }
    }
    &:after{
      content: "";
      display: table;
      clear: both;
    }
  }
  .row-container{
    margin: 0 20px;
    .row{
      padding: 30px 0;
      text-align: center;
      margin: 0;
      .circle{
        width: 200px;
        height: 200px;
        display: inline-block;
        border-radius: 50%;
        background-color: #f8f8f9;
      }
    }
    .wrap{
      padding: 30px 0;
      margin: 0;
      &-content{
        width: 100%;
        height: 300px;
        display: inline-block;
        background-color: #eee;
      }
      &-right{
        text-align: right;
      }
    }
  }
}
</style>
