<?php
include_once ('constants.php');
 ?>
<!DOCTYPE html>
<html>
  <head>
  	<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
		<link rel='stylesheet' type='text/css' href='css/style.css'>
     <script type='text/javascript' src='js/tasks.js'></script>
     
  </head>
  <body onload="initTasks();">
  	<?php include_once ('navigation.php'); ?>
  	<div class="content">
  		 
   
		<h3>Tasks</h3>
    <ul id="todoItems">
    </ul>
    <form type="post" onsubmit="addTodo(); return false;">
    <div class='form_row'> task:<input type="text" id="todo" name="todo"  style="width: 50%;" /></div> 
     <div class='form_row'>  min: <input type="text" id="minutes" name="minutes"  style="width: 50%;" /></div> 
      <div class='form_row'><input type="submit" value="task"/></div>
    </form>
    </div>
  </body>
</html>​