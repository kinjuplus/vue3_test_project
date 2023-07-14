import { createStore } from "vuex";
import * as getters  from './getters';
import * as actions  from './actions';
import * as mutations  from './mutations';


export default createStore({
  state: {
    userInfo:{},
    lang:'tw'
  },
  mutations,
  actions,
  getters
  /*getters: {
    getUserInfo(state){
      return state.userInfo;
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {},
  modules: {},*/
});
