var estimateNameSpace = {};
estimateNameSpace.webdb = {};
estimateNameSpace.webdb.db = null;

estimateNameSpace.webdb.open = function() {
	var dbSize = 5 * 1024 * 1024;
	// 5MB
	estimateNameSpace.webdb.db = openDatabase("Todo", "1.0", "Todo manager", dbSize);
};

estimateNameSpace.webdb.createEstimateTable = function() {
	var db = estimateNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS estimate(ID INTEGER PRIMARY KEY ASC, estimate TEXT  UNIQUE ON CONFLICT REPLACE,hrRate FLOAT,rate_per_minute FLOAT, added_on DATETIME)", []);
	});
};

estimateNameSpace.webdb.addEstimate = function(estimateText,hrRate,rate_per_minute) {
	console.log('fn addEstimate');
	var db = estimateNameSpace.webdb.db;
	 
	 
	 
	db.transaction(function(tx) {
		var addedOn = new Date();
		tx.executeSql("INSERT INTO estimate(estimate, hrRate,rate_per_minute, added_on) VALUES (?,?,?,?)", [estimateText,hrRate,rate_per_minute, addedOn], estimateNameSpace.webdb.onEstimateSuccess, estimateNameSpace.webdb.onEstimateError);
	});
};

estimateNameSpace.webdb.onEstimateError = function(tx, e) {
	alert("There has been an error: " + e.message);
};

estimateNameSpace.webdb.onEstimateSuccess = function(tx, r) {
	// re-render the data.
	estimateNameSpace.webdb.getAllEstimateItems(loadEstimateItems);
};

estimateNameSpace.webdb.deleteEstimate = function(id) {
	console.log('delete estimate');
	var db = estimateNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM estimate WHERE ID=?", [id], estimateNameSpace.webdb.onEstimateDeleteSuccess, estimateNameSpace.webdb.onEstimateError);
	});
	
	
};
estimateNameSpace.webdb.onEstimateDeleteSuccess = function(tx, r) {
	
	//CLEAR UI AFTER ESTIMATE DELETION
	//FAIL var materialItemsForCurrentEstimate = document.getElementById("materialItemsForCurrentEstimate");
	//materialItemsForCurrentEstimate.value="";
	//materialItemsForCurrentEstimate
	console.log('clear orphans ');
	materialNameSpace.webdb.deleteMaterialForEstimateID(sessionStorage.est_id);
	taskNameSpace.webdb.deleteTaskForEstimateID(sessionStorage.est_id);
	console.log('clear UI ');
	sessionStorage.est_id = 0;
	initMaterialsForEstimateID();
	initTasksForEstimateID();
	//sessionStorage.est_id = 0;
	// FAILED TO REMOVE ORPHANS HERE  re-render the data.
	estimateNameSpace.webdb.getAllEstimateItems(loadEstimateItems);
};

function initEstimate() {
	estimateNameSpace.webdb.open();
	estimateNameSpace.webdb.createEstimateTable();
	estimateNameSpace.webdb.getAllEstimateItems(loadEstimateItems);

}

estimateNameSpace.webdb.getAllEstimateItems = function(renderFunc) {
	var db = estimateNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM estimate", [], renderFunc, estimateNameSpace.webdb.onEstimateError);
	});
};

function loadEstimateItems(tx, rs) {
	var rowOutput = "";
	var estimateItems = document.getElementById("estimateItems");
	for (var i = 0; i < rs.rows.length; i++) {
		rowOutput += renderEstimate(rs.rows.item(i));
	}

	estimateItems.innerHTML = rowOutput;
}

function renderEstimate(row) {
	return "<li>" + row.estimate + " [<a href='javascript:void(0);'  onclick='estimateNameSpace.webdb.selectEstimate(" + row.ID + ");'>Select</a>][<a href='javascript:void(0);'  onclick='estimateNameSpace.webdb.deleteEstimate(" + row.ID + ");'>Delete</a>]</li>";
}

function addEstimate() {
	console.log('fn addEstimate');
	var estimate = document.getElementById("estimate");
	var hrRate = document.getElementById("hrRate");
	 
	 
	var rate_per_hour = parseFloat(hrRate.value);
	sessionStorage.rate_per_hour = rate_per_hour;
	//alert(rate_per_hour);
	var rate_per_minute = (rate_per_hour/60).toFixed(2);
	
	//alert(rate_per_minute);
	sessionStorage.rate_per_min = rate_per_minute;
	estimateNameSpace.webdb.addEstimate(estimate.value,rate_per_hour,rate_per_minute);
	estimate.value = "";
	hrRate.value = "";
	
}

estimateNameSpace.webdb.selectEstimate = function(id) {
	console.log('fn addEstimate');
	var db = estimateNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM estimate WHERE ID=?", [id], estimateNameSpace.webdb.onEstimateSelectSuccess, estimateNameSpace.webdb.onEstimateError);
	});
};

estimateNameSpace.webdb.onEstimateSelectSuccess = function(tx, r) {
	// re-render the data.
	var rowOutput = "";
	var estimateItems = document.getElementById("selectedEstimateItem");
	for (var i = 0; i < r.rows.length; i++) {
		rowOutput += renderSelectedEstimate(r.rows.item(i));
	}
	estimateItems.innerHTML = rowOutput;
};

function renderSelectedEstimate(row) {
	return "<li style='font-weight:bold;'>" + row.estimate + "</li>" + " <input type='hidden' id='selectedEstimate' value='" + row.ID + "'/>  " + "<button onclick='startEstimation(" + row.ID + ");' >start estimation</button>";
}

function startEstimation(id) {
	//sleep(1000);// let any db changes catch up
	// L E F T   O F F  H E R E  
	// SET CURRENT ESTIMATE ID
	sessionStorage.est_id = id;
	taskNameSpace.webdb.open();
	taskNameSpace.webdb.createTaskTableForEstimates();
	
	//INIT ALL AVAILABLE TASKS AND MATERIALS
	initTasksForEstimates();
	initMaterialsForEstimates();

	//INIT CURRENT ESTIMATE TASKS AND MATERIALS
	initTasksForEstimateID();
	initMaterialsForEstimateID();
	
	document.getElementById('ratePerHour').value = sessionStorage.rate_per_hour;
	document.getElementById('ratePerMin').value = sessionStorage.rate_per_min;

}

