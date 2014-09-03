<!DOCTYPE html>
<html>
  <head>
    <link rel='stylesheet' type='text/css' href='css/style.css'>
    <script type='text/javascript' src='m/EstimateModel.js'></script>
   <script type='text/javascript' src='js/estimate.js'></script>
   <script type='text/javascript' src='js/tasks.js'></script>
   <script type='text/javascript' src='js/materials.js'></script>
  </head>
  <body onload="initEstimate();">
  <?php include_once('navigation.php'); ?>
  <div>
  	
  	
  </div>
  	<h2>Estimator:</h2>
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
    
    <p> Software tasks for estimate creation.</p>
    
     <ul>
  		<li>select from "tasks" </li>
  			<ul>
  				<li>add time to complete</li>
  				<li>number of repitions</li>
  			</ul>
  		<li>select from "materials"</li>
  			<ul>
  				<li>add number needed</li>
  			</ul>
  	</ul>
    <script>
   
	
    </script>
  </body>
</html>​