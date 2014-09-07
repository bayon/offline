<?php
include_once ('constants.php');
 ?>
<!DOCTYPE html>
<html>
  <head>
  	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  	<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script type='text/javascript' src='js/rwd.js'></script>
		<link rel='stylesheet' type='text/css' href='css/style.css'>
     <script type='text/javascript' src='js/tasks.js'></script>
     <script type='text/javascript' src='js/latest_jquery.js'></script>
     
  </head>
  <body onload="initTasks();">
  	<?php include_once ('navigation.php'); ?>
  	<div class="content">
  		 
   
		<h3>Tasks</h3>
		<div class='directions' style='font-size:11px;font-style:italic;'>A general list of tasks.</div>
    <table border=1 class="estimatorTable">
    <form type="post" onsubmit="addTodo(); return false;">
      <tr><td>task</td><td><input type="text" id="todo" name="todo"    /></td> </tr>
      <tr><td>min</td><td><input type="number"  step="any" id="minutes" name="minutes"    />&nbsp;min</td> </tr>
       <tr><td>&nbsp;</td><td><input class="addButton" type="submit" value="+"/></td> </tr>
    </form>
    </table>
     <table id="todoItems" border=1 class="estimatorTable">
    </table>
    
    </div>
  </body>
</html>​