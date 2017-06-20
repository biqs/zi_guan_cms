import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import axios from 'axios'; 
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

import store from 'src/store/store';
 
import {Login} from 'src/common/js/ApiUrl';


import login from 'components/login/login';
import mainPage from 'components/layout/main';

import notice from 'components/index/notice';

import banner from 'components/index/banner';
import onlineBanner from 'components/index/banners/online';
import offlineBanner from 'components/index/banners/offline';

//热门
import hotProduct from 'components/index/hotProduct';


/*产品分类*/
import pCategory from 'components/product/category';

import goods from 'components/product/goods'

 
//保持位置
const scrollBehavior = (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
  	} 
let router =  new Router({

  linkActiveClass:'active',
  scrollBehavior,
  routes: [
    {
     path: '/',
     redirect: '/main',
     meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
     } 
    },
    {
	 	 path: '/login',
     name:'login',
	 	 component: login/*,
     meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
     }*/
      
    },
    {
      path:'/main',
      component : mainPage,
      meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },      
      children:[
         {
           path:'/',
           meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
           },
           component: notice
         },
         {
           name:'notice',
           path:'notice',
           meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
           },
           component: notice
         },
         
         {
           name:'banner',
           path:'banner',
           component:banner,
           meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
           },
           children:[
           
            {
              path:'online',
              name:'online-banner',
              meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              },
              component:onlineBanner
            },
            {
              path:'offline',
              name:'offline-banner',
              meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              },
              component:offlineBanner
            }
           ]
         }, 
         {
           path:'hot',
           name:'hot',
           meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
           },
           component:hotProduct
         },{
           path:'category',
           name:'category',
           meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
           },
           component : pCategory
         },
         {
           path:'goods',
           meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
           },           
           name:'goods',
           component : goods
         }

      ]
    }
  
  ]
})

router.beforeEach((to, from, next)=>{
    if(to.meta.requireAuth) {  // 判断该路由是否需要登录权限      
        if(!store.state.isLogin){
          next({path:'/login'});  
        }else{
          next()
        }        
    }
    else {
        next();
    }
  
})


/*上线环境*/
/*router.beforeEach((to, from, next)=>{
    if(to.meta.requireAuth) {  // 判断该路由是否需要登录权限

             
          if(!store.state.isLogin){
            axios.post(Login.login).then(response=>{
                if(response.data.flag.code==0 && response.data.token.length > 0){
                   store.commit('setLogin',response.data.userName);
                   sessionStorage.token = response.data.token.length;  
                   next({ name: 'notice'})   
                }else{  
                   alert(response.data.flag.msg);
                   window.location.href='http://eip.htsc.com.cn';         
                }
            }).catch(()=>{
                 alert('请求异常！');
                 window.location.href='http://eip.htsc.com.cn'; 
            })
          }else{
              if(to.path=='/login'){
                  next({ name: 'notice'})
              }else{
                  next();
              } 
              
          }
          
            
    }
    else {
        next();
    }
  
})
*/
export default router;