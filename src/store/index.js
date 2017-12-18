import Vue from 'vue';
//状态管理模式
import Vuex from 'vuex';
import { adminRouter } from "../router/admin";

Vue.use(Vuex);
//创建vuex仓库
export default new Vuex.Store({
  //状态
  state: {
    domain: "http://rap2api.taobao.org/",
    isLogin: false,
    openedTags: [{
      title: "首页",
      name: "admin",
      path: "/admin"
    }],
    currentTag: "",
    currentPath: [{
      title: "首页",
      name: "admin",
      path: "/admin"
    }],
    routers: adminRouter
  },
  //state的计算属性
  getters: {

  },
  //突变
  mutations: {
    updateSession (state, newUserInfo){
      state.session = newUserInfo;
    },
    updateLogin(state, status){
      state.isLogin = status;
    },
    addOpenedTags (state, tag){
      console.log(state.routers);
      let hasTheName = false;
      state.routers.forEach(item => {
        if(item.name === tag){
          hasTheName = true;
        }
      });
      if(!hasTheName){
        state.openedTags.push(tag);
      }
    },
    deleteOpenedTags(state, name){
      state.openedTags.forEach((item, index) => {
        if(item.name === name){
          state.openedTags.splice(index, 1);
        }
      });
    },
    updateCurrentPath(state, pathArr){
      state.currentPath = pathArr;
    },
    updateCurrentTag(state, tag){
      state.currentTag = tag;
    }
  },
  actions: {
    //context具有与state相同方法和属性
    updateSession (context, obj) {
      context.commit("updateLogin", obj.isLogin);
      context.commit("updateCurrentTag", obj.currentTag);
    }
  }
});
