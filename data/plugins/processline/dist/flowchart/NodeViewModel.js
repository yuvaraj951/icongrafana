"use strict";

System.register(["./flowchart"], function (_export, _context) {
	"use strict";

	var FlowChart, _createClass, NodeViewModel;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_flowchart) {
			FlowChart = _flowchart.FlowChart;
		}],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			_export("NodeViewModel", NodeViewModel = function () {
				function NodeViewModel(nodeDataModel) {
					_classCallCheck(this, NodeViewModel);

					this.data = nodeDataModel;
					this.flowchart = new FlowChart();
					this.inputConnectors = this.flowchart.createConnectorsViewModel(this.data.Data, 0, this);
					this._selected = false;
				}
				/*// set the default width value of the node
    if (!this.data.width || this.data.width < 0) {
    	this.data.width = this.flowchart.defaultNodeWidth;
    }
    */

				//this.outputConnectors = createConnectorsViewModel(this.data.outputConnectors, this.data.width, this);

				// Set to true when the node is selected.


				//
				// Name of the node.
				//


				_createClass(NodeViewModel, [{
					key: "name",
					value: function name() {
						return this.data.name || "";
					}
				}, {
					key: "x",
					value: function x() {
						return this.data.x;
					}
				}, {
					key: "y",
					value: function y() {
						return this.data.y;
					}
				}, {
					key: "width",
					value: function width() {
						return this.data.width;
					}
				}, {
					key: "height",
					value: function height() {
						var numConnectors = Math.max(this.inputConnectors.length);
						return this.flowchart.computeConnectorY(numConnectors);
					}
				}, {
					key: "select",
					value: function select() {
						this._selected = true;
					}
				}, {
					key: "deselect",
					value: function deselect() {
						this._selected = false;
					}
				}, {
					key: "toggleSelected",
					value: function toggleSelected() {
						this._selected = !this._selected;
					}
				}, {
					key: "selected",
					value: function selected() {
						return this._selected;
					}
				}, {
					key: "addConnector",
					value: function addConnector(connectorDataModel, x, connectorsDataModel, connectorsViewModel) {
						var connectorViewModel = this.flowchart.ConnectorViewModel(connectorDataModel, x, this.flowchart.computeConnectorY(connectorsViewModel.length), this);

						connectorsDataModel.push(connectorDataModel);

						// Add to node's view model.
						connectorsViewModel.push(connectorViewModel);
					}
				}, {
					key: "addInputConnector",
					value: function addInputConnector(connectorDataModel) {

						if (!this.data.Data) {
							this.data.Data = [];
						}
						this.addConnector(connectorDataModel, 0, this.data.Data, this.Data);
					}
				}, {
					key: "createNodesViewModel",
					value: function createNodesViewModel(nodesDataModel) {
						var nodesViewModel = [];

						if (nodesDataModel) {
							for (var i = 0; i < nodesDataModel.length; ++i) {
								nodesViewModel.push(new NodeViewModel(nodesDataModel[i]));
							}
						}

						return nodesViewModel;
					}
				}]);

				return NodeViewModel;
			}());

			_export("NodeViewModel", NodeViewModel);
		}
	};
});
//# sourceMappingURL=NodeViewModel.js.map
