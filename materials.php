<?php
include_once ('constants.php');
 ?>
<!DOCTYPE html>
<html>
  <head>
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
		<link rel='stylesheet' type='text/css' href='css/style.css'>
     <script type='text/javascript' src='js/materials.js'></script>
  </head>
  <body onload="initMaterials();">
  	<?php include_once ('navigation.php'); ?>
  	<div class="content">
  	 
  	 
		<h3>Materials</h3>
  	 
    <ul id="materialItems">
    </ul>
    <form type="post" onsubmit="addMaterial(); return false;">
      <div class='form_row'>material:<input type="text" id="material" name="material"  style="width: 50%;" /></div>
      <div class='form_row'>cost:<input type="text" id="material_cost" name="material_cost"  style="width: 50%;" /></div>
      <div class='form_row'><input type="submit" value="+ material"/>
    </form>
   </div>
  </body>
</html>​