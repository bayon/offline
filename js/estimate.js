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
function deleteEstimate(){
	console.log('fn deleteEstimate');
	estimateNameSpace.webdb.deleteEstimate(sessionStorage.est_id);
}
function addEstimate() {
	console.log('fn addEstimate and delete previous estimate');
	// delete previous estimate
	deleteEstimate();
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
	console.log('delete estimate REALLY');
	//alert("ID:"+id);
	
	// TRY CALLING ORPHANS FROM HERE::::::::CLEARING ORPHANS IS NOT WORKING CORRECTLY    !!!!!!  ???????
	//try moving these orphan functions to the estimate NAMESPACE
	
	//estimateNameSpace.webdb.deleteAllMaterialsForEstimate(sessionStorage.est_id);
	//estimateNameSpace.webdb.deleteAllTasksForEstimate(sessionStorage.est_id);
	//estimateNameSpace.webdb.deleteEstimate(sessionStorage.est_id);
	//estimateNameSpace.webdb.deleteAllMaterialsForEstimate(sessionStorage.est_id);
	//estimateNameSpace.webdb.deleteAllTasksForEstimate(sessionStorage.est_id);
	
	
	var db = estimateNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM estimate WHERE ID = ?", [id], estimateNameSpace.webdb.onEstimateDeleteSuccess, estimateNameSpace.webdb.onEstimateError);
	});
	
	
};
estimateNameSpace.webdb.onEstimateDeleteSuccess = function(tx, r) {
	console.log('onEstimateDeleteSuccess ');
	//   C L E A R   U I             --------------AFTER ESTIMATE DELETION
	var estimate_details = document.getElementById('estimate_details');
	estimate_details.style.display = "none";
	//FAIL var materialItemsForCurrentEstimate = document.getElementById("materialItemsForCurrentEstimate");
	//materialItemsForCurrentEstimate.value="";
	//materialItemsForCurrentEstimate
	console.log('clear orphans ');
	//alert('clear orphans ');
	//
	//
	//
	//alert("DO WE HAVE EST ID:"+ sessionStorage.est_id);
	// CLEARING ORPHANS IS NOT WORKING CORRECTLY    !!!!!!  ???????
	//materialNameSpace.webdb.deleteAllMaterialsForEstimate(sessionStorage.est_id);
	//taskNameSpace.webdb.deleteAllTasksForEstimate(sessionStorage.est_id);
	
	//
	//
	//
	
	
	
	console.log('clear UI ');
	sessionStorage.est_id = 0;
	sessionStorage.rate_per_hour=0;
	sessionStorage.rate_per_min = 0;
	sessionStorage.estimate_name="";
	initMaterialsForEstimateID();
	initTasksForEstimateID();
	//sessionStorage.est_id = 0; alert
	// FAILED TO REMOVE ORPHANS HERE  re-render the data.
	estimateNameSpace.webdb.getAllEstimateItems(loadEstimateItems);
};

//-------------------------
estimateNameSpace.webdb.deleteAllTasksForEstimate = function(id) {
	console.log("fn EST deleteAllTasksForEstimate");
	var db = estimateNameSpace.webdb.db;
	db.transaction(function(tx) {
		//tx.executeSql("DELETE FROM todoForEstimate WHERE ID=?", [id], estimateNameSpace.webdb.onTaskDeleteSuccess, estimateNameSpace.webdb.onTaskError);
		//delete ALL 
			tx.executeSql("DELETE FROM todoForEstimate", [], estimateNameSpace.webdb.onTaskDeleteSuccess, estimateNameSpace.webdb.onTaskError);

	});
};
estimateNameSpace.webdb.onTaskDeleteSuccess = function(tx, r) {
	console.log("fn EST onTaskDeleteSuccess");
	//taskNameSpace.webdb.getAllTodoItems(loadTodoItems);
	//startEstimation(sessionStorage.est_id); finalize
};

estimateNameSpace.webdb.deleteAllMaterialsForEstimate = function(id) {
	console.log("fn EST deleteAllMaterialsForEstimate");
	//alert("meterial ID:"+id);
	var db = estimateNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM materialForEstimates", [], estimateNameSpace.webdb.onMaterialDeleteSuccess, estimateNameSpace.webdb.onMaterialError);
	});
};
estimateNameSpace.webdb.onMaterialDeleteSuccess = function(tx, r) {
	console.log("fn EST onMaterialDeleteSuccess");
	//taskNameSpace.webdb.getAllTodoItems(loadTodoItems);
	//startEstimation(sessionStorage.est_id);
};
//-----------------------










function initEstimate() {
	console.log(' initEstimate');
	estimateNameSpace.webdb.open();
	estimateNameSpace.webdb.createEstimateTable();//creates a table then no navigation.
	estimateNameSpace.webdb.getAllEstimateItems(loadEstimateItems);//querys estimates then navigates to loadEstimateItems()
	
	estimateNameSpace.webdb.deleteEstimate(sessionStorage.est_id);
	estimateNameSpace.webdb.deleteAllMaterialsForEstimate(sessionStorage.est_id);
	estimateNameSpace.webdb.deleteAllTasksForEstimate(sessionStorage.est_id);
	
	//final calculations display
	var totalCost = document.getElementById('totalCost');
		if(sessionStorage.totalCost > 0){
			totalCost.value=sessionStorage.totalCost;
		}else{
			totalCost.value=0;
		}
		

}

