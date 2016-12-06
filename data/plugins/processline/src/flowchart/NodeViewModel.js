import {FlowChart} from './flowchart'

export class NodeViewModel {
      constructor(nodeDataModel){
		this.data = nodeDataModel;
		this.flowchart=new FlowChart();
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
		name() {
			return this.data.name || "";
		};

		//
		// X coordinate of the node.
		//
		x() {
			return this.data.x;
		};

		//
		// Y coordinate of the node.
		//
		y() {
			return this.data.y;
		};

		//
		// Width of the node.
		//
		width() {
			return this.data.width;
		}

		//
		// Height of the node.
		//
		height() {
			var numConnectors =
				Math.max(
					this.inputConnectors.length);
			return this.flowchart.computeConnectorY(numConnectors);
		}

		//
		// Select the node.
		//
		select() {
			this._selected = true;
		};

		//
		// Deselect the node.
		//
		deselect() {
			this._selected = false;
		};

		//
		// Toggle the selection state of the node.
		//
		toggleSelected() {
			this._selected = !this._selected;
		};

		//
		// Returns true if the node is selected.
		//
		selected() {
			return this._selected;
		};

		//
		// Internal function to add a connector.
		addConnector(connectorDataModel, x, connectorsDataModel, connectorsViewModel) {
			var connectorViewModel =this.flowchart.ConnectorViewModel(connectorDataModel, x,
						this.flowchart.computeConnectorY(connectorsViewModel.length), this);

			connectorsDataModel.push(connectorDataModel);

			// Add to node's view model.
			connectorsViewModel.push(connectorViewModel);
		}

		//
		// Add an input connector to the node.
		//
		addInputConnector(connectorDataModel) {

			if (!this.data.Data) {
				this.data.Data = [];
			}
			this.addConnector(connectorDataModel, 0, this.data.Data, this.Data);
		};

		//
		// Add an ouput connector to the node.
		//


	//
	// Wrap the nodes data-model in a view-model.
	//
	createNodesViewModel(nodesDataModel) {
		var nodesViewModel = [];

		if (nodesDataModel) {
			for (var i = 0; i < nodesDataModel.length; ++i) {
                nodesViewModel.push(new NodeViewModel(nodesDataModel[i]));
			}
		}

		return nodesViewModel;
	};
}