var taskNameSpace = {};
taskNameSpace.webdb = {};
taskNameSpace.webdb.db = null;

taskNameSpace.webdb.open = function() {
	var dbSize = 5 * 1024 * 1024;
	// 5MB
	taskNameSpace.webdb.db = openDatabase("Todo", "1.0", "Todo manager", dbSize);
};

taskNameSpace.webdb.createTaskTable = function() {
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS todo(ID INTEGER PRIMARY KEY ASC, todo TEXT  UNIQUE ON CONFLICT REPLACE, minutes INTEGER, added_on DATETIME)", []);
	});
};

taskNameSpace.webdb.addTodo = function(todoText, minutesText) {
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		var addedOn = new Date();
		var minutes = parseInt(minutesText);
		tx.executeSql("INSERT INTO todo(todo, minutes, added_on) VALUES (?,?,?)", [todoText, minutes, addedOn], taskNameSpace.webdb.onTaskSuccess, taskNameSpace.webdb.onTaskError);
	});
};

taskNameSpace.webdb.onTaskError = function(tx, e) {
	alert("There has been an error: " + e.message);
};

taskNameSpace.webdb.onTaskSuccess = function(tx, r) {
	taskNameSpace.webdb.getAllTodoItems(loadTodoItems);
};

taskNameSpace.webdb.getAllTodoItems = function(renderFunc) {
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM todo", [], renderFunc, taskNameSpace.webdb.onTaskError);
	});
};

taskNameSpace.webdb.deleteTodo = function(id) {
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM todo WHERE ID=?", [id], taskNameSpace.webdb.onTaskSuccess, taskNameSpace.webdb.onTaskError);
	});
};
function loadTodoItems(tx, rs) {
	var rowOutput = "<tr><th>Task</th><th title='Time to complete once.'>Minutes</th><th>Action</th></tr>";
	var todoItems = document.getElementById("todoItems");
	for (var i = 0; i < rs.rows.length; i++) {
		rowOutput += renderTodo(rs.rows.item(i));
	}
	todoItems.innerHTML = rowOutput;
}

function renderTodo(row) {
	return "<tr> <td>" + row.todo + "</td><td>" + row.minutes + " </td><td><a href='javascript:void(0);'  onclick='taskNameSpace.webdb.deleteTodo(" + row.ID + ");'>Delete</a></td></tr>";
}

function initTasks() {
	taskNameSpace.webdb.open();
	taskNameSpace.webdb.createTaskTable();
	taskNameSpace.webdb.getAllTodoItems(loadTodoItems);
}

function addTodo() {
	var todo = document.getElementById("todo");
	var minutes = document.getElementById("minutes");
	taskNameSpace.webdb.addTodo(todo.value, minutes.value);
	//clear form values
	todo.value = "";
	minutes.value = "";
}

////////////////
function initTasksForEstimates() {
	taskNameSpace.webdb.open();
	taskNameSpace.webdb.createTaskTable();
	taskNameSpace.webdb.getAllTodoItemsForEstimates(loadTodoItemsForEstimates);

}

taskNameSpace.webdb.getAllTodoItemsForEstimates = function(renderFunc) {
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM todo", [], renderFunc, taskNameSpace.webdb.onTaskError);
	});
};
function loadTodoItemsForEstimates(tx, rs) {
	var rowOutput = "";
	var todoItems = document.getElementById("todoItemsForEstimates");
	for (var i = 0; i < rs.rows.length; i++) {
		rowOutput += renderTodoForEstimates(rs.rows.item(i));
	}

	todoItems.innerHTML = rowOutput;
}

function renderTodoForEstimates(row) {
	console.log("fn renderTodoForEstimates");

	return "<tr><td>" + row.todo + "</td><td>" + row.minutes + "&nbsp;min </td><td><a href='javascript:void(0);'  onclick='taskNameSpace.webdb.selectTodo(" + row.ID + ");'>Select</a></td></tr>";

}

taskNameSpace.webdb.selectTodo = function(id) {
	console.log("fn selectTodo" + id);
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM todo WHERE ID=?", [id], taskNameSpace.webdb.onTaskSelectSuccess, taskNameSpace.webdb.onTaskError);
	});

};

taskNameSpace.webdb.createTaskTableForEstimates = function() {
	console.log('fn createTaskTableForEstimates');
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS todoForEstimate(ID INTEGER PRIMARY KEY ASC, est_id INTEGER, todo TEXT UNIQUE ON CONFLICT REPLACE, minutes INTEGER, repititions INTEGER,totalMinutes INTEGER,totalCost FLOAT, added_on DATETIME)", []);
	});
};
taskNameSpace.webdb.onTaskSelectSuccess = function(tx, rs) {
	console.log("fn onTaskSelectSuccess");
	task = new Task(rs.rows.item(0).ID, rs.rows.item(0).todo, rs.rows.item(0).minutes, rs.rows.item(0).added_on);
	var est_id = sessionStorage.est_id;
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("INSERT INTO todoForEstimate(ID, est_id, todo , minutes , repititions, added_on ) VALUES (NULL,'" + est_id + "','" + task.todo + "','" + task.minutes + "', 1, '" + task.added_on + "');", [], taskNameSpace.webdb.onTaskInsertSuccess, taskNameSpace.webdb.onTaskError );
	});
	//refresh
	
	//startEstimation(sessionStorage.est_id);
};

