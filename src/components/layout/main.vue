<template>
		
		<div class="main">
			<header class="top-header box-shadow">
				<div class="left logo" :class='{ "left-indent" : leftActive }'>
				<div class="logo">
					<i class="fa fa-btc"></i>
					<span class="sys">Platform</span>
				</div>
					
				</div>
				<div class="right">
				<a  class="btn no-shadow navbar-btn"  @click='toggleShow'>
            		<i class="fa fa-fw fa-dedent" :class="{'fa-indent' : !leftActive}"></i>
          		</a>

				</div>

		<ul class="nav navbar-nav navbar-right top-navbar" >
   
       
 
          <li class="dropdown closed " :class='{"open" : topNavBar}' dropdown=""  @mouseover='topNavBar=true' @mouseout='topNavBar=false'>
            <a  class="dropdown-toggle clear" dropdown-toggle="" aria-haspopup="true" aria-expanded="true">
              <span class="hidden-sm hidden-md">User：{{userName}}</span> <b class="caret"></b>
            </a>
            <!-- dropdown -->
            <ul class="dropdown-menu animated fadeInRight w">
 
              <li>
                <a >
                  <span class="label bg-info pull-right">new</span>
                  Help
                </a>
              </li>
              <li class="divider"></li>
              <li>
                <a @click='logout'>Logout</a>
              </li>
            </ul>
            <!-- / dropdown -->
         	</li>
        </ul>



	</header>
    
          
          <div class="left-nav" :class='{ "left-indent" : leftActive }'>
            <ul class="nav-ui">
              <li @mouseover='subNavActive = true' @mouseout='subNavActive = false'>
                <a class="active" >
                   <i class=" fa fa-home"></i>
                   <span class="">首页</span>

                   <span class="pull-right text-muted">
      			        	<i class="fa fa-fw fa-angle-right text"></i>
      			        	<i class="fa fa-fw fa-angle-down text-active"></i>
     		 	         </span>
                </a>

                <dl  :class='{"active": subNavActive && !leftActive}'>
                 	<router-link :to="{name:'notice'}">
                 		<dt>公告</dt>
                 	</router-link>
                 	<router-link :to="{name:'online-banner'}">
                 		<dt>Banner</dt>
                 	</router-link>	
                 	<router-link :to="{name:'hot'}">
                 	<dt>
                 		热门
                 	</dt>
                 	</router-link>	
                 	
                 </dl>


              </li>

              <li @mouseover='subNavActive_1 = true' @mouseout='subNavActive_1 = false'>
                 <a  >
                    <i class="fa fa-fw fa-product-hunt"></i>
                    <span class="">产品</span>
                     <span class="pull-right text-muted">
			        	<i class="fa fa-fw fa-angle-right text"></i>
			        	<i class="fa fa-fw fa-angle-down text-active"></i>
     		 	   	 </span>
                  </a>

                 <dl :class='{"active": subNavActive_1 && !leftActive}' >
                  <router-link :to="{name:'category'}">
                    <dt>类别</dt>
                  </router-link> 
                   <router-link :to="{name:'goods'}">
                    <dt>产品</dt>
                  </router-link>  
                 	
               
                  
                 	
                 </dl>
              </li>
            </ul>
          </div>


          <div class="right-content" :class='{ "right-indent" : leftActive }'>

           		<router-view></router-view>
     
          </div>

          </div>     

</template>
<script>
  import {Login} from 'src/common/js/ApiUrl';
	export default {
		name: 'mainPage',
		data (){
			return{
				leftActive:this.$store.state.leftShow,
				subNavActive:false,
				subNavActive_1:false,
				topNavBar:false,
        userName:''
			}
		},
    mounted(){
     this.$nextTick(()=>{
         this.userName = this.$store.state.userName;
         this.leftActive = this.$store.state.leftShow;       
      })
    },
    methods:{
        toggleShow(){
          this.leftActive = !this.leftActive;
       
          this.$store.commit('setLeftToggle', this.leftActive);

        },
    		showMore(e){
    			//e.stopPropagation;
    		},logout(){
          this.axios.post(Login.logout).then((response)=>{
            if(response.data.flag.code==0){
              this.$store.commit('setOut');
              this.$router.push({ name: 'login'})   
            }
          })
        }

    	}
	}
