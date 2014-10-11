jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.declare("sap.ui.splitapp.MyRouter");

sap.ui.core.routing.Router.extend("sap.ui.splitapp.MyRouter", {
	constructor : function() {
		sap.ui.core.routing.Router.apply(this, arguments);
	},
	
	destroy : function() {
		sap.ui.core.routing.Router.prototype.destroy.apply(this, arguments);
	},

	_findSplitApp : function(oControl) {
		sAncestorControlName = "idAppControl";

		if (oControl instanceof sap.ui.core.mvc.View && oControl.byId(sAncestorControlName)) {
			return oControl.byId(sAncestorControlName);
		}

		return oControl.getParent() ? this._findSplitApp(oControl.getParent(), sAncestorControlName) : null;
	}

});