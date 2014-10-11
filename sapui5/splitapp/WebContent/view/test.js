sap.ui
		.controller(
				'sap.ui.demokit.explored.view.code',
				{
					onInit : function() {
						this.router = sap.ui.core.UIComponent
								.getRouterFor(this);
						this.router.attachRoutePatternMatched(
								this.onRouteMatched, this);
						this._viewData = sap.ui.getCore().byId('app')
								.getViewData();
						this._viewData.component.codeCache = {}
					},
					onRouteMatched : function(e) {
						if (e.getParameter('name') !== 'code') {
							return
						}
						this._sId = e.getParameter('arguments').id;
						var s = sap.ui.demokit.explored.data.samples[this._sId];
						if (!s) {
							this.router.myNavToWithoutHash(
									'sap.ui.demokit.explored.view.notFound',
									'XML', false, {
										path : this._sId
									});
							return
						}
						var c = 'sampleComp-' + this._sId;
						var C = this._sId;
						var o = sap.ui.component(c);
						if (!o) {
							o = sap.ui.getCore().createComponent({
								id : c,
								name : C
							})
						}
						var m = o.getMetadata();
						var a = (m) ? m.getConfig() : null;
						var d = {
							title : 'Code: ' + s.name,
							files : []
						};
						var t = this;
						var S = function(b) {
							t._viewData.component.codeCache[u] = b
						};
						var E = function(b) {
							t._viewData.component.codeCache[u] = "not found: '"
									+ u + "'"
						};
						if (a && a.sample && a.sample.files) {
							var r = jQuery.sap.getModulePath(s.id);
							for (var i = 0; i < a.sample.files.length; i++) {
								var f = a.sample.files[i];
								var u = r + '/' + f;
								if (!(u in this._viewData.component.codeCache)) {
									this._viewData.component.codeCache[u] = '';
									jQuery.ajax(u, {
										async : false,
										dataType : 'text',
										success : S,
										error : E
									})
								}
								d.files
										.push({
											name : f,
											raw : t._viewData.component.codeCache[u],
											code : this
													._convertCodeToHtml(t._viewData.component.codeCache[u])
										})
							}
						}
						this.getView().setModel(
								new sap.ui.model.json.JSONModel(d));
						var p = this.getView().byId('page');
						p.scrollTo(0)
					},
					onDownload : function(e) {
						jQuery.sap.require('sap.ui.thirdparty.jszip');
						var o = new JSZip();
						var d = this.getView().getModel().getData();
						for (var i = 0; i < d.files.length; i++) {
							var f = d.files[i];
							o.file(f.name, f.raw)
						}
						var c = o.generate();
						location.href = 'data:application/zip;base64,' + c
					},
					onNavBack : function() {
						this.router.myNavBack('sample', {
							id : this._sId
						}, true)
					},
					_convertCodeToHtml : function(c) {
						jQuery.sap.require('jquery.sap.encoder');
						c = c.toString();
						c = c.replace(/^function.+{/, '');
						c = c.replace(/}[!}]*$/, '');
						c = c.replace(/^[\n\s\S]*\/\/\s*CODESNIP_START\n/, '');
						c = c.replace(/\/\/\s*CODESNIP_END[\n\s\S]*$/, '');
						c = c.replace(/\t/g, '  ');
						return '<pre><code>' + jQuery.sap.encodeHTML(c)
								+ '</code></pre>'
					}
				});
