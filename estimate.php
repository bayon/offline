<?php
include_once ('constants.php');

 ?>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<script type='text/javascript' src='js/rwd.js'></script>

		<link rel='stylesheet' type='text/css' href='css/style.css'>
		
		<script type='text/javascript' src='m/EstimateModel.js'></script>
		<script type='text/javascript' src='m/TaskModel.js'></script>
		<script type='text/javascript' src='m/MaterialModel.js'></script>
		<script type='text/javascript' src='js/estimate.js'></script>
		<script type='text/javascript' src='js/tasks.js'></script>
		<script type='text/javascript' src='js/materials.js'></script>
		<script type='text/javascript' src='js/latest_jquery.js'></script>
	</head>
	<body onload="initEstimate();">
		<?php
		include_once ('navigation.php');
 ?>
		<div class="content">

<h3>Estimate</h3>
			<div id='estimateControlHeader'>
				
			<button id='newEstimateFormButton' onclick='openNewEstimateForm();' >+</button>
			<!-- NEW ESTIMATE FORM -->
			<div id='newEstimateForm' style='display:none;'>
			<table border=1 class="estimatorTable">
				<form type="post" onsubmit="addEstimate(); return false;">
					<tr>
						<th>$/hr</th><th>Name</th><th>New</th>
					</tr>
					<tr>
						<td>$&nbsp;
						<input type="number" id="hrRate" name="hrRate"  style="width:50%;" />
						</td>
						<td>
						<input type="text" id="estimate" name="estimate"  style="width:80%;"  />
						</td>
						<td>
						<input class="addButton" type="submit" value="+"  style="width:100%;"/>
						</td>
					</tr>
				</form>
			</table>
			</div>
			<!-- EXISTING ESTIMATES -->
			<table id="estimateItems" border=1 class="estimatorTable"></table>
			
			<!-- ESTIMATE SUMMARY -->
					<h3>Summary:</h3>
					<table class='summaryTable' border=1 width=100%>
					<tr>	<td id='estimateName' style='font-weight:bold;background-color:lightblue;'></td>
					<td>tasks:</td>		<td id='taskCost' style='font-weight:bold;'></td>
					<td>materials:</td>	<td id='materialCost' style='font-weight:bold;'></td>
					<td>hours:</td>		<td id='est_time' style='font-weight:bold;'></td>
					<td>total $:</td>		<td id='totalCost' style='font-weight:bold;color:green;'></td></tr>
					</table>
			
</div>


					

			<div id="estimate_details" >

				<table id="selectedEstimateItem" width=100%;></table>
				


				 


<form id="myFormId" action="#">
<input type='hidden'  name='hidden_name' />
				<div  class='form_row'  style='float:left; width:100%;'>
					
					<table id="todoItemsForCurrentEstimate" border=1 class="estimatorTable"></table>
					
					<table id="materialItemsForCurrentEstimate"  border=1 class="estimatorTable"></table>
				</div>
<button id='finalize' style='margin-top:20px;font-weight:bold;'  >finalize</button>
</form>
<div id="results"></div>


				<div id='availableSelections' class='form_row'style='float:left; width:100%;'>
					<h3> Available Tasks: </h3>
					<table id="todoItemsForEstimates" border=1 class="estimatorTable"></table>
					<h3> Available Materials: </h3>
					<table id="materialItemsForEstimates" border=1 class="estimatorTable"></table>
				</div>

			</div>

			</div>

			</body>
			</html>​
			
<script>
	$(document).ready(function() {
		console.log("ready!");
		//alert('jq and js'); start
		
		 
		//populate the SUMMARY  with values
		$( "#estimateName" ).text( sessionStorage.estimate_name );
		$( "#taskCost" ).text( sessionStorage.totalTask );
		$( "#materialCost" ).text( sessionStorage.totalMaterial );
		
		var est_hours = Math.round((sessionStorage.totalMinutes/60)*100)/100;
		//alert(est_hours);
		$( "#est_time" ).text( est_hours );
		$( "#totalCost" ).text( sessionStorage.totalCost );
		 
		 
		 
		 
	});
		
	 
		
		
		 
	$("#finalize").click(function(){
		
		var totalMinutes=0;
		$.each($(".data_minutes"),function(i,e){
			totalMinutes = totalMinutes + parseFloat(e.value);
		});
		sessionStorage.totalMinutes = totalMinutes;
	
		var totalTask=0;
		$.each($(".data_tasks"),function(i,e){
			totalTask = totalTask + parseFloat(e.value);
		});
		sessionStorage.totalTask = totalTask;
		
		var totalMaterial=0;
		$.each($(".data_materials"),function(i,e){
			totalMaterial = totalMaterial + parseFloat(e.value);
		});
		sessionStorage.totalMaterial = totalMaterial;
		
		var totalTasksAndMaterials = totalTask + totalMaterial;
		sessionStorage.totalCost = totalTasksAndMaterials;
		
	});
	function openNewEstimateForm(){
		var newEstimateForm = document.getElementById('newEstimateForm');
		newEstimateForm.style.display="block";
	}
</script>