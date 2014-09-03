var estimateNameSpace = {};
estimateNameSpace.webdb = {};
estimateNameSpace.webdb.db = null;

estimateNameSpace.webdb.open = function() {
	var dbSize = 5 * 1024 * 1024;
	// 5MB
	estimateNameSpace.webdb.db = openDatabase("Todo", "1.0", "Todo manager", dbSize);
}

estimateNameSpace.webdb.createEstimateTable = function() {
	var db = estimateNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS estimate(ID INTEGER PRIMARY KEY ASC, estimate TEXT, added_on DATETIME)", []);
	});
}

estimateNameSpace.webdb.addEstimate = function(estimateText) {
	var db = estimateNameSpace.webdb.db;
	db.transaction(function(tx) {
		var addedOn = new Date();
		tx.executeSql("INSERT INTO estimate(estimate, added_on) VALUES (?,?)", [estimateText, addedOn], estimateNameSpace.webdb.onEstimateSuccess, estimateNameSpace.webdb.onEstimateError);
	});
}

estimateNameSpace.webdb.onEstimateError = function(tx, e) {
	alert("There has been an error: " + e.message);
}

estimateNameSpace.webdb.onEstimateSuccess = function(tx, r) {
	// re-render the data.
	estimateNameSpace.webdb.getAllEstimateItems(loadEstimateItems);
}


estimateNameSpace.webdb.deleteEstimate = function(id) {
	var db = estimateNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM estimate WHERE ID=?", [id], estimateNameSpace.webdb.onEstimateSuccess, estimateNameSpace.webdb.onEstimateError);
	});
}
function initEstimate() {
	estimateNameSpace.webdb.open();
	estimateNameSpace.webdb.createEstimateTable();
	estimateNameSpace.webdb.getAllEstimateItems(loadEstimateItems);
	//other tables
	initTasksForEstimate();
	initMaterials();
}
estimateNameSpace.webdb.getAllEstimateItems = function(renderFunc) {
	var db = estimateNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM estimate", [], renderFunc, estimateNameSpace.webdb.onEstimateError);
	});
}

function loadEstimateItems(tx, rs) {
	var rowOutput = "";
	var estimateItems = document.getElementById("estimateItems");
	for (var i = 0; i < rs.rows.length; i++) {
		rowOutput += renderEstimate(rs.rows.item(i));
	}

	estimateItems.innerHTML = rowOutput;
}

function renderEstimate(row) {
	return "<li>" + row.estimate + " [<a href='javascript:void(0);'  onclick='estimateNameSpace.webdb.deleteEstimate(" + row.ID + ");'>Delete</a>]</li>";
}



function addEstimate() {
	var estimate = document.getElementById("estimate");
	estimateNameSpace.webdb.addEstimate(estimate.value);
	estimate.value = "";
}



	

	

