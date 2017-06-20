/*工具类*/
const IMG_TYPES = ['image/jpeg' ,'image/png','image/gif'];
const PRODUCT_TYPES = [
		{value:1,name:'现金理财'},
		{value:2,name:'固定收益'},
		{value:3,name:'浮动收益'}
	];
module.exports ={

	/*上传文件判断是否是Img类型
	*/
	isImg:function(type){
		let flag = false;
		for(let i =0 ; i < IMG_TYPES.length ;i ++){
			if(type == IMG_TYPES[i]){
				flag = true;
				return flag;
			}
		}
		return flag;

	},
	productTypes: PRODUCT_TYPES,
	getTypeName : function(id){
		for (let i = PRODUCT_TYPES.length - 1; i >= 0; i--) {
			let item = PRODUCT_TYPES[i];
			if(item.value == id)
				return item.name
		}
	},
	removeArrayByIndex(arr, index){
		let temp = []
		for (let i = 0; i <  arr.length; i++) {
			
			if(index != i){
				temp.push(arr[i]);
			}
		}
		return temp;
	}



}