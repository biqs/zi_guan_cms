<template>
	<div class="datagrid">
    <div class="top-bar">
      <ul class="breadcrumb bg-white b-a">
              <li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
            <!--   <li><a href="">Banner</a></li> -->
              <li class="active">公告</li>
      </ul>
  
  </div>  
	 
  <div >

   <button style="margin-right:40px;" @click='addItem' class="btn m-b-xs btn-sm btn-default btn-addon" ><i class="fa fa-plus"></i>添加</button>

       <!--  <label class="control-label">当前状态：</label>
        <div class="btn-group">
           <button class="btn m-b-xs btn-sm btn-default  btn-addon" :class='{"btn-success":isUsed}'  @click='isUsed = !isUsed'>关闭</button>     <button class="btn m-b-xs btn-sm btn-default btn-addon" :class='{"btn-success": !isUsed}' @click='isUsed = !isUsed'>启用</button>
        </div> -->
       
  </div>
 	

 
  <div class="panel panel-default animated fadeInDown" v-if='!isEdit'>
    <div>
      <table class="table m-b-none footable-loaded footable default"  >
        <thead>
          <tr>
              <th >
                  标题
             </th>
             <th >
                  内容
             </th>
              <th  >
                  链接
               </th>
               
              <th class="text-center">
                  编辑
              <span class="footable-sort-indicator"></span></th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for='item in items' >
           
              <td v-text='item.title'></td>
              <td  >{{item.content | subLen(15)}}</td>
              <td  >{{item.linkUrl | subLen(15)}}</td>
              <td  class="text-center">
              	<span >
          	        <a  @click='editItem(item)'><i class="fa fa-pencil fa-fw m-r-xs"></i></a>
          	        <a  @click='delItem(item.id)' ><i class="fa fa-times fa-fw"></i></a>
      				  </span>

              </td>
          </tr>
          <tr v-if='items.length == 0'>
            <td colspan="4" class="text-center">无数据！</td>
          </tr>
 
        </tbody>
       
      </table>
    </div>
  </div>
  <div class="panel panel-default  animated fadeInUp" v-if='isEdit'>
  
    <div class="panel-body">

        		<div class="form-box">	

          <form class="bs-example form-horizontal">
            <div class="form-group " :class="{ 'has-error' : $v.notice.title.$error}">
              <label class="col-sm-2 control-label">标题</label>
              <div class="col-sm-5">
                <input type="text" maxlength="40" class="form-control" placeholder="标题" v-model.trim='notice.title'  @input="$v.notice.title.$touch()" />  
              </div>
               <label v-if='$v.notice.title.$error' class="col-sm-2 control-label text-left">标题最少两个字符！</label>
            					
            </div>

           <!--  <div class="form-group " :class="{ 'has-error' : $v.notice.content.$error}">
              <label class="col-sm-2 control-label">内容</label>
              <div class="col-sm-5">
                <input type="text" maxlength="40" class="form-control" placeholder="内容" v-model='notice.content'   @input="$v.notice.content.$touch()" />  
              </div>
               <label v-if='$v.notice.content.$error' class="col-sm-2 control-label text-left">内容最少两个字符！</label>
                      
            </div> -->

            <div class="form-group" :class="{ 'has-error' : $v.notice.linkUrl.$error}">
              <label class="col-sm-2 control-label">跳转链接</label>
              <div class="col-sm-5">
                <input type="text" class="form-control" placeholder="http://" v-model='notice.linkUrl' @input="$v.notice.linkUrl.$touch()"  />
              </div>
               <label  v-if='$v.notice.linkUrl.$error' class="col-sm-5 control-label text-left">链接地址最少10个字符！</label>
            </div>
              <div class="form-group">
              <label class="col-sm-2 control-label">内容
              </label>
                 <div class="col-sm-8"  >
                  <!--    <froala class='richText' :tag="'textarea'" :config="config" v-model="notice.content"></froala> -->
                  <ueditor v-model="notice.content" ></ueditor>
                 </div>

              </div>


            <div class="form-group"> 
              <div class="col-sm-offset-2 col-sm-10">
                <button type="button" class="btn btn-sm btn-info"  @click='changeItem'>确 定</button>
                <button type="button" class="btn btn-sm btn-default"  @click='isEdit = !isEdit'>取 消</button>
              </div>
            </div>
          </form>
       </div>
    
  
       
    </div>
  </div>

	</div>
