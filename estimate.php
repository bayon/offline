<?php
include_once ('constants.php');
 ?>
<!DOCTYPE html>
<html>
	<head>
		<link rel='stylesheet' type='text/css' href='css/style.css'>
		<script type='text/javascript' src='m/EstimateModel.js'></script>
		<script type='text/javascript' src='m/TaskModel.js'></script>
		<script type='text/javascript' src='m/MaterialModel.js'></script>
		<script type='text/javascript' src='js/estimate.js'></script>
		<script type='text/javascript' src='js/tasks.js'></script>
		<script type='text/javascript' src='js/materials.js'></script>
	</head>
	<body onload="initEstimate();">


  <?php
	include_once ('navigation.php');
 ?>
 
	<h3>Estimate</h3>

		<ul id="estimateItems"></ul>
		<form type="post" onsubmit="addEstimate(); return false;">
			<input type="text" id="estimate" name="estimate"  style="width: 200px;" />
			<input type="submit" value="+ estimate"/>
		</form>

		<p>
			Selected Estimate:
		</p>
		<ul id="selectedEstimateItem"></ul>
		
		<div style='float:right;border:solid 1px #eee;'>
			<p>
			Available Tasks:
		</p>
		<ul id="todoItemsForEstimates"></ul>
		<p>
			Available Materials:
		</p>
		<ul id="materialItemsForEstimates"></ul>
		</div>
		
		
		<div style='float:right;border:solid 1px #eee;'>
			<p>
			Current Tasks:
		</p>
		<ul id="todoItemsForCurrentEstimate"></ul>
		<p>
			Current Materials:
		</p>
		<ul id="materialItemsForCurrentEstimate"></ul>
		</div>
		

		</body>
		</html>​