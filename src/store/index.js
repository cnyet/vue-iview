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
    openedSubmenuArr: [],  //展开的菜单数组
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
    updateOpenedTags (state, tags){
      console.log(tags);
      let hasTheName = false;
      for(let item of state.openedTags){
        if(item.name === tags.name){
          hasTheName = true;
          break;
        }
      }
      if(!hasTheName){
        state.openedTags.push(tags);
        localStorage.openedTags = JSON.stringify(state.openedTags);
      }
    },
    deleteOpenedTags(state, name){
      for(let i=0; i<state.openedTags.length; i++){
        if(state.openedTags[i].name === name){
          state.openedTags.splice(i, 1);
          break;
        }
      }
    },
    updateCurrentPath(state, path){
      state.currentPath = state.currentPath.filter(item => item.name==="admin");
      let pathArr = path.split("/").filter(item => item!=="");
      let arr = pathArr.filter(item => state.currentPath.findIndex(ele => ele.name===item)===-1);
      if(arr.length){
        let tagArr = arr.map(item => {
          let tagObj = null;
          for(let ele of adminRouter){
            if(item === ele.name){
              tagObj = {
                title: ele.title,
                name: ele.name,
                path: ele.path
              };
              break;
            }else{
              if(ele.children.length){
                for(let val of ele.children){
                  if(item === val.name){
                    tagObj = {
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
          return tagObj;
        });
        state.currentPath = state.currentPath.concat(tagArr);
        localStorage.currentPath = JSON.stringify(state.currentPath);
      }
    },
    updateCurrentTag(state, tag){
      state.currentTag = tag;
      localStorage.currentTag = tag;
    }
  },
  actions: {
    //context具有与state相同方法和属性
    updateSession (context, obj) {
      context.commit("updateLogin", obj.isLogin);
      context.commit("updateCurrentTag", obj.currentTag);
      context.commit("updateOpenedTags", obj.openedTags);
      context.commit("updateCurrentPath", obj.currentPath);
    }
  }
});
