<?php
include_once ('constants.php');

 ?>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
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

			<h2>Estimate</h2>
					<div class='directions' style='font-size:11px;font-style:italic;'>Add rate per hour,tasks, and materials.</div>

			<div id='estimateControlHeader'>

				<button id='newEstimateFormButton' onclick='openNewEstimateForm();' >
					new estimate
				</button>
				<!-- NEW ESTIMATE FORM -->
				<div id='newEstimateForm' style='display:none;'>
					
					<table border=1 class="estimatorTable">
						<form type="post" onsubmit="addEstimate(); return false;">
							<tr>
								<th>$/hr</th><th>Name</th><th>New</th>
							</tr>
							<tr>
								<td>$&nbsp;
								<input type="number"  step="any"  id="hrRate" name="hrRate"  style="width:50%;" />
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
				<!-- EXISTING ESTIMATE -->
				<table id="estimateItems" border=1 class="estimatorTable"></table>

			</div>

			<!-- ESTIMATE SUMMARY -->
			<div id='summaryDiv' >
				<h3>Summary:</h3>
				<table class='summaryTable' border=1 width=100%>
					<tr>
						<td id='estimateName' style='font-weight:bold;background-color:lightblue;'></td>
						<td>tasks:</td><td id='taskCost' style='font-weight:bold;'></td>
						<td>materials:</td><td id='materialCost' style='font-weight:bold;'></td>
						<td>time:</td><td id='est_time' style='font-weight:bold;'></td>
						<td>total:</td><td id='totalCost' style='font-weight:bold;color:green;'></td>
					</tr>
				</table>
			</div>

			<div id="estimate_details" >

				<table id="selectedEstimateItem" width=100%;></table>

				 

						<table id="todoItemsForCurrentEstimate" border=1 class="estimatorTable"></table>

						<table id="materialItemsForCurrentEstimate"  border=1 class="estimatorTable"></table>
					
				<button id='finalize' style='margin-top:20px;font-weight:bold;'  >
						finalize
					</button>
				<button id='save' style='margin-top:20px;font-weight:bold;'  >
						save
					</button>

				<div id='availableSelections' class='form_row'style='float:left; width:100%;'>
					<h3> Available Tasks: </h3>
					<div class="scrollingContainer">
						<table id="todoItemsForEstimates" border=1 class="estimatorTable"></table>
					</div>
					
					<h3> Available Materials: </h3>
					<div class="scrollingContainer">
					<table id="materialItemsForEstimates" border=1 class="estimatorTable"></table>
					</div>
				</div>

			</div>

		</div>

		</body>
		</html>​

		<script>
			$(document).ready(function() {
				console.log("ready!");
				//alert('jq and js'); start

				var summaryDiv = document.getElementById('summaryDiv');
				summaryDiv.style.display="none";
			});

			$("#finalize").click(function() {

				var totalMinutes = 0;
				$.each($(".data_minutes"), function(i, e) {
					totalMinutes = totalMinutes + parseFloat(e.value);
				});
				sessionStorage.totalMinutes = totalMinutes;

				var totalTask = 0;
				$.each($(".data_tasks"), function(i, e) {
					totalTask = totalTask + parseFloat(e.value);
				});
				sessionStorage.totalTask = totalTask;

				var totalMaterial = 0;
				$.each($(".data_materials"), function(i, e) {
					totalMaterial = totalMaterial + parseFloat(e.value);
				});
				sessionStorage.totalMaterial = totalMaterial;

				var totalTasksAndMaterials = totalTask + totalMaterial;
				sessionStorage.totalCost = totalTasksAndMaterials;

				//var summaryDiv = document.getElementById('summaryDiv');
				//summaryDiv.style.display="block";  delete estimate REALLY
				
				
				
				//update summary values
				//populate the SUMMARY  with values clear orphans
				$("#estimateName").text(sessionStorage.estimate_name);
				
				var cleanTaskTotal = Math.round(sessionStorage.totalTask * 100)/100;
				$("#taskCost").text("$"+cleanTaskTotal);
				
				var cleanMaterialTotal = Math.round(sessionStorage.totalMaterial * 100)/100;
				$("#materialCost").text("$"+cleanMaterialTotal);

				var est_hours = Math.round((sessionStorage.totalMinutes / 60) * 100) / 100;
				//alert(est_hours);
				$("#est_time").text(est_hours+"hrs");
				var cleanCostTotal = Math.round(sessionStorage.totalCost * 100)/100;
				$("#totalCost").text("$"+cleanCostTotal);

				var summaryDiv = document.getElementById('summaryDiv');
				summaryDiv.style.display="block";

			});
			
			$("#save").click(function() {
				
			});

		</script>