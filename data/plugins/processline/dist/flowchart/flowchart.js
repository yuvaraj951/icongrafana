"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, FlowChart;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
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

			_export("FlowChart", FlowChart = function () {
				function FlowChart() {
					_classCallCheck(this, FlowChart);

					this.defaultNodeWidth = 250;
					this.nodeNameHeight = 40;
					this.connectorHeight = 35;
				}

				_createClass(FlowChart, [{
					key: "computeConnectorY",
					value: function computeConnectorY(connectorIndex) {
						return this.nodeNameHeight + connectorIndex * this.connectorHeight;
					}
				}, {
					key: "computeConnectorPos",
					value: function computeConnectorPos(node, connectorIndex, inputConnector) {
						return {
							x: node.x() + (inputConnector ? 0 : node.width ? node.width() : this.defaultNodeWidth),
							y: node.y() + this.computeConnectorY(connectorIndex)
						};
					}
				}, {
					key: "ConnectorViewModel",
					value: function ConnectorViewModel(connectorDataModel, x, y, parentNode) {

						this.data = connectorDataModel;
						this._parentNode = parentNode;
						this._x = x;
						this._y = y;

						//
						// The name of the connector.
						//
						this.name = this.data.name;

						//
						// X coordinate of the connector.
						/*//
      x() {
      	return this._x;
      };
      	//
      // Y coordinate of the connector.
      //
      y() {
      	return this._y;
      };
      */
						//
						// The parent node that the connector is attached to.
						//

					}
				}, {
					key: "createConnectorsViewModel",
					value: function createConnectorsViewModel(connectorDataModels, x, parentNode) {
						var viewModels = [];

						if (connectorDataModels) {
							for (var i = 0; i < connectorDataModels.length; ++i) {
								var connectorViewModel = this.ConnectorViewModel(connectorDataModels[i], x, this.computeConnectorY(i), parentNode);
								viewModels.push(connectorViewModel);
							}
						}

						return viewModels;
					}
				}]);

				return FlowChart;
			}());

			_export("FlowChart", FlowChart);
		}
	};
});
//# sourceMappingURL=flowchart.js.map
