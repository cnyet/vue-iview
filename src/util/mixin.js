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
        this.$store.dispatch("updateUserInfo", session);
      }
      return session;
    }
  })
};
