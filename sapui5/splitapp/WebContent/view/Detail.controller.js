jQuery.sap.require("sap.ui.splitapp.util.Controller");
jQuery.sap.require("sap.ui.splitapp.util.Formatter");

sap.ui.splitapp.util.Controller.extend("sap.ui.splitapp.view.Detail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Detail
*/
	onInit : function() {
		//this.getView().setBusy(true);
		//this.getEventBus().subscribe("Master", "InitialLoadFinished", this.onMasterLoaded, this);
		
		this.getRouter().attachRouteMatched(this.onRouteMatched, this);
	}, 
	
	onMasterLoaded :  function (sChannel, sEvent, oData) {
		this.bindView(oData.oListItem.getBindingContext().getPath());
		this.getView().setBusy(false);
	},
	
	onRouteMatched: function(oEvent) {
		if (oEvent.getParameter("name") !== "detail") {
			return;
		}
		var oParameters = oEvent.getParameters();
		var sPath = "/" + (oParameters.arguments.SalesOrder || oParameters.arguments.SalesOrderItem || oParameters.arguments.DeliverySchedule);
		this.bindView(sPath);
		this.getView().setBusy(false);
	}, 
	
	fireDetailChanged : function (sProductPath) {
		this.getEventBus().publish("Detail", "Changed", { sProductPath : sProductPath });
	},
	
	bindView : function (sProductPath) {
		var oView = this.getView();
		oView.bindElement(sProductPath);
		
		this.fireDetailChanged(sProductPath);
	}, 
	
	fireLineItemPress : function (evt) {
		var sPath = evt.oSource.getBindingContext().getPath();
		this.getRouter().navTo("schedulesItems", {
			SalesOrderItem: sPath.substr(1)
		}, false);
	}
});