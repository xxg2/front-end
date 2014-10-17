jQuery.sap.require("sap.ui.splitapp.util.Controller");
jQuery.sap.require("sap.ui.splitapp.util.Formatter");

sap.ui.splitapp.util.Controller.extend("sap.ui.splitapp.view.Detail", {
	onInit : function() {
		this.getView().setBusy(true);
		this.getRouter().attachRouteMatched(this.onRouteMatched, this);
	}, 
	
	onRouteMatched: function(oEvent) {
		if (oEvent.getParameter("name") !== "detail") {
			return;
		}
		var oParameters = oEvent.getParameters();
		var sPath = "/" + oParameters.arguments.order;
		
		var oIconTabBar = this.getView().byId("idIconTabBar");
		oIconTabBar.getItems().forEach(function(oItem) {
			
			if(oItem) {
				//oItem.bindElement(sPath+"/"+oItem.getKey());
			}
		});
		
		this.bindView(sPath);
		this.getView().setBusy(false);
	}, 
	
	bindView : function (sProductPath) {
		var oView = this.getView();
		oView.bindElement(sProductPath);
	}, 
	
	handleTabSelect : function (evt) {
		var key = evt.getParameter("key");
		var item = evt.getParameter("item");
		if (item.getContent().length === 0) {
			var view = new sap.ui.view({
				id : "tabView" + key,
				viewName : "sap.ui.demo.poa.view.Detail" + key,
				type : "XML"
			});
			item.addContent(view);
		}
	},
	
	fireLineItemPress : function (oEvent) {
		var sPath = oEvent.oSource.getBindingContext().getPath();
		this.getRouter().navTo("salesOrderItem", {
			deliveryItems: sPath.substr(1)
		}, true);
	}, 
	
	onDetailSelect : function(oEvent) {
		this.getRouter().navTo("detail",{
			order: oEvent.getSource().getBindingContext().getPath().substr(1), 
			tab: oEvent.getParameter("selectedKey")
		}, true);
	}
});