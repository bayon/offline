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
function addEstimate() {
	console.log('fn addEstimate');
	var estimate = document.getElementById("estimate");
	sessionStorage.estimate_name = estimate.value;
	var hrRate = document.getElementById("hrRate");
	var rate_per_hour = parseFloat(hrRate.value);
	sessionStorage.rate_per_hour = rate_per_hour;
	var rate_per_minute = (rate_per_hour/60).toFixed(2);
	sessionStorage.rate_per_min = rate_per_minute;
	
	estimateNameSpace.webdb.addEstimate(estimate.value,rate_per_hour,rate_per_minute);
	//CLEAR THESE ,we only added an estimate we did NOT select it yet.
	estimate.value = "";
	hrRate.value = "";
	sessionStorage.estimate_name ="";
	sessionStorage.rate_per_hour =0;
	sessionStorage.rate_per_min=0;
}
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
	
	//   C L E A R   U I             --------------AFTER ESTIMATE DELETION
	var estimate_details = document.getElementById('estimate_details');
	estimate_details.style.display = "none";
	//FAIL var materialItemsForCurrentEstimate = document.getElementById("materialItemsForCurrentEstimate");
	//materialItemsForCurrentEstimate.value="";
	//materialItemsForCurrentEstimate
	console.log('clear orphans ');
	materialNameSpace.webdb.deleteMaterialForEstimateID(sessionStorage.est_id);
	taskNameSpace.webdb.deleteTaskForEstimateID(sessionStorage.est_id);
	console.log('clear UI ');
	sessionStorage.est_id = 0;
	sessionStorage.rate_per_hour=0;
	sessionStorage.rate_per_min = 0;
	sessionStorage.estimate_name="";
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
	return "<tr><td>" + row.estimate + "</td><td style='width:15%;'><a href='javascript:void(0);'  onclick='estimateNameSpace.webdb.selectEstimate(" + row.ID + ");'>Select</a></td><td style='width:15%;'><a href='javascript:void(0);'  onclick='estimateNameSpace.webdb.deleteEstimate(" + row.ID + ");'>Delete</a></td></tr>";
}



estimateNameSpace.webdb.selectEstimate = function(id) {
	console.log('fn selectEstimate');
	
	
	
	
	var estimate_details = document.getElementById('estimate_details');
	estimate_details.style.display = "block";
	var db = estimateNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM estimate WHERE ID=?", [id], estimateNameSpace.webdb.onEstimateSelectSuccess, estimateNameSpace.webdb.onEstimateError);
	});
};

estimateNameSpace.webdb.onEstimateSelectSuccess = function(tx, r) {
	
//try and set the rate boxes here Math.round

	var rowOutput = "";
	var estimateItems = document.getElementById("selectedEstimateItem");
	for (var i = 0; i < r.rows.length; i++) {
		rowOutput += renderSelectedEstimate(r.rows.item(i));
	}
	estimateItems.innerHTML = rowOutput;
};

function renderSelectedEstimate(row) {
	sessionStorage.rate_per_min=row.rate_per_minute;
	return "<tr><td style='font-weight:bold;'>" + row.estimate + "</td><td>$"+row.hrRate+"p/hr</td><td>$"+row.rate_per_minute+"p/min</td><td>" + " <input type='hidden' id='selectedEstimate' value='" + row.ID + "'/>  " + "<button onclick='startEstimation(" + row.ID + ");' >start</button></td></tr>";
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
	
	//document.getElementById('ratePerHour').value = sessionStorage.rate_per_hour;
	//document.getElementById('ratePerMin').value = sessionStorage.rate_per_min;

}

