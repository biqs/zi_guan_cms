<template>
	<div class="datagrid">
	<div class="top-bar">
 	 <div class="panel panel-default">
    <div class="panel-heading font-bold">                  
        Banner
    </div>
    <div class="panel-body">
   	 
        <button class="btn m-b-xs btn-sm btn-default btn-addon"><i class="fa fa-plus"></i>添加</button>
        <button class="btn m-b-xs btn-sm btn-default btn-addon"><i class="fa fa-trash-o"></i>删除</button>



        
      
      
    </div>
  </div>
 	</div>	

<div class="">
  <div class="panel panel-default">
  
   
    <div>
      <table class="table m-b-none footable-loaded footable default" ui-jq="footable" data-filter="#filter" data-page-size="5">
        <thead>
          <tr>
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
              <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Shona</td>
              <td class="footable-visible">Woldt</td>
              <td class="footable-visible"><a href="">Airline Transport Pilot</a></td>
              <td data-value="370961043292" class="footable-visible">3 Oct 1981</td>
              <td data-value="2" class="footable-visible footable-last-column"><span class="label bg-light" title="Disabled">Disabled</span></td>
          </tr>
          <tr class="footable-even" style="display: table-row;">
              <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Granville</td>
              <td class="footable-visible">Leonardo</td>
              <td class="footable-visible">Business Services Sales Representative</td>
              <td data-value="-22133780420" class="footable-visible">19 Apr 1969</td>
              <td data-value="3" class="footable-visible footable-last-column"><span class="label bg-warning" title="Suspended">Suspended</span>
              </td>
          </tr>
          <tr class="footable-odd" style="display: table-row;">
              <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Easer</td>
              <td class="footable-visible">Dragoo</td>
              <td class="footable-visible">Drywall Stripper</td>
              <td data-value="250833505574" class="footable-visible">13 Dec 1977</td>
              <td data-value="1" class="footable-visible footable-last-column"><span class="label bg-success" title="Active">Active</span></td>
          </tr>
          <tr class="footable-even" style="display: table-row;">
              <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Maple</td>
              <td class="footable-visible">Halladay</td>
              <td class="footable-visible">Aviation Tactical Readiness Officer</td>
              <td data-value="694116650726" class="footable-visible">30 Dec 1991</td>
              <td data-value="3" class="footable-visible footable-last-column"><span class="label bg-warning" title="Suspended">Suspended</span>
              </td>
          </tr>
          <tr class="footable-odd" style="display: none;">
              <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Maxine</td>
              <td class="footable-visible"><a href="">Woldt</a></td>
              <td class="footable-visible"><a href="">Business Services Sales Representative</a></td>
              <td data-value="561440464855" class="footable-visible">17 Oct 1987</td>
              <td data-value="2" class="footable-visible footable-last-column"><span class="label bg-light" title="Disabled">Disabled</span></td>
          </tr>
          <tr class="footable-even" style="display: none;">
              <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Lorraine</td>
              <td class="footable-visible">Mcgaughy</td>
              <td class="footable-visible">Hemodialysis Technician</td>
              <td data-value="437400551390" class="footable-visible">11 Nov 1983</td>
              <td data-value="2" class="footable-visible footable-last-column"><span class="label bg-light" title="Disabled">Disabled</span></td>
          </tr>
          <tr class="footable-odd" style="display: none;">
              <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Lizzee</td>
              <td class="footable-visible"><a href="">Goodlow</a></td>
              <td class="footable-visible">Technical Services Librarian</td>
              <td data-value="-257733999319" class="footable-visible">1 Nov 1961</td>
              <td data-value="3" class="footable-visible footable-last-column"><span class="label bg-warning" title="Suspended">Suspended</span>
              </td>
          </tr>
          <tr class="footable-even" style="display: none;">
              <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Judi</td>
              <td class="footable-visible">Badgett</td>
              <td class="footable-visible">Electrical Lineworker</td>
              <td data-value="362134712000" class="footable-visible">23 Jun 1981</td>
              <td data-value="1" class="footable-visible footable-last-column"><span class="label bg-success" title="Active">Active</span></td>
          </tr>
          <tr class="footable-odd" style="display: none;">
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
              <td colspan="5" class="text-center footable-visible">
                  <ul class="pagination"><li class="footable-page-arrow disabled"><a data-page="first" href="#first">«</a></li><li class="footable-page-arrow disabled"><a data-page="prev" href="#prev">‹</a></li><li class="footable-page active"><a data-page="0" href="#">1</a></li><li class="footable-page"><a data-page="1" href="#">2</a></li><li class="footable-page-arrow"><a data-page="next" href="#next">›</a></li><li class="footable-page-arrow"><a data-page="last" href="#last">»</a></li></ul>
              </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</div>
 
    
 
	</div>
</template>
<script >
	export default {
		name:'datagrid'
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