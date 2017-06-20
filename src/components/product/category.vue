<template>
	<div class="banner">
  	<div class="top-bar">
      <ul class="breadcrumb bg-white b-a">
              <li><a href="#"><i class="fa fa-fw fa-product-hunt"></i> 产品</a></li>
            <!--   <li><a href="">Banner</a></li> -->
              <li class="active">类别</li>
      </ul>
   	</div>	

    <div class="">
      <button class="btn m-b-xs btn-sm btn-default btn-addon" @click='isEdit= !isEdit'><i class="fa fa-plus"></i>添加</button>
       
    </div>       
    

    <div class="panel panel-default animated fadeInUp">
          <list v-if='!isEdit' @editItem='getItem'></list>
          <edit v-if='isEdit' :categoryItem='categoryItem' @editOk='isEdit=!isEdit'  @close='isEdit=false' > </edit>
    </div>
 
 
	</div>
</template>
<script >
 
  import { Category } from 'src/common/js/ApiUrl';
  import list from './category/list';
  import edit from './category/edit';
 
	export default {
		name:'category',
    components:{list,edit},
    data(){
      return {   
        isEdit: false,
        currentView : 'list',
        categoryItem:''      
      }
    },
    methods:{
       getItem(val){
          this.categoryItem = val;
          this.isEdit = !this.isEdit;       
       }
    },watch:{
       
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


</style>