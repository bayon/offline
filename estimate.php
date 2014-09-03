<!DOCTYPE html>
<html>
  <head>
    <link rel='stylesheet' type='text/css' href='css/style.css'>
   <script type='text/javascript' src='js/estimate.js'></script>
   <script type='text/javascript' src='js/tasks.js'></script>
   <script type='text/javascript' src='js/materials.js'></script>
  </head>
  <body onload="initEstimate();">
  <?php include_once('navigation.php'); ?>
  <div>
  	
  	
  </div>
  	<h2>Construction Estimator:</h2>
		<h3>Estimate</h3>
  	
    <ul id="estimateItems">
    </ul>
    <form type="post" onsubmit="addEstimate(); return false;">
      <input type="text" id="estimate" name="estimate"  style="width: 200px;" />
      <input type="submit" value="+ estimate"/>
    </form>
    
    
     <ul id="todoItemsForEstimate">
    </ul>
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
    /* ///////////////////// BASIC OBJECT //////////////////////////// */

	function Estimate(arrayOfThings) {

		this.arrayOfThings = arrayOfThings;
	}


	Estimate.prototype.arrayOfThings = '';

	Estimate.prototype.reveal = function() {
		
		alert(this.arrayOfThings);
	};
	Estimate.prototype.addElement = function(element) {

		this.arrayOfThings.push(element);
	};
    	var myArray = new Array('one', 'two', 'three');
	var estimate1 = new Estimate(myArray);

	// call the Estimate reveal method.
	//estimate1.reveal();
	//estimate1.addElement('banana');
	//estimate1.reveal();
	// hello
    </script>
  </body>
</html>​