<template>
	<div class="category-update panel-body animated fadeInUp">
		    <div class="">

            <div class="form-box">  

              <form class="bs-example form-horizontal">
   
                <div class="form-group " >
                  <label class="col-sm-2 control-label">类别</label>
                  <div class="col-sm-5">
                    
                    <label class="checkbox-inline i-checks ">
                      <input value="1"   name="type" type="radio" v-model='category.type' /><i></i> 现金理财
                    </label>
                    <label class="checkbox-inline i-checks">
                      <input value="2" name="type" v-model='category.type'  type="radio"><i></i> 固定收益
                    </label>
                    <label class="checkbox-inline i-checks">
                      <input value="3" name="type" v-model='category.type' type="radio"><i></i> 浮动收益
                    </label>
          
                  </div>
                   <label v-if='$v.category.type.$error'  class="col-sm-5 control-label text-left error ">分类必选！</label>
                </div>
              
                <div class="form-group" :class="{ 'has-error' : $v.category.name.$error}"    >
                  <label class="col-sm-2 control-label">名称</label>
                  <div class="col-sm-5">
                    <input type="text" class="form-control" placeholder="名称"  v-model='category.name' @input='$v.category.name.$touch()'/>
                  </div>
                   <label v-if='$v.category.name.$error' class="col-sm-5 control-label text-left ">
                   名称长度1~7个字符！</label>
                </div>

                <div class="form-group">
              <label class="col-sm-2 control-label">图片</label>
              <div class="col-sm-5">
                <input ui-jq="filestyle" type="file" data-icon="false" data-classbutton="btn btn-default" data-classinput="form-control inline v-middle input-s" id="filestyle-0" 
                tabindex="-1" 
                style="position: absolute; clip: rect(0px 0px 0px 0px);" @change="fileChange"/>
                <div class="bootstrap-filestyle input-group">
                <input type="text" class="form-control " v-model='file.name' disabled=""> 
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
              <label   class="col-sm-5 control-label text-left">*图片格式：png | jpg | jpeg</label>

           
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
              <div class="form-group" v-if='!img.src&& eItem.categoryPic'>
                  <div class="col-sm-offset-2 col-sm-5">
                      <a  class="thumbnail pull-left">
                          <img :src="eItem.categoryPic"  >
                      </a>
                      

                  </div>
               </div>
            
               <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-10">
                    <button type='button' @click='submitForm' class="btn btn-sm btn-info"  >确 定</button>
                    <button type="button" class="btn btn-sm btn-default" @click='$emit("close")'> 取 消</button>
                  </div>
                </div>
              </form>
           </div>

           
        </div>
	</div>
</template>
<script type="text/javascript">
  import {isImg} from 'src/common/js/unit';
  import { Category } from 'src/common/js/ApiUrl';
  import { required ,minLength, maxLength} from 'vuelidate/lib/validators';
	export default {
		name:'categoryUpdate',
		props:['eItem'],
		mounted(){
			 
			this.category.type = this.eItem.categoryType;
			this.category.name = this.eItem.categoryName;
		},
		data(){
	      return {
	      	cItem : this.eItem,
	        img: {
	          src:'',
	          width: "",
	          height:''
	        },
	        category:{
	          name:'',
	          type:'',
	          file :''
	        },
	        file: '',
	        isEdit: false
	      }
	    },
	    validations:{
	      category:{
	        name:{required, maxLength:maxLength(7)},
	        type:{required},
	        file:{}
	      }

    	},
    methods:{
      fileChange(e){
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) 
        return;
 
        if(isImg(files[0].type)){
            this.file = files[0];
           
            this.createImage(files[0]);
        }else{
            alert('文件类型不符合！');
        }
        
      },createImage(file) {
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
        this.file = '';
       
      },submitForm(){
        this.$v.category.$touch();
        if(this.$v.category.$error) return;

         this.axios({
          url:Category.update,
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
            file: this.category.file,
            categoryName :this.category.name,
            categoryType: this.category.type,
            categoryId: this.cItem.categoryId
          }
        }).then((response)=>{
           if(response.data.flag.code==0){
            
           
            this.$emit("close");
            this.$message({
              message: '恭喜你,修改成功！',
              type: 'success'
            });
          }else{
             this.$message.error(response.data.flag.msg);           
          }
        })
        
      }

    },watch:{
      file:function(val){
        this.category.file = val;
      }
    }
 }
</script>