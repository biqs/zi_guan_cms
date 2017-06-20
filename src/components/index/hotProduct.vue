<template>
	<div id="hotProduct">
		
		 <div class="top-bar">
		      <ul class="breadcrumb bg-white b-a">
		              <li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
		            <!--   <li><a href="">Banner</a></li> -->
		              <li class="active">热门</li>
		      </ul>
  
  		</div> 

  	<div class="">
      <button class="btn m-b-xs btn-sm btn-default btn-addon" @click='addItem'><i class="fa fa-plus"></i>添加</button>
<!--       <button class="btn m-b-xs btn-sm btn-default btn-addon"><i class="fa fa-trash-o"></i>删除</button> -->
    </div>

    <div class="panel panel-default ">
      
       <edit class='animated fadeInDown' v-if='isEdit'  @close='isEdit = false' :eItem='eItem'></edit>
       <list class='animated fadeInDown' v-if='!isEdit' @edit='editItem'></list>
       
    </div>




	</div>





</template>
<script >
  import edit from './hotProduct/edit';
  import list from './hotProduct/list';

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