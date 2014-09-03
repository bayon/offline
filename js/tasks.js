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
	// re-render the data.
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
function initTasksForEstimate() {
	taskNameSpace.webdb.open();
	taskNameSpace.webdb.createTaskTable();
	taskNameSpace.webdb.getAllTodoItemsForEstimate(loadTodoItemsForEstimate);
	
}
taskNameSpace.webdb.getAllTodoItemsForEstimate = function(renderFunc) {
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM todo", [], renderFunc, taskNameSpace.webdb.onTaskError);
	});
};
function loadTodoItemsForEstimate(tx, rs) {
	var rowOutput = "";
	var todoItems = document.getElementById("todoItemsForEstimate");
	for (var i = 0; i < rs.rows.length; i++) {
		rowOutput += renderTodoForEstimate(rs.rows.item(i));
	}

	todoItems.innerHTML = rowOutput;
}
function renderTodoForEstimate(row) {
	console.log("fn renderTodoForEstimate");
	 // instantiate new task obj here and pass it as param.
	 var task = new Task(row.ID, row.todo, row.minutes,row.added_on);
	 //alert(row.ID +"---"+row.todo +"---"+row.minutes +"---"+row.added_on +"---");
	 var array = new Array('one','two','three');
	// task.reveal();
	return "<li>" + row.todo + ":" + row.minutes + " [<a href='javascript:void(0);'  onclick='taskNameSpace.webdb.selectTodo(" + row.ID + ");'>Select</a>]</li>";

}
taskNameSpace.webdb.selectTodo = function(id) {
	console.log("fn selectTodo"+id);
	
	//task.reveal();
	
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM todo WHERE ID=?", [id], taskNameSpace.webdb.onTaskSelectSuccess, taskNameSpace.webdb.onTaskError);
	});
	
};

taskNameSpace.webdb.createTaskTableForEstimate = function() {
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS todoForEstimate(ID INTEGER PRIMARY KEY ASC, todo TEXT, minutes INTEGER, repititions INTEGER,totalMinutes INTEGER,totalCost FLOAT, added_on DATETIME)", []);
	});
};
taskNameSpace.webdb.onTaskSelectSuccess = function(tx, rs) {
	// re-render the data.
	console.log("fn onTaskSelectSuccess");
	//taskNameSpace.webdb.getAllTodoItems(loadTodoItems);
	console.log(  rs.rows.item(0));
	console.log(  rs.rows.item(0).todo);
	task = new Task(rs.rows.item(0).ID,rs.rows.item(0).todo,rs.rows.item(0).minutes,rs.rows.item(0).added_on);
	var db = taskNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("INSERT INTO todoForEstimate(ID, todo , minutes , added_on ) VALUES (NULL,'"+task.todo+"','"+task.minutes+"','"+task.added_on+"');", []);
	});
};


////////////////////////////////