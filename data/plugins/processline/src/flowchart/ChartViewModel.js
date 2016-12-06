import {NodeViewModel} from './NodeViewModel';


 export class ChartViewModel{
         constructor(chartViewModel){
           this.data=chartViewModel;
           this.nodeviewmodel=new NodeViewModel(this.data.nodes);
           this.nodes = this.nodeviewmodel.createNodesViewModel(this.data.nodes);
           //this.nodes=this.data.nodes;

         }

		//
		// Find a specific node within the chart.
		//
		findNode(nodeID) {

			for (var i = 0; i < this.nodes.length; ++i) {
				var node = this.nodes[i];
				if (node.data.id == nodeID) {
					return node;
				}
			}

			throw new Error("Failed to find node " + nodeID);
		};

		//
		// Find a specific input connector within the chart.
		//
		findInputConnector(nodeID, connectorIndex) {

			var node = this.findNode(nodeID);

			if (!node.Data || node.Data.length <= connectorIndex) {
				throw new Error("Node " + nodeID + " has invalid input connectors.");
			}

			return node.Data[connectorIndex];
		};


		// Add a node to the view model.
		//
		addNode(nodeDataModel) {
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

		//
		// Select all nodes and connections in the chart.
		//
		selectAll() {

			var nodes = this.nodes;
			for (var i = 0; i < nodes.length; ++i) {
				var node = nodes[i];
				node.select();
			}

			}

		//
		// Deselect all nodes and connections in the chart.
		//
		deselectAll() {

			var nodes = this.nodes;
			for (var i = 0; i < nodes.length; ++i) {
				var node = nodes[i];
				node.deselect();
			}


		};

		//
		// Update the location of the node and its connectors.
		//
		updateSelectedNodesLocation(deltaX, deltaY) {

			var selectedNodes = this.getSelectedNodes();

			for (var i = 0; i < selectedNodes.length; ++i) {
				var node = selectedNodes[i];
				node.data.x += deltaX;
				node.data.y += deltaY;
			}
		};

		//
		// Handle mouse click on a particular node.
		//
		handleNodeClicked(node, ctrlKey) {

			if (ctrlKey) {
				node.toggleSelected();
			}
			else {
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
		};



		//
		// Delete all nodes and connections that are selected.
		//
		deleteSelected() {

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
				}
				else {
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

		};

		//
		// Select nodes and connections that fall within the selection rect.
		//
		applySelectionRect(selectionRect) {

			this.deselectAll();

			for (var i = 0; i < this.nodes.length; ++i) {
				var node = this.nodes[i];
				if (node.x() >= selectionRect.x &&
					node.y() >= selectionRect.y &&
					node.x() + node.width() <= selectionRect.x + selectionRect.width &&
					node.y() + node.height() <= selectionRect.y + selectionRect.height)
				{
					// Select nodes that are within the selection rect.
					node.select();
				}
			}



		};

		//
		// Get the array of nodes that are currently selected.
		//
		getSelectedNodes() {
			var selectedNodes = [];

			for (var i = 0; i < this.nodes.length; ++i) {
				var node = this.nodes[i];
				if (node.selected()) {
					selectedNodes.push(node);
				}
			}

			return selectedNodes;
		};

		//
		// Get the array of connections that are currently selected.
		//



	};