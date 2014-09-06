<?php
include_once ('constants.php');
 ?>
<!DOCTYPE html>
<html>
  <head>
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script type='text/javascript' src='js/rwd.js'></script>
		<link rel='stylesheet' type='text/css' href='css/style.css'>
     <script type='text/javascript' src='js/materials.js'></script>
     <script type='text/javascript' src='js/latest_jquery.js'></script>
  </head>
  <body onload="initMaterials();">
  	<?php include_once ('navigation.php'); ?>
  	<div class="content">
  	 
  	 
		<h3>Materials</h3>
  	 
   
    <table border=1 class="estimatorTable">
    <form type="post" onsubmit="addMaterial(); return false;">
    	
       <tr><td>material:</td><td><input type="text" id="material" name="material"    /></td></tr>
       <tr><td>cost:</td><td>$&nbsp;<input type="number" id="material_cost" name="material_cost"    /> </td></tr>
       <tr><td>&nbsp;</td><td><input class="addButton" type="submit" value="+"/></td></tr>
      
    </form>
     </table>
      <table id="materialItems" border=1 class="estimatorTable">
    </table>
   </div>
  </body>
</html>​

