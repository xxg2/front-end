jQuery.sap.require("sap.ui.splitapp.util.Controller");
jQuery.sap.require("sap.ui.splitapp.util.Formatter");

sap.ui.splitapp.util.Controller.extend("sap.ui.splitapp.view.SchedulesItems", {
	onInit : function() {
		this.getView().setBusy(true);
		this.getRouter().attachRouteMatched(this.onRouteMatched, this);
	}, 
	
	onRouteMatched: function(oEvent) {
		if (oEvent.getParameter("name") !== "schedulesItems") {
			return;
		}
		var oParameters = oEvent.getParameters();
		var sPath = "/" + (oParameters.arguments.SalesOrder || oParameters.arguments.SalesOrderItem || oParameters.arguments.DeliverySchedule);
		this.bindView(sPath);
		this.getView().setBusy(false);
//		var oModel = this.getView().getModel();
//		var oContext = new sap.ui.model.Context(oModel, sPath);
//		this.getView().setBindingContext(oContext);
	}, 
	
	bindView : function (sProductPath) {
		var oView = this.getView();
		oView.bindElement(sProductPath);
	}
	
//	fireLineItemPress : function (evt) {
//		var sPath = evt.oSource.getBindingContext().getPath();
//		this.getRouter().navTo("deliveryItems", {
//			from: "detail",
//			SalesOrderItem: sPath.substr(1)+"/DeliveryScheduleItems"
//		}, true);
//	}
});