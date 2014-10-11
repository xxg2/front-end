jQuery.sap.declare("sap.ui.splitapp.util.Formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");

sap.ui.splitapp.util.Formatter = {
	sdDocValue : function(value) {
		return "SO " + value;
	},

	netValueQty: function(value1, value2) {
		return value1*value2;
	},
};