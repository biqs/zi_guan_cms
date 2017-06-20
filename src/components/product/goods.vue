<template>
	<div class="banner">
  	<div class="top-bar">
      <ul class="breadcrumb bg-white b-a">
            <li><a href="#"><i class="fa fa-fw fa-product-hunt"></i> 产品</a></li>
            <!--   <li><a href="">Banner</a></li> -->
              <li class="active">产品列表</li>
      </ul>
   	</div>	

    <div class="">
      <button class="btn m-b-xs btn-sm btn-default btn-addon" @click='addItem'><i class="fa fa-plus"></i>添加</button>
       
    </div>    
    <div class="panel panel-default animated fadeInUp">
      <edit v-if='isEdit'  @close='isEdit = false' :eItem='eItem'></edit>
      <list v-if='!isEdit' @edit='editItem'></list>
    </div>

    
 
	</div>
</template>
<script >
  import {isImg} from 'src/common/js/unit';
  import edit from './goods/edit';
  import list from './goods/list';
  
export default {
    name:'hotProduct',
    data(){
      return {
        isEdit: false,
        eItem :''
      }
    },components:{
        edit,list
    },methods:{
      editItem(item){
        this.eItem = item;
        this.isEdit = true
      },
      addItem(){
        this.eItem = '';
        this.isEdit = true
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


</style>