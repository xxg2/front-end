jQuery.sap.require("sap.ui.splitapp.util.Controller");
jQuery.sap.require("sap.ui.splitapp.util.Formatter");

sap.ui.splitapp.util.Controller.extend("sap.ui.splitapp.view.SalesOrderItem", {
	onInit : function() {
		this.getView().setBusy(true);
		this.getRouter().attachRouteMatched(this.onRouteMatched, this);
	}, 
	
	onRouteMatched: function(oEvent) {
		if (oEvent.getParameter("name") !== "salesOrderItem") {
			return;
		}
		var oParameters = oEvent.getParameters();
		var sPath = "/" + oParameters.arguments.deliveryItems;
		this.bindView(sPath);
		this.getView().setBusy(false);
	}, 
	
	fireDetailChanged : function (sProductPath) {
		this.getEventBus().publish("Detail", "Changed", { sProductPath : sProductPath });
	},
	
	refresh : function (channelId, eventId, data) {
		if (data && data.sPath) {
			this.bindView(data.sPath);
		}
	},
	
	bindView : function (sProductPath) {
		var oView = this.getView();
		oView.bindElement(sProductPath);
	}
});