<?php
include_once ('constants.php');
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
	</head>
	<body onload="initEstimate();">
		<?php include_once ('navigation.php'); ?>
		<div class="content">


  
 
	<h3>Estimate</h3>

		<ul id="estimateItems"></ul>
		<form type="post" onsubmit="addEstimate(); return false;">
			<div class='form_row'>$/hr<input type="text" id="hrRate" name="hrRate"  style="width: 20px;" />
			<input type="text" id="estimate" name="estimate"  style="width: 30%;" />
			<input type="submit" value="+ estimate"/></div>
		</form>

		<p>
			Selected Estimate:
		</p>
		<ul id="selectedEstimateItem"></ul>
		<div>
			rate per hour:<input id='ratePerHour' type='text' value='' style='width:30px;'/> 
		</div>
		<div>
			rate per minute:<input id='ratePerMin' type='text' value='' style='width:30px;'/> 
		</div>
		 
		
		
		<div  class='form_row'  style='float:left;border:solid 1px #eee;'>
			<p>
			Current Tasks:
		</p>
		<table id="todoItemsForCurrentEstimate" border=1 class="estimatorTable"></table>
		<p>
			Current Materials:
		</p>
		<table id="materialItemsForCurrentEstimate"  border=1 class="estimatorTable"></table>
		</div>
		
		
		<div  class='form_row'style='float:left;border:solid 1px #eee;width:100%;'>
			<p>
			Available Tasks:
		</p>
		<ul id="todoItemsForEstimates"></ul>
		<p>
			Available Materials:
		</p>
		<ul id="materialItemsForEstimates"></ul>
		</div>
		</div>
		</body>
		</html>​