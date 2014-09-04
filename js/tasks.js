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
		tx.executeSql("CREATE TABLE IF NOT EXISTS todo(ID INTEGER PRIMARY KEY ASC, todo TEXT, minutes INTEGER, added_on DATETIME)", []);
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
	var rowOutput = "";
	var todoItems = document.getElementById("todoItems");
	for (var i = 0; i < rs.rows.length; i++) {
		rowOutput += renderTodo(rs.rows.item(i));
	}
	todoItems.innerHTML = rowOutput;
}

function renderTodo(row) {
	return "<li>" + row.todo + ":" + row.minutes + " [<a href='javascript:void(0);'  onclick='taskNameSpace.webdb.deleteTodo(" + row.ID + ");'>Delete</a>]</li>";
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

	return "<li>" + row.todo + ":" + row.minutes + " [<a href='javascript:void(0);'  onclick='taskNameSpace.webdb.selectTodo(" + row.ID + ");'>Select</a>]</li>";

}

taskNameSpace.webdb.selectTodo = function(id) {
	console.log("fn selectTodo" + id);
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM todo WHERE ID=?", [id], taskNameSpace.webdb.onTaskSelectSuccess, taskNameSpace.webdb.onTaskError);
	});

};

taskNameSpace.webdb.createTaskTableForEstimates = function() {
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS todoForEstimate(ID INTEGER PRIMARY KEY ASC, est_id INTEGER, todo TEXT, minutes INTEGER, repititions INTEGER,totalMinutes INTEGER,totalCost FLOAT, added_on DATETIME)", []);
	});
};
taskNameSpace.webdb.onTaskSelectSuccess = function(tx, rs) {
	console.log("fn onTaskSelectSuccess");
	console.log(rs.rows.item(0));
	console.log(rs.rows.item(0).todo);
	task = new Task(rs.rows.item(0).ID, rs.rows.item(0).todo, rs.rows.item(0).minutes, rs.rows.item(0).added_on);
	var est_id = sessionStorage.est_id;
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("INSERT INTO todoForEstimate(ID, est_id, todo , minutes , added_on ) VALUES (NULL,'" + est_id + "','" + task.todo + "','" + task.minutes + "','" + task.added_on + "');", []);
	});
};

////////////////////////////////