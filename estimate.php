<?php include_once('constants.php'); ?>
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
  <?php include_once ('navigation.php'); ?>
 
		<h3>Estimate</h3>
  	
    <ul id="estimateItems">
    </ul>
    <form type="post" onsubmit="addEstimate(); return false;">
      <input type="text" id="estimate" name="estimate"  style="width: 200px;" />
      <input type="submit" value="+ estimate"/>
    </form>
    
    
    <p>Selected Estimate:</p>
    <ul id="selectedEstimateItem"></ul>
    <p>Available Tasks:</p>
     <ul id="todoItemsForEstimate">
    </ul>
     <p>Available Materials:</p>
     <ul id="materialItemsForEstimate">
    </ul>
    
   
  </body>
</html>​