</script>
<style lang='scss'>

  .right-indent{
     left:200px !important;
  }
	.top-header{
		height: 50px;
		display: flex;
		flex-flow: row;
        .left{
        	width: 60px;
        	background: rgb(28, 43, 54);
        	/*transition: all .3s ease;*/
        }
        .logo{
        	line-height: 50px;
        	font-size: 22px;
        	text-align: center;
        	color: #fff;
            border-bottom: 2px solid #080808;
        	span{
        		font-size: 16px;
        		display: none;
        	}
        }
        
    	.right{
    			flex: auto;
          		background: #fff;
    	}
    	.top-navbar{
    		margin: 0px;background: #fff;
    	}


	}
	.left-nav{
		width: 60px;
		position: fixed;
		top:50px;
		bottom: 0;
		z-index: 1000;
		background: rgb(28, 43, 54);
		/*transition: all .3s ease;*/

		.nav-ui{
			 
			padding: 0;
			li{
				    position: relative;
   					display: block;
				    list-style: none;
				>a{

					    position: relative;
					  /*  height: 50px;*/
					    padding: 15px 0;
					    text-align: center;
					    border: none;
					    display: block;
              			color: #c2ccff;
              			&:hover{
        				background: rgba(8, 8, 8, 0.30);

        			     }


					    i{
					    	display: block;
						    float: none;
						    width: auto;
						    margin: 0;
						    font-size: 18px;
						    /*width: 16px;*/
						   /* line-height: 50px;*/
						    border: none !important;

					    }
						span{
							display: none;
							letter-spacing: 2px;
						}
				}

				dl{
                    display: none;
                    margin: 0;
                    background: rgba(8, 8, 8, 0.80);
                    transition: all .8s ease;
                    a.active{
                    	dt{
                    		border-left-color:  #f05050;
                    		color: #fff;
                    	}
                    }

					dt{
						padding: 8px 0 8px 46px;
						cursor: pointer;
						color: #8598a2;
						font-weight: normal;
						border-left: 2px solid rgba(8, 8, 8, 0.80);

						&:hover{
							background: rgba(8, 8, 8, 1);
							color: #fff;
						 	
						}
					}

					&.active{
						display: block;
						width: 200px;
						position: absolute;
						left: 60px;
						top:0;
						background: rgba(8, 8, 8, 0.90);
						dt{
							padding: 8px 0 8px 25px;
							
						}
					}
				}


			}
		}
	}

.left-indent{
        width: 200px !important;

        .logo{

        	  padding-left: 20px;
        	  text-align: left; 
        	  span.sys{
        		font-size: 16px;
        		display: inline;
        		margin-left: 5px;
        		letter-spacing: .5px;
         	  }
        }
	   

        .nav-ui{
        	li{
        		>a{
        			
        			padding: 10px 0;
        			text-align: left;
        			i{
        				font-size: 16px ;
        				display: inline-block  ;
        				float: left;
        				margin: 0 10px 0 20px;
        				position: relative;
        				top: 1.5px;
        				width: 16px;
        			}
        			span{
        				display: inline-block;
        				/*line-height: 36px !important;*/
        			}

        			&.active{
        				background: rgba(8, 8, 8, 0.48);;
        			}
        		 
        		}

        		dl{
        			display: block;
        		}
        	}
        }
  }
  .right-content{
    position: fixed;
    left: 60px;
    top: 50px;
    bottom: 0;
    right: 0;
    background: rgb(240, 243, 244);
    transition: all .3s ease;
    padding: 10px 14px;
    min-width: 900px;
  }
</style>