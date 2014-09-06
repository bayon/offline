<?php
include_once ('constants.php');
if(isset($_GET)){
	print_r($_GET);
}
 ?>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
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

<h2>Estimate</h2>

			<table border=1 class="estimatorTable">
				<form type="post" onsubmit="addEstimate(); return false;">
					<tr>
						<th>$/hr</th><th>Name</th><th>New</th>
					</tr>
					<tr>
						<td>$&nbsp;
						<input type="text" id="hrRate" name="hrRate"  style="width: 20px;" />
						</td>
						<td>
						<input type="text" id="estimate" name="estimate"    />
						</td>
						<td>
						<input type="submit" value="+"/>
						</td>
					</tr>
				</form>
			</table>
			<table id="estimateItems" border=1 class="estimatorTable"></table>

			<div id="estimate_details" >

				<table id="selectedEstimateItem" width=100%;></table>
				<table>
					<tr><td>tasks:</td><td id='taskCost'></td></tr>
					<tr><td>materials:</td><td id='materialCost'></td></tr>
					<tr><td>total:</td><td id='totalCost'></td></tr>
				</table>


				<table>
					<tr>
						<td>rate per hour</td><td>
						<input id='ratePerHour' type='text' value='' style='width:30px;'/>
						</td>
					</tr>
					<tr>
						<td>rate per minute</td><td>
						<input id='ratePerMin' type='text' value='' style='width:30px;'/>
						</td>
					</tr>
				</table>


<form id="myFormId" action="#">
<input type='hidden'  name='hidden_name' />
				<div  class='form_row'  style='float:left; width:100%;'>
					<h3> Current Tasks: </h3>
					<table id="todoItemsForCurrentEstimate" border=1 class="estimatorTable"></table>
					<h3> Current Materials: </h3>
					<table id="materialItemsForCurrentEstimate"  border=1 class="estimatorTable"></table>
				</div>
<button id='finalize'   >finalize</button>
</form>
<div id="results"></div>


				<div  class='form_row'style='float:left; width:100%;'>
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
		//alert('jq and js');
		
		
		

	}); 
	$("#finalize").click(function(){
	// when the button is clicked
	var totalTask=0;
		$.each($(".data_tasks"),function(i,e){
		// loop through all the items
			// and alert the value
			//alert(e.value);
			totalTask = totalTask + parseFloat(e.value);
		});
		alert(totalTask);
		sessionStorage.totalTask = totalTask;
		var totalMaterial=0;
		$.each($(".data_materials"),function(i,e){
		// loop through all the items
			// and alert the value
			//alert(e.value);
			totalMaterial = totalMaterial + parseFloat(e.value);
		});
		alert(totalMaterial);
		sessionStorage.totalMaterial = totalMaterial;
		var totalTasksAndMaterials = totalTask + totalMaterial;
		alert("grand total: "+totalTasksAndMaterials);
		//NOT HEREvar totalCost = document.getElementById('taskCost');
		//totalCost.value="$"+totalTasksAndMaterials;
		sessionStorage.totalCost = totalTasksAndMaterials;
	});
	
</script>