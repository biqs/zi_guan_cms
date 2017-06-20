<template>
	 <div class="goods-list">
 <table class="table m-b-none footable-loaded footable default" ui-jq="footable" data-filter="#filter" data-page-size="5">
              <thead>
                <tr>
               <!--  <th style="width:20px;">
                <label class="i-checks m-b-none">
                  <input type="checkbox" checked="checked"><i></i>
                </label>
                </th> -->
                    <th  style="width:30px;">#</th>
                    <th>名称</th>
                    <th class="text-center" >代码</th>
                    <th class="text-left">类型/类别</th>
                    <th>标签</th>
                    <th class="text-center" style="width:80px;">编辑</th>
                    <th class="text-center" style="width: 90px;">排序</th>
            
                </tr>
              </thead>
              <tbody>

   
                <tr v-for='(item , index) in hotItems'>

          <!--       <td>    
                    <label class="i-checks m-b-none">
                    <input type="checkbox" name=""><i></i></label>
                </td> -->
                    <td v-text='index + 1'></td>
                    <td v-text='item.productName'></td>
                    <td class="text-center"  v-text='item.productCode' ></td>
                    <td class="text-left" >{{item.productType  | getProductTypeName}} - {{item.categoryName}}</td>
                    <td  >
                      <div v-if="item.productLabel">
                         <span   class="tag-label" v-for='label in item.productLabel.split("|")'>{{label}}
                         </span>
                      </div>
                     
                    </td>             
                    <td   class="text-center">  
                      <span >
                        <a  class="edit" title="编辑" @click='editItem(item)'><i class="fa fa-pencil fa-fw m-r-xs"></i></a>
                          
                        <a  class="edit" @click="deleteItem(item)" title="删除"><i class="fa fa-times fa-fw"></i></a>                  
                    </span>
                    </td>

                     <td   class="text-center">  
                      <span >
                        <a title="上移" v-if='index!=0' class="edit" @click='order(item,index,0)'><i class="fa   fa-fw m-r-xs fa-arrow-up"></i></a>
                          
                        <a  v-if='index != hotItems.length-1' class="edit" @click="order(item,index,1)" title="下移"><i class="fa fa-arrow-down fa-fw m-r-xs"></i></a>                  
                    </span>
                    </td>

                    
                </tr>
 
              </tbody>
              <tfoot class="hide-if-no-paging">
                <tr >
                    <td colspan="7" class="text-center footable-visible">
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

</template>
<script type="text/javascript">
  import {Product} from 'src/common/js/ApiUrl';
  import {getTypeName} from 'src/common/js/unit';
  import Vue from 'vue';
  import Paginate from 'vuejs-paginate';
  Vue.component('paginate', Paginate);

  const PAGE_SIZE = 12;
  export default {
    name:'goodsList',
    data(){
      return{
        total: 1,
        currentPage: 1,
        hotItems:[],
        isReloadData : false

    }},
    computed:{
            pageCount: function(){
                return Math.ceil(this.total / PAGE_SIZE);
            }
    },
    filters:{
      getProductTypeName : function(val){
        return getTypeName(val);
      }
    },
    mounted(){
      this.loadData();
    },
    methods:{
      loadData(){
        this.axios.post(Product.query(this.currentPage, PAGE_SIZE)).then((response)=>{
            this.total = response.data.data.total;
            this.hotItems = response.data.data.list;
            this.isReloadData = false;

        })
      },
      loadPage:function(pageCount){
          this.currentPage = pageCount;
      },
      editItem(item){
        this.$emit("edit",item)
      },deleteItem(item){
        this.$confirm('此操作将永久删除 '+item.productName+' , 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.axios.get(Product.delete(item.id))
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
      },
      order(item,index,status){  //status : 0(上移)： 1： 下移
      		let curObject = this.hotItems[index];
      		let replaceObject;
      		if(status == 0){
      			replaceObject = this.hotItems[index-1];
      		}else if(status == 1){
				replaceObject = this.hotItems[index + 1];
      		}

      		this.axios.post(Product.order,{
      			currentId: curObject.id,
      			currentOrderValue : curObject.showOrder,
      			replaceId : replaceObject.id,
      			replaceOrderValue: replaceObject.showOrder
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
      isReloadData : function(){
        this.loadData();
      }
    }
  }
</script>