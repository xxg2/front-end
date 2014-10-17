jQuery.sap.declare("sap.ui.splitapp.Component");
jQuery.sap.require("sap.ui.splitapp.MyRouter");

sap.ui.core.UIComponent.extend("sap.ui.splitapp.Component", {
	metadata : {
		name : "Split App",
		version : "1.0",

		rootView : "sap.ui.splitapp.view.App",

		config : {
			serviceConfig : {
				name : "Northwind",
				serviceUrl : "proxy/https/ldai1ket.wdf.sap.corp:44313/sap/opu/odata/sap/ZPOC_TEST_SRV/"
			}
		},
		routing : {
			config : {
				routerClass : sap.ui.splitapp.MyRouter,
				viewType : "XML",
				viewPath : "sap.ui.splitapp.view",
				targetAggregation : "detailPages"
			},
			routes : [
				{
					pattern : "",
					name : "master",
					view : "Master",
					viewLevel : 0,
					targetAggregation : "masterPages",
					targetControl : "idAppControl",
					subroutes : [
						{
							pattern : "detail/:order:",
							name : "detail",
							view : "Detail",
							viewLevel : 1
						}, 
						{
							pattern : "orderItem/:deliveryItems:",
							name : "salesOrderItem",
							view : "SalesOrderItem",
							viewLevel : 1,
						}
					]
				}
			]
		}
	},

	init : function() {
		sap.ui.core.UIComponent.prototype.init.apply(this);
		var mConfig = this.getMetadata().getConfig();
		var sServiceUrl = mConfig.serviceConfig.serviceUrl;
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "liangly", "430002");
		oModel.setDefaultBindingMode("TwoWay");
		this.setModel(oModel);
		this.getRouter().initialize();
	}

});