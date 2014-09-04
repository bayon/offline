var materialNameSpace = {};
materialNameSpace.webdb = {};
materialNameSpace.webdb.db = null;

materialNameSpace.webdb.open = function() {
	var dbSize = 5 * 1024 * 1024;
	// 5MB
	materialNameSpace.webdb.db = openDatabase("Todo", "1.0", "Todo manager", dbSize);
};

materialNameSpace.webdb.createMaterialsTable = function() {
	var db = materialNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS material(ID INTEGER PRIMARY KEY ASC, material TEXT, cost FLOAT, added_on DATETIME)", []);
	});
};

materialNameSpace.webdb.addMaterial = function(materialText, materialCostText) {
	var db = materialNameSpace.webdb.db;
	db.transaction(function(tx) {
		var addedOn = new Date();
		var cost = parseFloat(materialCostText);
		tx.executeSql("INSERT INTO material(material, cost, added_on) VALUES (?, ?, ?)", [materialText, cost, addedOn], materialNameSpace.webdb.onMaterialsSuccess, materialNameSpace.webdb.onMaterialsError);
	});
};

materialNameSpace.webdb.onMaterialsError = function(tx, e) {
	alert("There has been an error: " + e.message);
};

materialNameSpace.webdb.onMaterialsSuccess = function(tx, r) {
	
	materialNameSpace.webdb.getAllMaterialItems(loadMaterialItems);
};

materialNameSpace.webdb.getAllMaterialItems = function(renderFunc) {
	var db = materialNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM material", [], renderFunc, materialNameSpace.webdb.onMaterialsError);
	});
};

materialNameSpace.webdb.deleteMaterial = function(id) {
	var db = materialNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM material WHERE ID=?", [id], materialNameSpace.webdb.onMaterialsSuccess, materialNameSpace.webdb.onMaterialsError);
	});
};
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
////////////////
function initMaterialsForEstimates() {
	console.log('fn initMaterialsForEstimates');
	materialNameSpace.webdb.open();
	materialNameSpace.webdb.createMaterialTableForEstimates();
	materialNameSpace.webdb.getAllMaterialItemsForEstimates(loadMaterialItemsForEstimates);
	
}
materialNameSpace.webdb.getAllMaterialItemsForEstimates = function(renderFunc) {
	console.log('fn getAllMaterialItemsForEstimates');
	var db = materialNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM material", [], renderFunc, materialNameSpace.webdb.onMaterialError);
	});
};
function loadMaterialItemsForEstimates(tx, rs) {
	console.log('fn loadMaterialItemsForEstimates');
	var rowOutput = "";
	var materialItems = document.getElementById("materialItemsForEstimates");
	for (var i = 0; i < rs.rows.length; i++) {
		rowOutput += renderMaterialForEstimates(rs.rows.item(i));
	}

	materialItems.innerHTML = rowOutput;
}
function renderMaterialForEstimates(row) {
	console.log('fn renderMaterialForEstimates');
	return "<li>" + row.material + ":" + row.cost + " [<a href='javascript:void(0);'  onclick='materialNameSpace.webdb.selectMaterial(" + row.ID + ");'>Select</a>]</li>";
}
materialNameSpace.webdb.selectMaterial = function(id) {
	console.log('fn selectMaterial');
	var db = materialNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM material WHERE ID=?", [id], materialNameSpace.webdb.onMaterialSelectSuccess, materialNameSpace.webdb.onMaterialError);
	});
};

materialNameSpace.webdb.createMaterialTableForEstimates = function() {
	console.log('fn createMaterialTableForEstimates');
	var db = materialNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS materialForEstimates(ID INTEGER PRIMARY KEY ASC, est_id INTEGER, material TEXT, cost INTEGER, added_on DATETIME)", []);
	});
};
materialNameSpace.webdb.onMaterialSelectSuccess = function(tx, rs) {
	console.log("fn onMaterialSelectSuccess");
	material = new Material(rs.rows.item(0).ID,rs.rows.item(0).material,rs.rows.item(0).cost,rs.rows.item(0).added_on);
	var db = materialNameSpace.webdb.db;
	var est_id = sessionStorage.est_id;
	db.transaction(function(tx) {
		tx.executeSql("INSERT INTO materialForEstimates(ID, est_id, material , cost , added_on ) VALUES (NULL,'"+est_id+"','"+material.material+"','"+material.cost+"','"+material.added_on+"');", []);
	});
};

////////////////////////////////