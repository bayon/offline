<?php include_once('constants.php'); ?>
<html>
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
     	
     	
     	<li>prevent duplicate entries into estimate tasks or materials</li>
     	<li>upon estimate deletion, remove orphans tasks and materials.both UI and DB</li>
     	<li>apply appcache </li>
     	<li>RWD and more user-friendly</li>
  		
  	</ul>
  	<p> Done</p>
  	<ul>
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
<!-- new Material -->​