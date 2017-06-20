 <template>
 	 <div class="container" id='login'>
	 
      <form class="form-signin">
        <h3 class="form-signin-heading">Platform Login</h3>
      
		 <div class="input-group " :class='{"has-error" : $v.login.userName.$error}'>
		      <div class="input-group-addon"><i class="glyphicon glyphicon-user"></i></div>
		      <input type="text" class="form-control" v-model='login.userName' id="exampleInputAmount" placeholder="Amount">	       
		 </div>
     <div class="info " >
      <span class="error" v-if='$v.login.userName.$error'>请填写账号</span></div>
	 	 <div class="input-group" :class='{"has-error" : $v.login.password.$error}'>
	      		<div class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></div>
	      		<input type="password" class="form-control"  v-model='login.password' placeholder="Password"  @keyup.enter="submitAccount"/>       
	 	 </div>
     <div class="info " >
       <span class="error" v-if='$v.login.password.$error'>请填写密码</span>
     </div>
      
  <!--       <div class="checkbox">
          <label>
            <input value="remember-me" type="checkbox"> Remember me
          </label>
        </div> -->
        <button class="btn btn-lg btn-success btn-block" type="button" @click='submitAccount'>登  录</button>
        <div class="info error" ><span v-if='loginError'>*账号或者密码错误！</span></div>
      </form>
 
    </div>
 </template>

 <script>

 
    import {Login} from 'src/common/js/ApiUrl';
    import {required} from 'vuelidate/lib/validators';
  export default {
    name: 'login',
    data(){
      return{
        login :{
          userName:'',
          password :''
        },
        loginError:false  
      }
    },
    validations:{
        login:{
          userName:{required},
          password:{required}
        }
    
    },methods:{
      submitAccount(){
      
        
       
     
        this.$v.login.$touch();
        if(this.$v.login.$error) return;
        this.axios.post(Login.login,{
          userName: this.login.userName,
          password: this.login.password
        }).then(response=>{
          if(response.data.flag.code==0){
             this.$store.commit('setLogin',this.login.userName);
             this.$router.push({ name: 'notice'})           
          }else{
             this.$message.error(response.data.flag.msg);           
          }

        }).catch(()=>{
           this.$message.error('系统错误！');  
        })


      }
    },
    watch:{
      loginError: function() {
        
      },
      login:{
        handler:function(){
          this.loginError = false
        },deep:true
      }

    }
    
  }


</script>
<style lang='scss' scoped>
body{
  background: white !important;
}
.info{
  line-height: 30px;
  height: 30px;
}
.form-signin {
     
    margin: 0 auto;
    max-width: 400px;
    padding: 20px 45px 20px 45px;
    background: #fff;
    margin-top: 100px;
    .form-signin-heading{
    	letter-spacing: 1px;	
      margin-bottom: 20px !important;
    	font-family: PingFangSC-Regular;
    }

    button{
      padding: 10px  10px !important;
      font-size: 16px;
    }
}
.form-signin .form-signin-heading, .form-signin .checkbox {
    margin-bottom: 10px;
}
.form-signin .checkbox {
    font-weight: normal;
}
.form-signin .form-control {
    box-sizing: border-box;
    font-size: 16px;
    height: auto;
    padding: 10px;
    position: relative;
}
.form-signin .form-control:focus {
    z-index: 2;
}
 
</style>