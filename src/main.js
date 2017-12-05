// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
/**
 *fastclick消除在移动浏览器上触发click事件与一个物理Tap(敲击)之间的300延迟,chrome32+的meta头信息中设置width=device-width就不需用本插件
 *IE10可以用-ms-touch-action: manipulation，IE11 + 你可以设置 touch-action: manipulation，来禁用通过双击放大某些元素
 */
import iView from "iview";
import App from './App';
import router from './router';
import "iview/dist/styles/iview.css";
import handleCookie from "./util/handleCookie";
import store from "./store";

Vue.use(iView);
Vue.config.productionTip = false;

/**
 * 路由的切换过程，本质上是执行一系列路由钩子函数,
 * 钩子函数总体上分为两大类:
 * 全局的钩子函数和组件的钩子函数
 * 全局钩子函数有2个
 * beforeEach：在路由切换开始时调用
 * afterEach：在每次路由切换成功进入激活阶段时被调用
 * next函数主要负责将控制权交给下一个中间件
 */
//全局导航守卫中检查元字段
//$route.matched是所有路由记录数组
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!sessionStorage.getItem("uid")){
      next({
        path: "/login",
        query: { redirect: to.fullPath }    //查询参数
      });
    }else{
      next();
    }
  }else {
    next();
  }
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

new Vue({
  el: "#app",
  router,
  store,
  // template: '<App/>',
  // components: { App }
  render: h => h(App),
  methods: {
    /* 检查是否存在session */
    checkLogin: function(){
      if(!handleCookie.getCookie("session")){
        this.$router.push("/login");
      }
    }
  },
  //vue实例被创建之后执行
  created: function(){
    // this.checkLogin();
  }
});
