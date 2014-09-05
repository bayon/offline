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
    <table border=1 class="estimatorTable">
    <form type="post" onsubmit="addTodo(); return false;">
      <tr><td>task</td><td><input type="text" id="todo" name="todo"    /></td> </tr>
      <tr><td>min</td><td><input type="text" id="minutes" name="minutes"    /></td> </tr>
       <tr><td><input type="submit" value="+"/></td><td>&nbsp;</td> </tr>
    </form>
    </table>
     <table id="todoItems" border=1 class="estimatorTable">
    </table>
    
    </div>
  </body>
</html>​