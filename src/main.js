import Vue form "vue";
import router from "./src/router";
import App from "./src/components/App";

//创建vue实例和dom挂载点
new Vue({
  el: "#app",
  router,
  template: "<App></App>",
  components: {App}
})