estimateNameSpace.webdb.getAllEstimateItems = function(renderFunc) {
	var db = estimateNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM estimate", [], renderFunc, estimateNameSpace.webdb.onEstimateError);
	});
};

function loadEstimateItems(tx, rs) {
	//loops through query results , builds ui in render function and returns ui html to main view.
	var rowOutput = "<tr><th colspan=3>Estimate</th></tr>";
	var estimateItems = document.getElementById("estimateItems");
	for (var i = 0; i < rs.rows.length; i++) {
		rowOutput += renderEstimate(rs.rows.item(i));
	}
//the rowOutput contains the "details" and "delete" calls for the estimate.
	estimateItems.innerHTML = rowOutput;
	
}

function renderEstimate(row) {
	return "<tr><td>" + row.estimate + "</td><td style='width:15%;'><a href='javascript:void(0);'  onclick='estimateNameSpace.webdb.selectEstimate(" + row.ID + ");'>Details</a></td><td style='width:15%;'><a href='javascript:void(0);'  onclick='estimateNameSpace.webdb.deleteEstimate(" + row.ID + ");'>Delete</a></td></tr>";
}



estimateNameSpace.webdb.selectEstimate = function(id) {
	console.log('fn selectEstimate');
	//clear summary
	var summaryView = document.getElementById('summaryDiv');
	summaryView.style.display = "none";
	
	$( "#taskCost" ).text( "0");
	$( "#materialCost" ).text("0" );
	$( "#totalCost" ).text( "0");
	// clear old estimate data here.
	console.log('clear UI ');
	sessionStorage.est_id = 0;
	sessionStorage.rate_per_hour=0;
	sessionStorage.rate_per_min = 0;
	sessionStorage.estimate_name="";
	//clear total
	sessionStorage.totalCost=0;
	sessionStorage.totalMaterial=0;
	sessionStorage.totalTask=0;
	sessionStorage.totalMinutes=0;
	//set new estimate session variables(est_id,estimate_name,rate_per_our IN RENDER METHOD
	var estimateControlHeader = document.getElementById('estimateControlHeader');
	estimateControlHeader.style.display="none";
	
	var estimate_details = document.getElementById('estimate_details');
	estimate_details.style.display = "block";
	var db = estimateNameSpace.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM estimate WHERE ID=?", [id], estimateNameSpace.webdb.onEstimateSelectSuccess, estimateNameSpace.webdb.onEstimateError);
	});
};

estimateNameSpace.webdb.onEstimateSelectSuccess = function(tx, r) {

	var rowOutput = "";
	var estimateItems = document.getElementById("selectedEstimateItem");
	for (var i = 0; i < r.rows.length; i++) {
		rowOutput += renderSelectedEstimate(r.rows.item(i));
	}
	estimateItems.innerHTML = rowOutput;
};

function renderSelectedEstimate(row) {
	sessionStorage.est_id=row.ID;
	sessionStorage.estimate_name=row.estimate;
	sessionStorage.rate_per_hour=row.hrRate;
	sessionStorage.rate_per_min=row.rate_per_minute;
	
	$( "#estimateName" ).text( row.estimate );//for summary display
	return "<tr><td style='font-weight:bold;'>" + row.estimate + "</td><td>$"+row.hrRate+"p/hr</td><td>$"+row.rate_per_minute+"p/min</td><td>" + " <input type='hidden' id='selectedEstimate' value='" + row.ID + "'/>  " + "<button onclick='startEstimation(" + row.ID + ");' >open</button></td></tr>";
}

function startEstimation(id) {
	 
	// SET CURRENT ESTIMATE ID
	sessionStorage.est_id = id;
	taskNameSpace.webdb.open();
	
	taskNameSpace.webdb.createTaskTableForEstimates();
	refreshEstimation(id);
	
	//INIT "AVAILABLE" TASKS AND MATERIALS
	initTasksForEstimates();
	initMaterialsForEstimates();

	//INIT "CURRENT" ESTIMATE's TASKS AND MATERIALS
	initTasksForEstimateID();
	initMaterialsForEstimateID();
	
}
function refreshEstimation(id){
	//INIT ALL AVAILABLE TASKS AND MATERIALS
	initTasksForEstimates();
	initMaterialsForEstimates();

	//INIT CURRENT ESTIMATE TASKS AND MATERIALS
	initTasksForEstimateID();
	initMaterialsForEstimateID();
}

function openNewEstimateForm(){
		var newEstimateForm = document.getElementById('newEstimateForm');
		newEstimateForm.style.display="block";
		
		var summaryDiv = document.getElementById('summaryDiv');
		summaryDiv.style.display="none";
		
		estimateNameSpace.webdb.deleteEstimate(sessionStorage.est_id);
	}
	