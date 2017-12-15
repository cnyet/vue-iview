import { mapState } from 'vuex';  //mapState 辅助函数

export default {
  //生成计算属性
  computed: mapState({
    isLogin: "isLogin",
    currentPath: "currentPath",
    openedTags: "openedTags",
    currentTag: "currentTag"
  }),
  watch: {
    "$route" (to, from){
      console.log(to.fullPath);
      const pagePath = to.fullPath;
      const currentPathArr = pagePath.split("/").filter(item => item!=='');
      const len = this.$store.state.openedTags.length;
      const tag = this.$store.state.openedTags[len-1].name;
      const currentTag = currentPathArr.pop();
      console.log(tag, currentTag);
      this.$store.commit("updateCurrentTag", tag);
      if(tag !== currentTag){
        this.$store.commit("deleteOpenedTags", tag);
      }
    }
  },
};
