jQuery.sap.require("sap.ui.splitapp.util.Controller");

sap.ui.splitapp.util.Controller.extend("sap.ui.splitapp.view.Master", {
	onInit : function() {
		this.oInitialLoadFinishedDeferred = jQuery.Deferred();
		
		this.getView().byId("list").attachEventOnce("updateFinished", function() {
			this.oInitialLoadFinishedDeferred.resolve();
			//oEventBus.publish("Master", "InitialLoadFinished", { oListItem : this.getView().byId("list").getItems()[0] });
		}, this);
	},
});