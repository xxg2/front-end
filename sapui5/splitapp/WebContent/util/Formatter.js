jQuery.sap.declare("sap.ui.splitapp.util.Formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");

sap.ui.splitapp.util.Formatter = {
	sdDocValue : function(value) {
		return "SO " + value;
	},

	netValueQty: function(value1, value2) {
		return parseFloat(value1*value2).toFixed(2);
	},
	
	countValue: function(value) {
		return parseInt(value);
	}, 
	
	currenyValueQty: function(value) {
		return parseFloat(value).toFixed(2);
	},
	
	uppercaseFirstChar : function(sStr) {
		return sStr.charAt(0).toUpperCase() + sStr.slice(1);
	}, 
	
	statusDocValue: function(value) {
		var str = "";
		if(value == "A") {
			str = "Open";
		} else if(value == "B") {
			str = "In Progress";
		} else {
			str = "Completed";
		}
		return str;
	}
};