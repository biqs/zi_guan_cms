<template>
	<div class="banner">
   
  	<div class="top-bar">
      <ul class="breadcrumb bg-white b-a">
              <li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
            <!--   <li><a href="">Banner</a></li> -->
              <li class="active">Banner</li>
      </ul>
      
   	</div>	

    <div class="">
      <button class="btn m-b-xs btn-sm btn-default btn-addon" @click='isEdit=true'><i class="fa fa-plus"></i>添加</button>
      <!-- <button class="btn m-b-xs btn-sm btn-default btn-addon"><i class="fa fa-trash-o"></i>删除</button> -->
    </div>  
    
    <div class="panel panel-default animated fadeInDown" v-if='!isEdit' >
     
    <div class="panel-heading">
      <ul class="nav nav-pills" id='subNav'>
      <li>
        <router-link :to="{name:'online-banner'}">Online</router-link>
      <li ><a id="line">|</a></li>
      <li >
        <router-link :to="{name:'offline-banner'}">Offline</router-link>
      </li>
      
    </ul>
    </div>
  
    <div class="m-top-b panel-body ">
        <router-view></router-view>
      </div>
    </div>

    <div class="panel panel-default animated fadeInUp" v-if='isEdit' >
      
        <div class="panel-body">

            <div class="form-box">
 
              <form class="bs-example form-horizontal">
                   
                <div class="form-group " :class="{ 'has-error' : $v.banner.title.$error}">
                  <label class="col-sm-2 control-label">标题</label>
                  <div class="col-sm-5">
                    <input type="text"  v-model="banner.title"  @input="$v.banner.title.$touch()" class="form-control" placeholder="标题" >
                  </div>
                   <label v-if='$v.banner.title.$error' class="col-sm-5 control-label text-left">                    
                   标题不能为空！</label>
                </div>

                <div class="form-group " :class="{ 'has-error' : $v.banner.link.$error}" >
                  <label class="col-sm-2 control-label">跳转链接</label>
                  <div class="col-sm-5">
                    <input type="text" v-model="banner.link"  class="form-control" placeholder="http://"  @input="$v.banner.link.$touch()" >
                  </div>
                   <label v-if='$v.banner.link.$error'  class="col-sm-5 control-label text-left"> 链接地址不能为空！
                   </label>
                </div>
 
                <div class="form-group">
              <label class="col-sm-2 control-label">图片</label>
              <div class="col-sm-5">
                <input ui-jq="filestyle"  type="file" data-icon="false" data-classbutton="btn btn-default" data-classinput="form-control inline v-middle input-s" id="filestyle-0" 
                tabindex="-1" 
                style="position: absolute; clip: rect(0px 0px 0px 0px);" @change="fileChange"/>
                <div class="bootstrap-filestyle input-group">
                <input type="text" class="form-control " v-model='banner.file.name' disabled=""> 
                <span class="group-span-filestyle input-group-btn" tabindex="0">
                <label for="filestyle-0" class="btn btn-default ">
                    <span class="glyphicon glyphicon-folder-open"></span>  Open
                </label>

                </span>
                <span class="input-group-btn">
                  <button class="btn btn-default" @click='removeImage'>
                    <span class="glyphicon glyphicon-trash"></span>
                  </button>
                </span>
                </div>
              </div>
              <label   class="col-sm-5 control-label text-left">*图片格式：png | jpg | jpeg，推荐格式大小：375*105px</label>

           
            </div>

               <div class="form-group" v-if='img.src'>
                  <div class="col-sm-offset-2 col-sm-5">
                      <a  class="thumbnail pull-left">
                          <img :src="img.src"  >
                      </a>
                      <div class="clear-left">
                        {{img.width}} X {{ img.height}}
                      </div>

                  </div>
               </div>
                <div class="form-group hidden">
                  <div class="col-sm-offset-2 col-sm-10">
                    <div class="checkbox">
                      <label class="i-checks">
                        <input type="checkbox" checked=""><i></i> Remember me
                      </label>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-10">
                    <button type="button" @click='submitForm' class="btn btn-sm btn-info"  >确 定</button>
                    <button type="submit" class="btn btn-sm btn-default" @click='isEdit=false'> 取 消</button>
                  </div>
                </div>
              </form>
        
           </div>

           
        </div>

       
    </div>


 
    
 
	</div>
</template>
<script >
 

  import {isImg} from 'src/common/js/unit';
  import {Banner} from 'src/common/js/ApiUrl';
  import {required} from 'vuelidate/lib/validators';
  
	export default {
		name:'banner',
    data(){
      return {
        img: {
          src:'',
          width: "",
          height:''
        },
        isEdit: false,
        banner:{
           file :'',         
           title:'',
           link :''
        } 
       
        
      }
    },
    validations:{

      banner:{
        title: {
            required        
        },
        link : {
            required
        } 
      }
             
    },
    mounted(){
     // this.loadData();
       
    },

    methods:{
      /*上传文件*/
      init(){
        this.banner.file ='';
        this.banner.title ='';
        this.banner.link=''
      },
      fileChange(e){
        let files = e.target.files || e.dataTransfer.files;
    
        if (!files.length) 
        return;
        this.banner.file = files[0];
        if(isImg(files[0].type)){
            this.createImage(files[0]);
            
        }else{
            alert('文件类型不符合！');
        }
        
      },
      createImage(file) {
              var image = new Image();
              var reader = new FileReader();
              var vm = this;
              reader.onload = (e) => {
                vm.img.src = e.target.result;
                image.src = e.target.result;
                vm.img.width = image.width;
                vm.img.height = image.height;
              };
              reader.readAsDataURL(file);
              
      },
      removeImage: function (e) {
        this.img.src = '';
        this.banner.file = '';
      },
      submitForm(){
 
        this.$v.banner.$touch();
        if(this.$v.banner.$error)return;
        this.axios({
          url:Banner.add,
          method:'post',
          headers:{'Content-Type': 'multipart/form-data'},
          transformRequest: [ function (data) {
            //文件 提交 转换数据格式
            var formData = new FormData();  
            for (var key in data) {  
              formData.append(key, data[key]);  
            }  
            return formData;
          }],
          data:{
            file: this.banner.file,
            bannerName :this.banner.title,
            linkUrl: this.banner.link
          }
        }).then((response)=>{
          if(response.data.flag.code==0){
            this.isEdit = false;
            this.init();
            this.$message({
              message: '恭喜你,添加成功！',
              type: 'success'
            });
          }else{
             this.$message.error(response.data.flag.msg);           
          }
          
        })
      }

    },watch:{
       
    }
	}

</script>
<style scoped lang="scss">
  .panel{
	margin-bottom: 4px;	
  }
	.panel-heading{
		border-bottom: 0;
	}
  .nav-pills{
    li{

    }
    a{  
      padding: 10px 25px;
      letter-spacing: 1px;
      color: #777;
    
      &.active, &:hover{
        border-bottom: 2px solid #337ab7;
        border-radius:0;
        color: #1f2427;

      }
    } 
    #line{
       padding: 10px 1px;
    }   
    
  }


</style>