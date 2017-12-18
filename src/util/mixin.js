import { mapState } from 'vuex';  //mapState 辅助函数

export default {
  //生成计算属性
  computed: mapState({
    isLogin: "isLogin",
    currentPath: "currentPath",
    openedTags: "openedTags",
    currentTag: "currentTag"
  }),

};
