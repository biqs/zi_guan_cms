
import 'common/css/common.css';
import 'common/css/font-awesome.min.css';
import 'common/css/animate.css';
   // import 'common/bootstrap@3/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'common/css/app.css';
import 'element-ui/lib/theme-default/index.css'; 

import Vue from 'vue';
import App from './App';
 
import router from 'src/router';
import store from 'src/store/store';
import axios from 'axios'; 
import VueAxios from 'vue-axios';
import Toast from 'vue-easy-toast'


import Vuelidate from 'vuelidate';
import ElementUi from 'element-ui';

import vmodal from 'vue-js-modal';

Vue.use(vmodal)
Vue.use(Toast); //提示

Vue.use(Vuelidate); //验证
Vue.use(ElementUi); //
 
 
 
Vue.use(VueAxios, axios);

axios.interceptors.response.use(function (response) {
 
		    if(response.data){
		      if(response.data.flag){
		      	   //超时判断
		           if(response.data.flag.code=='-502'){
		           		 alert('登录超时，请重新登录！')
                		 window.location.href='http://eip.htsc.com.cn'; 
		           }
		      }
		    }
		    //Colse请求加载...	   
		    return response;
	}, function (error) {   
	 	
	  return Promise.reject(error);
});




new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
  router
  
})


