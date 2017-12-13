import Vue from 'vue';
//状态管理模式
import Vuex from 'vuex';

Vue.use(Vuex);
//创建vuex仓库
export default new Vuex.Store({
  //状态
  state: {
    domain: "http://rap2api.taobao.org/",
    session: {
      account: null,
      uid: null
    },
    openedTags: [{
      title: "首页",
      name: "admin",
      path: "admin"
    }],
    currentPath: null
  },
  //突变
  mutations: {
    updateSession (state, newUserInfo){
      state.session = newUserInfo;
    },
    updateOpenedTags (state, tags){
      let hasTheName = false;
      state.openedTags.forEach(item => {
        if(item.name === tags.name){
          hasTheName = true;
        }
      });
      if(!hasTheName){
        state.openedTags.push(tags);
      }
    },
    updateCurrentPath(state, path){
      state.currentPath = path;
    }
  },
  actions: {
    //context具有与state相同方法和属性
    updateSession (context) {
      context.commit("updateSession");
    }
  }
});