</template>
<script >
  import { Notice } from 'src/common/js/ApiUrl';
  import { required ,minLength} from 'vuelidate/lib/validators';
  require('froala-editor/js/froala_editor.pkgd.min')
  require('froala-editor/css/froala_editor.pkgd.min.css')
  require('font-awesome/css/font-awesome.css')
  require('froala-editor/css/froala_style.min.css')
  import Vue from 'vue';
  import VueFroala from 'vue-froala-wysiwyg';

  Vue.use(VueFroala)
	
  import ueditor from 'src/components/ueditor/ueditor.vue'; 
  export default {
		name:'datagrid',
		data(){
			return {
		 			 
				isEdit: false,
				isUsed: false,	
        notice:{
            linkUrl :'',
            title :'' ,
            content:''
        },
        items:[],
        currentItemId:'',
        reloadData:false,
        isUpdate : false,
        config: {
         
          height:'300',
          heightMax: 400
        },
        richText: 'Edit Your Content Here!'
			}
		},
    filters:{
        subLen: function(val,len){
           
            if(val!=null){
             if(val.length == 0){
              return '--'
             }else if(val.length < len) return val
             else{
                return val.substring(0, len) + '...'
             }
            }else{
              return '--'
            }
            
            
        }
    },
    validations:{
       notice:{
         title: {             
            required
         },
         linkUrl:{
           /* minLength:minLength(5),
            required*/
         },
         content:{
           /* minLength:minLength(1),
            required*/
         }

       }
          
    },mounted(){
      this.loadData();

    },
    components: {
            ueditor
    },
    methods:{
        loadData(){
            this.axios.get(Notice.query).then((response)=>{
              if(response.data){
                this.items = response.data.data;
                this.reloadData = false;
              }
              
            })
        },
			  addItem(){
			    	 this.isEdit = !this.isEdit;
					   this.notice.linkUrl = '';
					   this.notice.title = '';
             this.notice.content ='';
        },
        insert(){
           if(this.notice.content.length >1 || this.notice.linkUrl.length > 1){
              this.axios.post(Notice.insert,{
              title:   this.notice.title ,
              linkUrl: this.notice.linkUrl ? this.notice.linkUrl : '',
              content: this.notice.content ? this.notice.content : ''
              }).then((response)=>{
                if(response.data.flag.code == 0){
                  this.reloadData = true;
                  this.isEdit = false;
                }else{
                   this.$message.error(response.data.flag.msg); 
                }
                
                })
           }else{
              this.$message.error('注意：链接 和 内容 必填一项！');  
           }

        },

				changeItem(){	
            this.$v.notice.$touch(); //校验错误
            if(!this.$v.notice.$error){
                this.isUpdate ? this.updataItem(): this.insert();  
            }
            
                   		  
				},
        updataItem(){
           this.axios.post(Notice.update,{
              title:   this.notice.title ,
              linkUrl: this.notice.linkUrl ? this.notice.linkUrl : '',
              content: this.notice.content ? this.notice.content : '',
              id: this.currentItemId
              })
           .then((response)=>{
                if(response.data.flag.code == 0){
                  this.reloadData = true;
                  this.isEdit = false;
                  this.isUpdate = false;
                }else{
                   this.$message.error(response.data.flag.msg); 
                }

            })

        },
				delItem(id){

             this.$confirm('此操作将永久删除该公告 , 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.axios.get(Notice.delete(id))
                .then((response)=>{
                    if(response.data.flag.code==0){
                        this.reloadData = true;
                        this.$message({
                          message: '删除成功！',
                          type: 'success'
                        });
                    }

                })
              }).catch(() => {
                  this.$message.error(response.data.flag.msg);  
              });
          
				},
				editItem(item){
					this.isEdit = !this.isEdit;
          this.currentItemId = item.id;
					this.notice.linkUrl = item.linkUrl;
					this.notice.title = item.title;
          this.notice.content = item.content;
          this.isUpdate = true;
				} 
		},watch:{
			  reloadData: function(ob, oldOb){
        if(ob){
          this.loadData();
        }
      }  
		}
	}

</script>
<style scoped>
.panel{
	margin-bottom: 4px;	
}
	.panel-heading{
		border-bottom: 0;
}

.panel-default .panel-heading {
    background-color: #f4f5f5;
}

.form-box{
	margin-top: 30px;
}
.rich-text{
  height: 500px;
}
</style>