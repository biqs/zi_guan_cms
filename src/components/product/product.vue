<template>
	<div class="banner">
  	<div class="top-bar">
      <ul class="breadcrumb bg-white b-a">
              <li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
            <!--   <li><a href="">Banner</a></li> -->
              <li class="active">Banner</li>
      </ul>
   	</div>	

    <div class="">
      <button class="btn m-b-xs btn-sm btn-default btn-addon" @click='isEdit=true'><i class="fa fa-plus"></i>添加</button>
      <button class="btn m-b-xs btn-sm btn-default btn-addon"><i class="fa fa-trash-o"></i>删除</button>
    </div>       
    <div class="panel panel-default" v-if='!isEdit' >
      
    <div class="row wrapper">
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
    </div>
      <div class="m-top-b">
          <table class="table m-b-none footable-loaded footable default" ui-jq="footable" data-filter="#filter" data-page-size="5">
            <thead>
              <tr>
              <th style="width:20px;">
              <label class="i-checks m-b-none">
                <input type="checkbox"><i></i>
              </label>
              </th>
                  <th data-toggle="true" class="footable-visible footable-first-column footable-sortable">
                      First Name
                  <span class="footable-sort-indicator"></span></th>
                  <th class="footable-visible footable-sortable">
                      Last Name
                  <span class="footable-sort-indicator"></span></th>
                  <th data-hide="phone,tablet" class="footable-visible footable-sortable">
                      Job Title
                  <span class="footable-sort-indicator"></span></th>
                  <th data-hide="phone,tablet" data-name="Date Of Birth" class="footable-visible footable-sortable">
                      DOB
                  <span class="footable-sort-indicator"></span></th>
                  <th data-hide="phone" class="footable-visible footable-last-column footable-sortable">
                      Status
                  <span class="footable-sort-indicator"></span></th>
              </tr>
            </thead>
            <tbody>
              <tr class="footable-even" style="display: table-row;">
              <td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
                  <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Isidra</td>
                  <td class="footable-visible"><a href="">Boudreaux</a></td>
                  <td class="footable-visible">Traffic Court Referee</td>
                  <td data-value="78025368997" class="footable-visible">22 Jun 1972</td>
                  <td data-value="1" class="footable-visible footable-last-column">
                  	<span >
    	        <a href=""><i class="fa fa-pencil fa-fw m-r-xs"></i></a>
    	        <a href=""><i class="fa fa-plus fa-fw m-r-xs"></i></a>
    	        <a href=""><i class="fa fa-times fa-fw"></i></a>                  
          				</span>

                  </td>
              </tr>
              <tr class="footable-odd" style="display: table-row;">
              <td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
                  <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Shona</td>
                  <td class="footable-visible">Woldt</td>
                  <td class="footable-visible"><a href="">Airline Transport Pilot</a></td>
                  <td data-value="370961043292" class="footable-visible">3 Oct 1981</td>
                  <td data-value="2" class="footable-visible footable-last-column"><span class="label bg-light" title="Disabled">Disabled</span></td>
              </tr>
              <tr class="footable-even" style="display: table-row;">
              <td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
                  <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Granville</td>
                  <td class="footable-visible">Leonardo</td>
                  <td class="footable-visible">Business Services Sales Representative</td>
                  <td data-value="-22133780420" class="footable-visible">19 Apr 1969</td>
                  <td data-value="3" class="footable-visible footable-last-column"><span class="label bg-warning" title="Suspended">Suspended</span>
                  </td>
              </tr>
              <tr class="footable-odd" style="display: table-row;">
              <td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
                  <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Easer</td>
                  <td class="footable-visible">Dragoo</td>
                  <td class="footable-visible">Drywall Stripper</td>
                  <td data-value="250833505574" class="footable-visible">13 Dec 1977</td>
                  <td data-value="1" class="footable-visible footable-last-column"><span class="label bg-success" title="Active">Active</span></td>
              </tr>
              <tr class="footable-even" style="display: table-row;">
              <td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
                  <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Maple</td>
                  <td class="footable-visible">Halladay</td>
                  <td class="footable-visible">Aviation Tactical Readiness Officer</td>
                  <td data-value="694116650726" class="footable-visible">30 Dec 1991</td>
                  <td data-value="3" class="footable-visible footable-last-column"><span class="label bg-warning" title="Suspended">Suspended</span>
                  </td>
              </tr>
              <tr class="footable-odd" style="display: none;">
              <td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
                  <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Maxine</td>
                  <td class="footable-visible"><a href="">Woldt</a></td>
                  <td class="footable-visible"><a href="">Business Services Sales Representative</a></td>
                  <td data-value="561440464855" class="footable-visible">17 Oct 1987</td>
                  <td data-value="2" class="footable-visible footable-last-column"><span class="label bg-light" title="Disabled">Disabled</span></td>
              </tr>
              <tr class="footable-even" style="display: none;">
              <td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
                  <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Lorraine</td>
                  <td class="footable-visible">Mcgaughy</td>
                  <td class="footable-visible">Hemodialysis Technician</td>
                  <td data-value="437400551390" class="footable-visible">11 Nov 1983</td>
                  <td data-value="2" class="footable-visible footable-last-column"><span class="label bg-light" title="Disabled">Disabled</span></td>
              </tr>
              <tr class="footable-odd" style="display: none;">
              <td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
                  <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Lizzee</td>
                  <td class="footable-visible"><a href="">Goodlow</a></td>
                  <td class="footable-visible">Technical Services Librarian</td>
                  <td data-value="-257733999319" class="footable-visible">1 Nov 1961</td>
                  <td data-value="3" class="footable-visible footable-last-column"><span class="label bg-warning" title="Suspended">Suspended</span>
                  </td>
              </tr>
              <tr class="footable-even" style="display: none;">
              <td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
                  <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Judi</td>
                  <td class="footable-visible">Badgett</td>
                  <td class="footable-visible">Electrical Lineworker</td>
                  <td data-value="362134712000" class="footable-visible">23 Jun 1981</td>
                  <td data-value="1" class="footable-visible footable-last-column"><span class="label bg-success" title="Active">Active</span></td>
              </tr>
              <tr class="footable-odd" style="display: none;">
              <td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
                  <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Lauri</td>
                  <td class="footable-visible">Hyland</td>
                  <td class="footable-visible">Blackjack Supervisor</td>
                  <td data-value="500874333932" class="footable-visible">15 Nov 1985</td>
                  <td data-value="3" class="footable-visible footable-last-column"><span class="label bg-warning" title="Suspended">Suspended</span>
                  </td>
              </tr>
            </tbody>
            <tfoot class="hide-if-no-paging">
              <tr>
                  <td colspan="6" class="text-center footable-visible">
                      <ul class="pagination"><li class="footable-page-arrow disabled"><a data-page="first" href="#first">«</a></li><li class="footable-page-arrow disabled"><a data-page="prev" href="#prev">‹</a></li><li class="footable-page active"><a data-page="0" href="#">1</a></li><li class="footable-page"><a data-page="1" href="#">2</a></li><li class="footable-page-arrow"><a data-page="next" href="#next">›</a></li><li class="footable-page-arrow"><a data-page="last" href="#last">»</a></li></ul>
                  </td>
              </tr>
            </tfoot>
          </table>
        </div>
    </div>

    <div class="panel panel-default animated fadeInUp" v-if='isEdit' >
      
        <div class="panel-body">

            <div class="form-box">  

              <form class="bs-example form-horizontal">
              
                <div class="form-group" >
                  <label class="col-sm-2 control-label">跳转链接</label>
                  <div class="col-sm-5">
                    <input type="text" class="form-control" placeholder="跳转链接"  >
                  </div>
                   <label   class="col-sm-5 control-label text-left">链接地址不能为空！</label>
                </div>

                <div class="form-group">
              <label class="col-sm-2 control-label">图片</label>
              <div class="col-sm-5">
                <input ui-jq="filestyle" type="file" data-icon="false" data-classbutton="btn btn-default" data-classinput="form-control inline v-middle input-s" id="filestyle-0" 
                tabindex="-1" 
                style="position: absolute; clip: rect(0px 0px 0px 0px);" @change="fileChange"/>
                <div class="bootstrap-filestyle input-group">
                <input type="text" class="form-control " v-model='file.name' disabled=""> 
                <span class="group-span-filestyle input-group-btn" tabindex="0">
                <label for="filestyle-0" class="btn btn-default ">
                    <span class="glyphicon glyphicon-folder-open"></span>  Open
                </label>

                </span>
                <span class="input-group-btn">
                  <button class="btn btn-default" @click='removeImage'>
                    <span class="glyphicon glyphicon-trash"></span>
                  </button>
                </span>
                </div>
              </div>
              <label   class="col-sm-5 control-label text-left">*图片格式：png | jpg | jpeg</label>

           
            </div>

               <div class="form-group" v-if='img.src'>
                  <div class="col-sm-offset-2 col-sm-5">
                      <a  class="thumbnail pull-left">
                          <img :src="img.src"  >
                      </a>
                      <div class="clear-left">
                        {{img.width}} X {{ img.height}}
                      </div>

                  </div>
               </div>
                <div class="form-group hidden">
                  <div class="col-sm-offset-2 col-sm-10">
                    <div class="checkbox">
                      <label class="i-checks">
                        <input type="checkbox" checked=""><i></i> Remember me
                      </label>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-sm btn-info"  >确 定</button>
                    <button type="submit" class="btn btn-sm btn-default" @click='isEdit=false'> 取 消</button>
                  </div>
                </div>
              </form>
           </div>

           
        </div>
    </div>


 
    
 
	</div>
</template>
<script >
  import {isImg} from 'src/common/js/unit';
	export default {
		name:'banner',
    data(){
      return {
        img: {
          src:'',
          width: "",
          height:''
        },
        file: '',
        isEdit: false
      }
    },methods:{
      fileChange(e){
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) 
        return;
 
        if(isImg(files[0].type)){
            this.file = files[0];
            this.createImage(files[0]);
        }else{
            alert('文件类型不符合！');
        }
        
      },createImage(file) {
              var image = new Image();
              var reader = new FileReader();
              var vm = this;
              reader.onload = (e) => {
                vm.img.src = e.target.result;
                image.src = e.target.result;
                vm.img.width = image.width;
                vm.img.height = image.height;
              };
              reader.readAsDataURL(file);
              
      },
      removeImage: function (e) {
        this.img.src = '';
        this.file = '';
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