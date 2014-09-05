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
		<?php
		include_once ('navigation.php');
 ?>
		<div class="content">


  
 
	<h2>Estimate</h2>

		
		<table border=1 class="estimatorTable">
		<form type="post" onsubmit="addEstimate(); return false;">
			<tr><th>$/hr</th><th>Name</th><th>New</th></tr>
			 <tr><td>$&nbsp;<input type="text" id="hrRate" name="hrRate"  style="width: 20px;" /></td>
			<td><input type="text" id="estimate" name="estimate"    /></td>
			<td><input type="submit" value="+"/></td> </tr>
		</form>
		</table>
		<table id="estimateItems" border=1 class="estimatorTable"></table>
		
		
		<div id="estimate_details" >

		 
		<table id="selectedEstimateItem" width=100%;></table>
		
		<table>
		<tr>
			<td>rate per hour</td><td><input id='ratePerHour' type='text' value='' style='width:30px;'/></td> 
		</tr>
		<tr>
			<td>rate per minute</td><td><input id='ratePerMin' type='text' value='' style='width:30px;'/> </td>
		</tr>
		 </table>
		
		
		<div  class='form_row'  style='float:left; width:100%;'>
			<h3>
			Current Tasks:
		</h3>
		<table id="todoItemsForCurrentEstimate" border=1 class="estimatorTable"></table>
		<h3>
			Current Materials:
		</h3>
		<table id="materialItemsForCurrentEstimate"  border=1 class="estimatorTable"></table>
		</div>
		
		
		<div  class='form_row'style='float:left; width:100%;'>
			<h3>
			Available Tasks:
		</h3>
		<table id="todoItemsForEstimates" border=1 class="estimatorTable"></table>
		<h3>
			Available Materials:
		</h3>
		<table id="materialItemsForEstimates" border=1 class="estimatorTable"></table>
		</div>
		
		</div>
		
		</div>
		
		</body>
		</html>​