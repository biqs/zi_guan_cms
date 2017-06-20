<template>
	<div class="product-edit">
		  <div class="form-box">  
 
              <form class="bs-example form-horizontal">
                <div class="form-group "  >
                  <label class="col-sm-2 control-label">产品类型</label>
                  <div class="col-sm-5">
                    
                    <label  class="checkbox-inline i-checks " v-for='type in productTypes'>
                      <input :value='type.value' v-model='product.type' name="type" type="radio" @click='changeType'/><i></i>  {{type.name}}
                    </label>
                   
                  </div>
                   <label v-if='$v.product.type.$error'   class="col-sm-5 control-label text-left error ">类型必选！</label>
                </div>

                 <div class="form-group "  >
                  <label class="col-sm-2 control-label">产品类别</label>
                  <div class="col-sm-5">
                    
                    <label v-if='categoryTypeItems.length > 0' class="checkbox-inline i-checks " v-for='cItem in categoryTypeItems'>
                      <input :value='cItem.categoryId' v-model='product.category' name="category" type="radio"/><i></i>  {{cItem.categoryName}}
                    </label>
                    <div class="control-label error text-left" v-if='categoryTypeItems.length == 0'>此类型下暂无此类别，
                             <router-link to="/product/category">点击添加</router-link>  </div>
                   
                  </div>
                   <label v-if='$v.product.category.$error'   class="col-sm-5 control-label text-left error ">分类必选！</label>
                </div>
               <div class="form-group " :class="{ 'has-error' : $v.product.title.$error}">
                  <label class="col-sm-2 control-label">产品标题</label>
                  <div class="col-sm-5">
                    <input type="text"  v-model="product.title"  @input="$v.product.title.$touch()" class="form-control" placeholder="标题" >
                  </div>
                   <label v-if='$v.product.title.$error' class="col-sm-5 control-label text-left">                    
                   标题不能为空！</label>
                </div>

                <div class="form-group " :class="{ 'has-error' : $v.product.code.$error}" >
                  <label class="col-sm-2 control-label">产品代码</label>
                  <div class="col-sm-5">
                    <input type="text" v-model="product.code"  class="form-control" placeholder=""  @input="$v.product.code.$touch()" >
                  </div>
                   <label v-if='$v.product.code.$error'  class="col-sm-5 control-label text-left"> 产品代码不能为空！
                   </label>
                </div>
   
       
                <div class="form-group">
                   <label class="col-sm-2 control-label">产品标签</label>
                    <div class="col-sm-5  ">
                      <div class="input-group">
                        <input type="text" v-model='labelItem' class="form-control"  @keyup.enter='addLabel' placeholder="回车添加 或 点击右侧+" />
                         
                        <span class="input-group-btn">
                        <button class="btn btn-default" @click='addLabel' type="button">+</button>
                        

                        </span>

                      </div>
                     
                    </div>
                   <label  class="col-sm-5 control-label text-left error ">
                      建议：标签总字数不超过20，标签个数不超过3！
                   </label>
                </div>
                <div class="form-group">
                 
                    <div class="col-sm-5  col-sm-offset-2 ">
                      <div type="button"   v-for='(item,index) in labelItems' class="btn btn-default  btn-sm   tag"><span>{{item}}</span>
                            &nbsp;&nbsp;<i class="fa fa-times" @click='deleteLabel(index)'></i>
                          </div>
                     
                    </div>
                   <label  class="col-sm-5 control-label text-left error ">
                     
                   </label>
                </div>
                 <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-10">
                    <button type="button" @click='submitForm' class="btn btn-sm btn-info"  >确 定</button>
                    <button type="button" class="btn btn-sm btn-default" @click='$emit("close")'> 取 消</button>
                  </div>
                </div>
                </form>
                </div>

	</div>	
</template>
<script type="text/javascript">
	import { productTypes, removeArrayByIndex} from 'src/common/js/unit';
  import {Product} from 'src/common/js/ApiUrl';
  import {required} from 'vuelidate/lib/validators';
	export default {
		name:'edit',
    props:['eItem'],
		data(){
			return {
				productTypes : productTypes,
				categoryItems:[],
				categoryTypeItems:[],
		        labelItems:[],
		        labelItem:'',
		        product:{
		          code: '',
		          title:'',
		          labels:'',
		          type: 1,
		          category:''
		        },
		        itemId : '',
		        isUpdate:false
			}
		},
    validations:{
          product:{
            code:{required},
            type:{required},
            title:{required},
            category:{required}
          }
    },
    mounted(){
        
      if(this.eItem !=""){
        this.product.code = this.eItem.productCode;
        this.product.type = this.eItem.productType;
        this.product.title = this.eItem.productName;
        this.product.labels = this.eItem.productLabel;
        this.product.category = this.eItem.productCategory;
        this.labelItems = this.product.labels ?  this.product.labels.split("|") :[];
        this.isUpdate = true;
        this.itemId = this.eItem.id;
      }else{
        this.init();
      }
      this.loadData();
    },
    methods:{
      init(){
        this.product.code = '';
        this.product.type = 1;
        this.product.title = "";
        this.product.labels = "";
        this.labelItems = [];
        this.isUpdate = false;
      },
      loadData(){
      	this.axios.get(Product.queryCategory).then((response)=>{
      		this.categoryItems = response.data.data;
      		this.categoryTypeItems = this.getCategoryByType();
      	})

      },
      changeType(){
      	 this.categoryTypeItems = this.getCategoryByType();
      },
      getCategoryByType(){
      		let temp = []
      		for (var i = this.categoryItems.length - 1; i >= 0; i--) {
      			if(this.categoryItems[i].categoryType == this.product.type) temp.push(this.categoryItems[i])
      		}
      	return temp;
      },
      addLabel(){
        if(this.labelItem.length < 1) return;
        this.labelItems.push(this.labelItem)
        this.labelItem='';
       
      },
      deleteLabel(index){
         
        this.labelItems = removeArrayByIndex(this.labelItems, index)

      },
      submitForm(){
          this.$v.product.$touch();
          if(this.$v.product.$error) return;
          if(this.isUpdate){
                this.axios.post(Product.update,{
                productCode: this.product.code,
                productName : this.product.title,
                productType: this.product.type,
                productLabel: this.product.labels,
                productCategory : this.product.category,
                id: this.itemId
              }).then((response)=>{
                  if(response.data.flag.code==0){
                      this.init();
                      this.$emit("close");
                      this.$message({
                        message: '恭喜你,修改成功！',
                        type: 'success'
                      });
                    }else{
                       this.$message.error(response.data.flag.msg);           
                    }

              })
          }else{

            this.axios.post(Product.add,{
                productCode: this.product.code,
                productName : this.product.title,
                productType: this.product.type,
                productLabel: this.product.labels,
                productCategory : this.product.category
            }).then((response)=>{
                    if(response.data.flag.code==0){
                      this.init();
                      this.$emit("close");
                      this.$message({
                        message: '恭喜你,添加成功！',
                        type: 'success'
                      });
                    }else{
                       this.$message.error(response.data.flag.msg);           
                    }


            })

          }
        

      }
    },watch:{
      labelItems:function(val){
        this.product.labels = val.join('|');

      } 

    }
	}
</script>