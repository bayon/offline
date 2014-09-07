<?php
include_once ('head.php');
?>
<body onload="initMaterials();">
	<?php
	include_once ('navigation.php');
	?>
	<div class="content">

		<h3>Materials</h3>
		<div class='directions' style='font-size:11px;font-style:italic;'>
			A general list of materials.
		</div>

		<table border=1 class="estimatorTable">
			<form type="post" onsubmit="addMaterial(); return false;">

				<tr>
					<td>material:</td><td>
					<input type="text" id="material" name="material"    />
					</td>
				</tr>
				<tr>
					<td>cost:</td><td>$&nbsp;
					<input type="number"  step="any" id="material_cost" name="material_cost"    />
					</td>
				</tr>
				<tr>
					<td>&nbsp;</td><td>
					<input class="addButton" type="submit" value="+"/>
					</td>
				</tr>

			</form>
		</table>
		<table id="materialItems" border=1 class="estimatorTable"></table>
	</div>
</body>
</html>​

