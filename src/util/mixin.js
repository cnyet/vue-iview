import handleStorage from "../util/handleStorage";
import { mapState } from 'vuex';  //mapState 辅助函数

export default {
  //生成计算属性
  computed: mapState({
    session(state){
      console.log(handleStorage.getSession("uid"));
      const session = {
        uid: handleStorage.getSession("uid"),
        account: handleStorage.getSession("user")
      };
      if(state.session.uid){
        this.$store.dispatch("updateUserInfo", session);
      }
      return session;
    }
  })
};
