"use strict";

System.register(["./NodeViewModel"], function (_export, _context) {
	"use strict";

	var NodeViewModel, _createClass, ChartViewModel;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_NodeViewModel) {
			NodeViewModel = _NodeViewModel.NodeViewModel;
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

			_export("ChartViewModel", ChartViewModel = function () {
				function ChartViewModel(chartViewModel) {
					_classCallCheck(this, ChartViewModel);

					this.data = chartViewModel;
					this.nodeviewmodel = new NodeViewModel(this.data.nodes);
					this.nodes = this.nodeviewmodel.createNodesViewModel(this.data.nodes);
					//this.nodes=this.data.nodes;
				}

				//
				// Find a specific node within the chart.
				//


				_createClass(ChartViewModel, [{
					key: "findNode",
					value: function findNode(nodeID) {

						for (var i = 0; i < this.nodes.length; ++i) {
							var node = this.nodes[i];
							if (node.data.id == nodeID) {
								return node;
							}
						}

						throw new Error("Failed to find node " + nodeID);
					}
				}, {
					key: "findInputConnector",
					value: function findInputConnector(nodeID, connectorIndex) {

						var node = this.findNode(nodeID);

						if (!node.Data || node.Data.length <= connectorIndex) {
							throw new Error("Node " + nodeID + " has invalid input connectors.");
						}

						return node.Data[connectorIndex];
					}
				}, {
					key: "addNode",
					value: function addNode(nodeDataModel) {
						if (!this.data.nodes) {
							this.data.nodes = [];
						}

						//
						// Update the data model.
						//
						this.data.nodes.push(nodeDataModel);

						//
						// Update the view model.
						//
						//this.nodes.push(new NodeViewModel(nodeDataModel));
					}
				}, {
					key: "selectAll",
					value: function selectAll() {

						var nodes = this.nodes;
						for (var i = 0; i < nodes.length; ++i) {
							var node = nodes[i];
							node.select();
						}
					}
				}, {
					key: "deselectAll",
					value: function deselectAll() {

						var nodes = this.nodes;
						for (var i = 0; i < nodes.length; ++i) {
							var node = nodes[i];
							node.deselect();
						}
					}
				}, {
					key: "updateSelectedNodesLocation",
					value: function updateSelectedNodesLocation(deltaX, deltaY) {

						var selectedNodes = this.getSelectedNodes();

						for (var i = 0; i < selectedNodes.length; ++i) {
							var node = selectedNodes[i];
							node.data.x += deltaX;
							node.data.y += deltaY;
						}
					}
				}, {
					key: "handleNodeClicked",
					value: function handleNodeClicked(node, ctrlKey) {

						if (ctrlKey) {
							node.toggleSelected();
						} else {
							this.deselectAll();
							node.select();
						}

						// Move node to the end of the list so it is rendered after all the other.
						// This is the way Z-order is done in SVG.

						var nodeIndex = this.nodes.indexOf(node);
						if (nodeIndex == -1) {
							throw new Error("Failed to find node in view model!");
						}
						this.nodes.splice(nodeIndex, 1);
						this.nodes.push(node);
					}
				}, {
					key: "deleteSelected",
					value: function deleteSelected() {

						var newNodeViewModels = [];
						var newNodeDataModels = [];

						var deletedNodeIds = [];

						//
						// Sort nodes into:
						//		nodes to keep and
						//		nodes to delete.
						//

						for (var nodeIndex = 0; nodeIndex < this.nodes.length; ++nodeIndex) {

							var node = this.nodes[nodeIndex];
							if (!node.selected()) {
								// Only retain non-selected nodes.
								newNodeViewModels.push(node);
								newNodeDataModels.push(node.data);
							} else {
								// Keep track of nodes that were deleted, so their connections can also
								// be deleted.
								deletedNodeIds.push(node.data.id);
							}
						}

						//
						// Remove connections that are selected.
						// Also remove connections for nodes that have been deleted.
						//


						//
						// Update nodes and connections.
						//
						this.nodes = newNodeViewModels;
						this.data.nodes = newNodeDataModels;
					}
				}, {
					key: "applySelectionRect",
					value: function applySelectionRect(selectionRect) {

						this.deselectAll();

						for (var i = 0; i < this.nodes.length; ++i) {
							var node = this.nodes[i];
							if (node.x() >= selectionRect.x && node.y() >= selectionRect.y && node.x() + node.width() <= selectionRect.x + selectionRect.width && node.y() + node.height() <= selectionRect.y + selectionRect.height) {
								// Select nodes that are within the selection rect.
								node.select();
							}
						}
					}
				}, {
					key: "getSelectedNodes",
					value: function getSelectedNodes() {
						var selectedNodes = [];

						for (var i = 0; i < this.nodes.length; ++i) {
							var node = this.nodes[i];
							if (node.selected()) {
								selectedNodes.push(node);
							}
						}

						return selectedNodes;
					}
				}]);

				return ChartViewModel;
			}());

			_export("ChartViewModel", ChartViewModel);

			;
		}
	};
});
//# sourceMappingURL=ChartViewModel.js.map
