const URL =  '/server-1';         // dev:  server-0 ; test:  server-1 //http://168.9.10.186:8080
const baseApiMoudle = URL+ '/wm_forward/manage';  //weixin-manage  ///wm_forward/manage  //线上 wechat-manage/manage'
let _notice = baseApiMoudle +  '/notice/'
let _banner = baseApiMoudle +  '/banner/'
let _category = baseApiMoudle + "/category/"
let _hot_product = baseApiMoudle + "/recommend/"
let _product  = baseApiMoudle + '/product/'
let _login = baseApiMoudle + '/login'
module.exports ={
	Notice : {
		insert : _notice + "add/",
		update : _notice + "update/",
		query  : _notice + "query/",
		delete : function(id){
			return _notice + 'delete/' + id;
		}
	},
	Banner : {
		add    : _banner + 'add/',
		query  : _banner + "query",
		delete : function(id){
			return _banner + 'delete/' + id;
		},
		isShow: function(id,status){ ///banner/isShow/{id}/{status}
			return _banner + '/isShow/' + id + '/' + status;	
		},
		update : _banner + "update",
		order: _banner + 'order'  
	},
	Category :{
		add: _category + 'add/',
		update : _category + 'update',
		query : _category + 'query/',
		delete: function(id){
			return _category + 'delete/' + id;
		}
	},
	HotProduct :{
		add: _hot_product + 'add/',
		update : _hot_product + 'update',
		query : function(page, pageSize){
			return _hot_product + 'query/' + page + '/' + pageSize
		},
		delete: function(id){
			return _hot_product + 'delete/' + id;
		},
		order: _hot_product + 'order'
	},
	Product :{
		add: _product + 'add/',
		update : _product + 'update',
		query : function(page, pageSize){
			return _product + 'query' + '/product/' + page + '/' + pageSize
		},
		queryCategory :  _product + 'query/category',
		delete: function(id){
			return _product + 'delete/' + id; 
		},
		order: _product + 'order'
	},
	Login:{
		login: _login,
		logout:_login + '/out'
	}



}