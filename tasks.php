<?php include_once ('head.php'); ?>
<body onload="initTasks();">
	<?php include_once ('navigation.php');
	?>
	<div class="content">

		<h3>Tasks</h3>
		<div class='directions' style='font-size:11px;font-style:italic;'>
			A general list of tasks.
		</div>
		<table border=1 class="estimatorTable">
			<form type="post" onsubmit="addTodo(); return false;">
				<tr>
					<td>task</td><td>
					<input type="text" id="todo" name="todo"    />
					</td>
				</tr>
				<tr>
					<td>min</td><td>
					<input type="number"  step="any" id="minutes" name="minutes"    />
					&nbsp;min</td>
				</tr>
				<tr>
					<td>&nbsp;</td><td>
					<input class="addButton" type="submit" value="+"/>
					</td>
				</tr>
			</form>
		</table>
		<table id="todoItems" border=1 class="estimatorTable"></table>

	</div>
</body>
</html>​ 