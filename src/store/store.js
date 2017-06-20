import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0,
    isLogin: sessionStorage.isLogin ? true : false,
    userName: sessionStorage.userName ?  sessionStorage.userName  :'',
    token : '',
    leftShow: localStorage.isShow=='true' ? true  : false
  },mutations:{
  	setLogin(state,username){
  		 state.isLogin = true;
  		 state.userName = username;
  		 sessionStorage.userName = username;
  		 sessionStorage.isLogin = true; 		 
  	},
  	setOut(state){
  		state.isLogin = false;
  		state.userName = ''
  		sessionStorage.isLogin = false;
  		sessionStorage.userName = '';
  	},
    setLeftToggle(state, val){
      localStorage.isShow = val;

      state.leftShow = val;
    }
  }
})
export default store;