////////////////////////////////

///-------------------------------------------
 
function initTasksForEstimateID() {
	console.log("fn initTasksForEstimateID");
	taskNameSpace.webdb.open();
	
	taskNameSpace.webdb.getAllTodoItemsForEstimateID(loadTodoItemsForEstimateID);//getAllTodoItemsForEstimateID(loadTodoItemsForEstimateID)

}
taskNameSpace.webdb.getAllTodoItemsForEstimateID = function(renderFunc) {
	console.log("fn getAllTodoItemsForEstimateID");
	var db = taskNameSpace.webdb.db;
	var est_id = sessionStorage.est_id;
	 
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM todoForEstimate WHERE est_id = "+est_id+"", [], renderFunc, taskNameSpace.webdb.onTaskError);
	});
};
 function loadTodoItemsForEstimateID(tx, rs) {
 	console.log("fn loadTodoItemsForEstimateID"); 
	var rowOutput = "<tr><th>Current Tasks</th><th title='Number of times this task will be performed.'>#</th><th>each</th><th>total</th><th>subtotal</th><th colspan=3>action</th></tr>";
	var todoItems = document.getElementById("todoItemsForCurrentEstimate");
	for (var i = 0; i < rs.rows.length; i++) {
		rowOutput += renderTodoForCurrentEstimate(rs.rows.item(i));
	}

	todoItems.innerHTML = rowOutput;
}

///-------------------------------------------//selectTask sessionStorage.est_id Available Tasks alert
/////>>>>>>>>>>>>>>>>>>
function renderTodoForCurrentEstimate(row) {
	var rpm = sessionStorage.rate_per_min;
	//alert(rpm);
	 console.log("fn renderTodoForCurrentEstimate");
	return "<tr><td>" + row.todo + "</td><td>" + row.repititions + "</td> <td>" + row.minutes + "&nbsp;min</td>"+    " <td><input type='text' id='data_minutes' class='data_minutes' name='data_minutes' value='" + row.minutes*row.repititions + "' />&nbsp;min </td>" +     "<td>$&nbsp;<input type='text' class='data_tasks' name='data_tasks' id ='data_tasks' value='" + Math.round(row.minutes*row.repititions*rpm*100)/100 + "'/></td>"
	+"<td><a href='javascript:void(0);'  class='plusMinus' onclick='taskNameSpace.webdb.increaseNumberOf(" + row.ID + "," + row.repititions + ");'>+</a></td>"
	+"<td><a href='javascript:void(0);' class='plusMinus'  onclick='taskNameSpace.webdb.decreaseNumberOf(" + row.ID + "," + row.repititions + ");'>-</a></td>"
	+"<td> <a href='javascript:void(0);'  onclick='taskNameSpace.webdb.deleteTaskForEstimateID(" + row.ID + ");' style='color:red;'>x</a></td>"
	+"</tr>";
}
taskNameSpace.webdb.increaseNumberOf = function(id, numberOf) {
	 console.log("fn increaseNumberOf");
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		var additionalTime = numberOf + 1;
		tx.executeSql("Update todoForEstimate SET repititions = ? WHERE ID=?", [additionalTime, id], taskNameSpace.webdb.changeNumberOfSuccess, taskNameSpace.webdb.onTaskError);
	});
};
taskNameSpace.webdb.decreaseNumberOf = function(id, numberOf) {
	 console.log("fn decreaseNumberOf");
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		var decreasedTime = numberOf - 1;
		tx.executeSql("Update todoForEstimate SET repititions = ? WHERE ID=?", [decreasedTime, id], taskNameSpace.webdb.changeNumberOfSuccess, taskNameSpace.webdb.onTaskError);
	});
};
taskNameSpace.webdb.changeNumberOfSuccess = function(tx, r) {
	console.log("fn changeNumberOfSuccess");
	taskNameSpace.webdb.getAllTodoItemsForEstimateID(loadTodoItemsForEstimateID);
};
taskNameSpace.webdb.deleteTaskForEstimateID = function(id) {
	console.log("fn deleteTaskForEstimateID");
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM todoForEstimate WHERE ID=?", [id], taskNameSpace.webdb.onTaskDeleteSuccess, taskNameSpace.webdb.onTaskError);
	});
};
taskNameSpace.webdb.onTaskDeleteSuccess = function(tx, r) {
	console.log("fn onTaskDeleteSuccess");
	//taskNameSpace.webdb.getAllTodoItems(loadTodoItems);
	startEstimation(sessionStorage.est_id);
};
taskNameSpace.webdb.onTaskInsertSuccess = function(tx, r) {
	//taskNameSpace.webdb.getAllTodoItems(loadTodoItems);
	console.log("fn onTaskInsertSuccess");
	startEstimation(sessionStorage.est_id);
};
/////>>>>>>>>>>>>>>>>>>
