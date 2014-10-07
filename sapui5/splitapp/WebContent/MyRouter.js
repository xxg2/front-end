jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.declare("sap.ui.splitapp.MyRouter");

sap.ui.core.routing.Router.extend("sap.ui.splitapp.MyRouter", {
	constructor:function() {
		sap.ui.core.routing.Router.apply(this, arguments);
		this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this);
	}, 
	
	myNavBack:function(sRoute, mData) {
		
	}, 
	
	destory:function() {
		sap.ui.core.routing.Router.prototype.destory.apply(this);
		this._oRouteMatchedHandler.destroy();
	}, 
});