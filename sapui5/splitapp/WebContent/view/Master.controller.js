jQuery.sap.require("sap.ui.splitapp.util.Formatter");
jQuery.sap.require("sap.ui.splitapp.util.Controller");

sap.ui.splitapp.util.Controller.extend("sap.ui.splitapp.view.Master", {
	onInit : function() {
		//this.getView().byId("list").attachEventOnce("updateFinished", function() {
			//this.getEventBus().publish("Master", "InitialLoadFinished", { oListItem : this.getView().byId("list").getItems()[0] });
		sap.ui.getCore().getEventBus().subscribe("app", "InitialLoadFinished", function(){
				this.onRouteMatched(this.getView().byId("list").getItems()[0]);
			}, this);
		//}, this);
		//this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);
		
		this.getEventBus().subscribe("Detail", "Changed", this.onDetailChanged, this);
	},
	
	onRouteMatched : function(oItem) {
		var list = this.getView().byId("list");
		list.setSelectedItem(oItem, true);
		this.showDetail(oItem);
//		var oSplitApp = this.getRouter()._findSplitApp(this.getView());
//
//		// Load view, add it to the page aggregation, and navigate to it
//		var oView = this.getRouter().getView("sap.ui.splitapp.view.Detail", "XML");
//		oSplitApp.addPage(oView, false);
//		oSplitApp.to(oView.getId());
	}, 
	
	onDetailChanged : function (sChanel, sEvent, oData) {
		var sProductPath = oData.sProductPath;
		var oList = this.getView().byId("list");

		var aItems = oList.getItems();

		for (var i = 0; i < aItems.length; i++) {
			if (aItems[i].getBindingContext().getPath() === sProductPath) {
				oList.setSelectedItem(aItems[i], true);
				break;
			}
		}
	},
	
	onSelect : function(oEvent) {
		this.showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
	},
	
	showDetail : function(oItem) {
		this.getRouter().navTo("detail", {
			SalesOrder: oItem.getBindingContext().getPath().substr(1)
		}, true);
	}
});