jQuery.sap.declare("sap.ui.splitapp.Component");
jQuery.sap.require("sap.ui.splitapp.MyRouter");

sap.ui.core.UIComponent.extend("sap.ui.splitapp.Component", {
	metadata : {
		name : "Split App",
		version : "1.0",
		includes : [],
		dependencies : {
			libs : ["sap.m", "sap.ui.layout"],
			components : []
		},

		rootView : "sap.ui.splitapp.view.App",

		config : {
			serviceConfig : {
				name : "Northwind",
				serviceUrl : "/splitapp/proxy/http/services.odata.org/V2/(S(sapuidemotdg))/OData/OData.svc/"
			}
		},

		routing : {
			config : {
				routerClass : sap.ui.splitapp.MyRouter,
				viewType : "XML",
				viewPath : "sap.ui.splitapp.view",
				targetAggregation : "detailPages",
				clearTarget : false
			},
			routes : [
				{
					pattern : "",
					name : "main",
					view : "Master",
					targetAggregation : "masterPages",
					targetControl : "idAppControl",
					subroutes : [
						{
							pattern : "{product}/:tab:",
							name : "product",
							view : "Detail"
						}
					]
				}
			]
		}
	},

	init : function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		var mConfig = this.getMetadata().getConfig();

		var sServiceUrl = mConfig.serviceConfig.serviceUrl;

		// Create and set domain model to the component
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		this.setModel(oModel);

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : sap.ui.Device.system.phone,
			isNoPhone : !sap.ui.Device.system.phone,
			listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
			listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		this.setModel(deviceModel, "device");

		this.getRouter().initialize();

	}

});