jQuery.sap.require("sap.ui.splitapp.util.Formatter");
jQuery.sap.require("sap.ui.splitapp.util.Controller");

sap.ui.splitapp.util.Controller.extend("sap.ui.splitapp.view.Master", {
	onInit : function() {
		this.getView().byId("list").attachEventOnce("updateFinished", function() {
				this.onRouteMatched();
		}, this);
	},
	
	onRouteMatched : function() {
		var list = this.getView().byId("list");
		list.setSelectedItem(list.getItems()[0], true);
		this.showDetail(list.getItems()[0]);
	}, 
	
	onSelect : function(oEvent) {
		this.showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
	},
	
	showDetail : function(oItem) {
		this.getRouter().navTo("detail", {
			order: oItem.getBindingContext().getPath().substr(1)
		}, true);
	}, 
	
	onDetailTabChanged : function (sChanel, sEvent, oData) {
		this.sTab = oData.sTabKey;
	},
});