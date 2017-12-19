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
      let hasTheName = false;
      state.openedTags.forEach(item => {
        if(item.name === tag){
          hasTheName = true;
        }
      });
      if(!hasTheName){
        let tagObj = null;
        adminRouter.forEach(item => {
          if(item.name === tag){
            tagObj = {
              title: item.title,
              name: item.name,
              path: item.path
            };
          }else{
            if(item.children.length){
              item.children.forEach(ele => {
                if(ele.name === tag){
                  tagObj = {
                    title: ele.title,
                    name: ele.name,
                    path: ele.path
                  };
                }
              });
            }
          }
        });
        state.openedTags.push(tagObj);
        localStorage.openedTags = state.openedTags;
      }
    },
    deleteOpenedTags(state, name){
      state.openedTags.forEach((item, index) => {
        if(item.name === name){
          state.openedTags.splice(index, 1);
        }
      });
    },
    updateCurrentPath(state, path){
      let pathArr = path.split("/").filter(item => item!=="");
      let arr = pathArr.filter(item => state.currentPath.findIndex(ele => ele!==item));
      console.log(arr);
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
        localStorage.currentPath = state.currentPath;
      }
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
      context.commit("addOpenedTags", obj.openedTags);
      context.commit("updateCurrentPath", obj.currentPath);
    }
  }
});
