var materialNameSpace = {};
materialNameSpace.webdb = {};
materialNameSpace.webdb.db = null;

materialNameSpace.webdb.open = function() {
	var dbSize = 5 * 1024 * 1024;
	// 5MB
	materialNameSpace.webdb.db = openDatabase("Todo", "1.0", "Todo manager", dbSize);
}

materialNameSpace.webdb.createMaterialsTable = function() {
	var db = materialNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS material(ID INTEGER PRIMARY KEY ASC, material TEXT, cost FLOAT, added_on DATETIME)", []);
	});
}

materialNameSpace.webdb.addMaterial = function(materialText, materialCostText) {
	var db = materialNameSpace.webdb.db;
	db.transaction(function(tx) {
		var addedOn = new Date();
		var cost = parseFloat(materialCostText);
		tx.executeSql("INSERT INTO material(material, cost, added_on) VALUES (?, ?, ?)", [materialText, cost, addedOn], materialNameSpace.webdb.onMaterialsSuccess, materialNameSpace.webdb.onMaterialsError);
	});
}

materialNameSpace.webdb.onMaterialsError = function(tx, e) {
	alert("There has been an error: " + e.message);
}

materialNameSpace.webdb.onMaterialsSuccess = function(tx, r) {
	// re-render the data.
	materialNameSpace.webdb.getAllMaterialItems(loadMaterialItems);
}

materialNameSpace.webdb.getAllMaterialItems = function(renderFunc) {
	var db = materialNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM material", [], renderFunc, materialNameSpace.webdb.onMaterialsError);
	});
}

materialNameSpace.webdb.deleteMaterial = function(id) {
	var db = materialNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM material WHERE ID=?", [id], materialNameSpace.webdb.onMaterialsSuccess, materialNameSpace.webdb.onMaterialsError);
	});
}
function loadMaterialItems(tx, rs) {
	var rowOutput = "";
	var materialItems = document.getElementById("materialItems");
	for (var i = 0; i < rs.rows.length; i++) {
		rowOutput += renderMaterial(rs.rows.item(i));
	}

	materialItems.innerHTML = rowOutput;
}

function renderMaterial(row) {
	return "<li>" + row.material + ":" + row.cost + " [<a href='javascript:void(0);'  onclick='materialNameSpace.webdb.deleteMaterial(" + row.ID + ");'>Delete</a>]</li>";
}

function initMaterials() {
	materialNameSpace.webdb.open();
	materialNameSpace.webdb.createMaterialsTable();
	materialNameSpace.webdb.getAllMaterialItems(loadMaterialItems);
}

function addMaterial() {
	var material = document.getElementById("material");
	var material_cost = document.getElementById("material_cost");
	materialNameSpace.webdb.addMaterial(material.value, material_cost.value);
	material.value = "";
	material_cost.value = "";
}