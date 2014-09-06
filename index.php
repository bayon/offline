<?php include_once('constants.php'); ?>
<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html manifest='cache.appcache'>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
		<link rel='stylesheet' type='text/css' href='css/style.css'>
	</head>
	<body >
		<?php include_once('navigation.php'); ?>
		<div class="content">
		<h3>Home</h3>
		
	<p> Software tasks for estimate creation.</p>
     <ul>
     	
     	
     	<li>upon selecting a task or material for an estimate, others get deleted.</li>
     	<li>calculate final estimate and customer display</li>
     	<li>apply appcache </li>
     	<li>RWD and more user-friendly</li>
     	
  		
  	</ul>
  	<p> Done</p>
  	<ul>
  		<li>upon estimate deletion, remove orphans tasks and materials.both UI and DB</li>
     	<li>FOREIGN KEY (sketchID) REFERENCES Sketch (sketchId), </li>
  		<li>prevent duplicate entries USED SQL UNIQUE ON CONFLICT REPLACE</li>
  		<li>display hourly rate or rate per min.</li>
  		<li>enter hourly rate,store rate per min as sessionStorage.rate_per_min </li>
  		<li>use rate_per_min to calculate subtotal for tasks</li>
  		<li>display selected  "materials"</li>
  			<ul>
  				<li>add number needed and calculate subtotal cost</li>
  			</ul>
  		<li>display selected "tasks" </li>
  			<ul>
  				<li>number of repitions and calculate subtotal time</li>
  			</ul>
  		<li>need to insert estimate ID with each "forEstimate" item added.</li>
     	<li>try store est id in local storage.</li>
     		<ul>
     			<li>localStorage.foo = "bar"</li>
     			<li>sessionStorage.foo = "bar"</li>
     		</ul>
  	</ul>
  </div>
	</body>
</html>
<!-- new Material  prevent duplicates with SQL sqlite: UNIQUE ON CONFLICT REPLACE   remove -->​