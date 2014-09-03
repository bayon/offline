<!DOCTYPE html>
<html>
  <head>
  	<link rel='stylesheet' type='text/css' href='css/style.css'>
     <script type='text/javascript' src='js/tasks.js'></script>
    <script>
     
    </script>
  </head>
  <body onload="initTasks();">
  	<?php include_once('navigation.php'); ?>
  <h2>Construction Estimator:</h2>
		<h3>Tasks</h3>
  	
    <ul id="todoItems">
    </ul>
    <form type="post" onsubmit="addTodo(); return false;">
      task:<input type="text" id="todo" name="todo"  style="width: 200px;" />
      min: <input type="text" id="minutes" name="minutes"  style="width: 200px;" />
      <input type="submit" value="task"/>
    </form>
  </body>
</html>​