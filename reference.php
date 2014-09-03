<html>
	<head>
		<link rel='stylesheet' type='text/css' href='css/style.css'>
		<!--<script type='text/javascript' src='js/tasks.js'></script>-->
	</head>
	<body >
		<?php
		include_once ('navigation.php');
		
		if(isset($_POST)){
			echo($_POST['id']);
			mysql_connect('localhost', 'root', 'root');
			$sql_now = "select * from training.Task where id='".$_POST['id']."' ";
		$res_now = mysql_query($sql_now);
		echo(mysql_error());
		$row_now = mysql_fetch_assoc($res_now);
		
		}
 ?>
		<h2>Construction Estimator:</h2>
		<h3>Reference</h3>
		<?php
		mysql_connect('localhost', 'root', 'root');
		//mysql_connect('forteworks.com:3307', 'bayonforte', 'ph0rt3w0rk$');
		$sql = "select * from training.Task order by os";
		$res = mysql_query($sql);
		echo(mysql_error());
		while ($row = mysql_fetch_assoc($res)) {
			$data[] = $row;
		}
		//echo("<pre>");print_r($data);echo("</pre>");
		echo("<div style='overflow-y:scroll;height:200px;border:solid 1px #222;'><table width=100% border=1 >");
		foreach ($data as $row) {
			//echo("<pre>");print_r($row);echo("</pre>");
			//<pre>" . $row['description'] . "</pre>
			echo("<form method='post' action='".$_SERVER['PHP_SELF']."'><tr><td>" . $row['os'] . "</td><td>" . $row['title'] . "</td><td><button type='submit' name='id' value='" . $row['id'] . "' ></button></td></tr></form>");

		}
		echo("</table></div>");
		echo("<div style='overflow-y:scroll;height:200px;border:solid 1px #222;'><pre>".htmlspecialchars($row_now['description'])."</pre></div>");

	?>
	</body>
</html>​


