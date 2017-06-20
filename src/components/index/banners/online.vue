<template>
	<div id="online">
		 
	
      <div class=""  v-if='!isEdit'>
           <table class="table m-b-none footable-loaded footable default" ui-jq="footable" data-filter="#filter" data-page-size="5">
              <thead>
                <tr>
               <!--  <th style="width:20px;">
                <label class="i-checks m-b-none">
                  <input type="checkbox" checked="checked"><i></i>
                </label>
                </th> -->
                    <th style="width:40px;">#</th>
                    <th>标题</th>
                    <th>跳转链接</th>
                    <th>图片</th>
                    <th class="text-center" style="width:80px;">操作</th>
                      <th class="text-center" style="width: 90px;">排序</th>
                    <th class="text-center">OFF</th>

            
                </tr>
              </thead>
              <tbody>

   
                <tr v-for='(item,index) in items'>

          <!--       <td>    
                    <label class="i-checks m-b-none">
                    <input type="checkbox" name=""><i></i></label>
                </td> -->
                    <td>{{index+ 1}}</td>
                    <td v-text='item.bannerName'></td>
                    <td ><a :href="item.linkUrl" v-text='item.linkUrl'></a></td>
                    <td><img  style="height: 18px;" :src="item.imageUrl" ></td>
               
                    <td class="text-center">  
                      <span >
                        <a @click='editItem(item)' class="edit"><i class="fa fa-pencil fa-fw m-r-xs"></i></a>
                 
                        <a @click="deleteItem(item)" class="edit"><i class="fa fa-times fa-fw"></i></a>                  
                    </span>

                    </td>
                        <td   class="text-center">  
                      <span >
                        <a title="上移" v-if='index!=0' class="edit" @click='order(item,index,0)'><i class="fa   fa-fw m-r-xs fa-arrow-up"></i></a>
                          
                        <a  v-if='index != items.length-1' class="edit" @click="order(item,index,1)" title="下移"><i class="fa fa-arrow-down fa-fw m-r-xs"></i></a>                  
                    </span>
                    </td>

                     <td class="text-center">
                      <span >
                        <a @click='offline(item)' class="edit"><i  class="fa fa-cloud-download"></i></a>
                                 
                     </span></td>
                
                </tr>
 
              </tbody>
              <tfoot class="hide-if-no-paging">
                <tr >
                    <td colspan="6" class="text-center footable-visible">
                    <paginate v-if='pageCount != 1 && total !=0'
                     :page-count="pageCount"
                     :click-handler="loadPage"
                     :prev-text="'Prev'"
                     :next-text="'Next'"
                     :container-class="'pagination'"
                     :page-class="'footable-page'"
                     :page-range="3"
                     :margin-pages="2"
                     >
                    </paginate>
                    <span v-if='total ==0'>暂无数据！</span>
                    </td>
                </tr>

              </tfoot>
            </table>
      </div>
       <div v-if="isEdit">
        <editBanner   @close='closeEdit' :eItem='eItem'></editBanner>
     
      </div>
         
	</div>
</template>
<script>
import Vue from 'vue';
import Paginate from 'vuejs-paginate';
import {Banner} from 'src/common/js/ApiUrl';
Vue.component('paginate', Paginate);
import editBanner from './edit';
const PAGE_SIZE = 10;
const IS_VISIBLE = 1;
export default {
		name:'online',
         data(){
            return{
               total: 1,
               currentPage: 1,
               items:[],
               isReloadData:false,
               isEdit: false,
               imgUrl:''
               
            }
        },
        components:{editBanner},
        computed:{
            pageCount: function(){
                return Math.ceil(this.total / PAGE_SIZE);
            }
        },

        mounted(){
            this.loadData();
        },
        methods:{
            loadData(){
                this.axios.get(Banner.query,{params:{
                    page:this.currentPage,
                    pageSize: PAGE_SIZE, //
                    status: IS_VISIBLE   //可见 ：1 不可见：0
                }}).then((response)=>{
                   
                    if(response.data.flag.code == 0){
                        this.total = response.data.data.total;
                        this.items = response.data.data.list;
                        this.isReloadData = false;
                    }
                    
                })
            },
            loadPage:function(pageCount){   //fe
                this.currentPage = pageCount;
            },
            deleteItem(item){
              this.$confirm('此操作将永久删除该Banner, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.axios.get(Banner.delete(item.id))
                .then((response)=>{
                    if(response.data.flag.code==0){
                        this.isReloadData = true;
                        this.$message({
                          message: '删除成功！',
                          type: 'success'
                        });
                    }

                })
              }).catch(() => {
                  this.$message.error(response.data.flag.msg);  
              });

            },offline(item){
              this.axios.get(Banner.isShow(item.id,0))
                .then((response)=>{
                    if(response.data.flag.code==0){
                        this.isReloadData = true;
                        this.$message({
                          message: '下线成功！',
                          type: 'success'
                        });
                    }else{
                        this.$message.error(response.data.flag.msg);
                    }

              });
            },editItem(item){
              this.eItem = item;
              this.isEdit = true;
            },closeEdit(){
              this.isEdit = false;
              this.isReloadData = true
            },
 
          order(item,index,status){  //status : 0(上移)： 1： 下移
          let curObject = this.items[index];
          let replaceObject;
          if(status == 0){
            replaceObject = this.items[index-1];
          }else if(status == 1){
        replaceObject = this.items[index + 1];
          }

          this.axios.post(Banner.order,{
            currentId: curObject.id,
            currentOrderValue : curObject.imageOrder,
            replaceId : replaceObject.id,
            replaceOrderValue: replaceObject.imageOrder
          }).then((response)=>{

              if(response.data.flag.code==0){
                        this.isReloadData = true;
                        this.$message({
                          message: '排序成功！',
                          type: 'success'
                        });
                    }
          }).catch(()=>{
             this.$message.error('系统错误！');  
          })
      
      } 
        },
        watch:{
            currentPage : function(){
                this.loadData();
            },
            isReloadData :function(){
                this.loadData();  
            }


        }
	}

</script>