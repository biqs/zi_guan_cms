<template>
	
	<div class="category-list panel-body animated fadeInDown">
	<div class="row wrapper">
      <div class="col-sm-5 m-b-xs">
        <select v-model='type' class="input-sm form-control w-sm inline v-middle">
          <option value="0" >全部</option>	 
          <option value="1">现金理财</option>
          <option value="2">固定收益</option>
          <option value="3">浮动收益</option>
        </select>                        
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
    </div>
      <div class="m-top-b" v-if="!isEdit">
          <table class="table m-b-none footable-loaded footable default" ui-jq="footable" data-filter="#filter" data-page-size="5">
            <thead>
              <tr>
            <!--   <th style="width:20px;">
              <label class="i-checks m-b-none">
                <input type="checkbox"><i></i>
              </label>
              </th> -->
                <th>#</th>
                <th>名称</th>
                <th>图片</th>
                <th>分类</th>
                <th class="text-center" style="width: 100px;">编辑</th>
             
                 
              </tr>
            </thead>
            <tbody>

            <tr v-for='(cItem ,index) in showItems'>
              <td v-text='index + 1'>

              </td>
              <td v-text='cItem.categoryName'> 
              </td>
              <td> 
              <img   class="img-icon" :src="cItem.categoryPic">
              </td>
     
              <td > 
              		{{getTypeName(cItem.categoryType)}}
              </td>
              <td class="text-center" >      
                  <span >
                        <a @click='editItem(cItem)' class="edit"><i class="fa fa-pencil fa-fw m-r-xs"></i></a>
                        <a class="edit" @click='deleteItem(cItem)'><i class="fa fa-times fa-fw"></i></a>                  
                  </span>
               </td>
            </tr>
        
            </tbody>
            
          </table>
      </div>
      <div class="m-top-b" v-if="isEdit">
      		<update-item :eItem='eItem' @close='isEdit = false'></update-item>
      </div>

	</div>
</template>
<script type="text/javascript">
	import { Category } from 'src/common/js/ApiUrl';
	import { getTypeName } from 'src/common/js/unit';
	import updateItem from './update';
	export default {
		name:'categoryList',
		data(){
			return{
				hotItems:[],
				isEdit: false,
				eItem:'',
				type:0,
				showItems:[],
				isReloadData : false

				 
			}
		 
	 
		},
		components:{updateItem},
		mounted(){
			this.loadData();

		} ,

		methods:{
			edit(val){
		 
			},loadData(){
				this.axios.get(Category.query)
				.then((response)=>{
					this.hotItems = response.data.data;
					this.showItems = this.filterItems(this.type);
					this.isReloadData = false
				})
			},
			getTypeName : getTypeName,
			editItem(item){				
				this.eItem = item;
				this.isEdit = true;
			},filterItems(val){
 				 if(val == 0) return this.hotItems;
				 let temp = []
				 for (let i = 0; i <  this.hotItems.length ; i++) {
				 		let item = this.hotItems[i]
			 
				 		if(item.categoryType == val){
				 			temp.push(item)

				 		}

				 }
				 return temp;
			},
			deleteItem(item){

			  this.$confirm('此操作将永久删除该类别, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.axios.get(Category.delete(item.categoryId))
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
			}

		},watch:{
			type: function(val,oldVal){
				
				  this.showItems = this.filterItems(val)
				 
			},isReloadData(){
				this.loadData();
			},isEdit(val){
				if(val == false) this.isReloadData = true;
			}
		}

	}
</script>
<style type="text/css" scoped>
	.img-icon{
		max-height: 20px;
	}
</style>