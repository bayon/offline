<?php include_once('constants.php'); ?>
<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html manifest='cache.appcache'>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
		<link rel='stylesheet' type='text/css' href='css/style.css'>
	</head>
	<body >
		<?php include_once('navigation.php'); ?>
		<div class="content">
		<h3>A quick estimate calculator for people who do things with stuff.</h3>
		
	<p> How it works.</p>
     <ul>
     	
     	
     	<li>Make a general list of tasks and how long they take in minutes.</li>
     	<li>Make a list of materials and how much they cost each.</li>
     	<li>Enter your hourly rate.</li>
     	<li>Add tasks and materials from your lists to your estimate.</li>
     	<li>Adjust how many times each task gets performed.</li>
     	<li>Adjust how many pieces of each material you'll need.</li>
     	<li>Click finalize and see the results.</li>
     		<ul>
     			<li>Cost of Tasks.</li>
     			<li>Cost of Materials.</li>
     			<li>The time it will take.</li>
     			<li>The total cost.</li>
     		</ul>
     	<li>And...it works even if you don't have an internet connection!</li>
     	
  		
  	</ul>
  	 
  </div>
	</body>
</html>
<!-- new Material  prevent duplicates with SQL sqlite: UNIQUE ON CONFLICT REPLACE   remove -->​