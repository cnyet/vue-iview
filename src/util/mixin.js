import { mapState } from 'vuex';  //mapState 辅助函数

export default {
  //生成计算属性
  computed: mapState({
    session(state){
      console.log(sessionStorage.getItem("uid"));
      const session = {
        uid: sessionStorage.getItem("uid"),
        account: sessionStorage.getItem("user")
      };
      if(!state.session.uid){
        this.$store.dispatch("updateSession", session);
      }
      return session;
    },
    currentPath : "currentPath",
    openedTags: "openedTags"
  }),
  watch: {
    "$route" (to, from){
      const pagePath = to.fullPath;
      const currentPathArr = pagePath.split("/").filter(item => item!=='');
      console.log(currentPathArr);
      this.$store.commit("updateCurrentPath", pagePath);
      this.$store.commit("updateOpenedTags", currentPathArr);
    }
  },
};
