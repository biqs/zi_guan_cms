<template>
	<div id="allBanner">
	 
<!-- 	 <div class="row ">
      <div class="col-sm-5 m-b-xs">
        <select class="input-sm form-control w-sm inline v-middle">
          <option value="0">Bulk action</option>
          <option value="1">Delete selected</option>
          <option value="2">Bulk edit</option>
          <option value="3">Export</option>
        </select>
        <button class="btn btn-sm btn-default">Apply</button>                
      </div>
      <div class="col-sm-4">
      </div>
      <div class="col-sm-3">
        <div class="input-group">
          <input type="text" class="input-sm form-control" placeholder="Search">
          <span class="input-group-btn">
            <button class="btn btn-sm btn-default" type="button">Go!</button>
          </span>
        </div>
      </div>
      </div> m-top-b-->
      <div class="" v-if='!isEdit'>
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
                    <th  class="text-center" style="width:80px;">编辑</th>
                    <th class="text-center">ON</th>
            
                </tr>
              </thead>
              <tbody>

   
                <tr v-for='(item,index) in items'>

          <!--       <td>    
                    <label class="i-checks m-b-none">
                    <input type="checkbox" name=""><i></i></label>
                </td> -->
                  <td>{{index + 1}}</td>
                    <td v-text='item.bannerName'></td>
                    <td ><a :href="item.linkUrl" v-text='item.linkUrl'></a></td>
                    <td><img  style="width: 16px;" :src="item.imageUrl"></td>             
                    <td   class="text-center">  
                      <span >
                        <a  class="edit" title="编辑" @click='editItem(item)'><i class="fa fa-pencil fa-fw m-r-xs"></i></a>
                          
                        <a  class="edit" @click="deleteItem(item)" title="删除"><i class="fa fa-times fa-fw"></i></a>                  
                    </span>
                    </td>
                    <td class="text-center">
                      <span >
                        <a @click='online(item)' class="edit"><i  class="fa fa-cloud-upload"></i></a>
                                 
                     </span>
                    </td>
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
  Vue.component('paginate', Paginate);
  import {Banner} from 'src/common/js/ApiUrl';
  import editBanner from './edit';
 
  
  const PAGE_SIZE = 10;
  const IS_VISIBLE = 0;
	export default {
		name:'allBanner',
        data(){
            return{
               total: 1,
               currentPage: 1,
               items:[],
               isReloadData:false,
               isEdit:false,
               eItem:''
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
                        this.isReloadData = false
                    }
                   
                })
            },
            loadPage:function(pageCount){
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
              
            },online(item){
              this.axios.get(Banner.isShow(item.id,1))
                .then((response)=>{
                    if(response.data.flag.code==0){
                        this.isReloadData = true;
                        this.$message({
                          message: '上线成功！',
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