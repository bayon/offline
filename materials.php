<!DOCTYPE html>
<html>
  <head>
     <link rel='stylesheet' type='text/css' href='css/style.css'>
     <script type='text/javascript' src='js/materials.js'></script>
     

  </head>
  <body onload="initMaterials();">
  	<?php include_once('navigation.php'); ?>
  	<h2>Estimator:</h2>
		<h3>Materials</h3>
  	 
    <ul id="materialItems">
    </ul>
    <form type="post" onsubmit="addMaterial(); return false;">
      material:<input type="text" id="material" name="material"  style="width: 200px;" />
      cost:<input type="text" id="material_cost" name="material_cost"  style="width: 200px;" />
      <input type="submit" value="+ material"/>
    </form>
  </body>
</html>​