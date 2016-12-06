
export class FlowChart{
 constructor(){
  this.defaultNodeWidth=250;
  this.nodeNameHeight=40;
  this.connectorHeight=35;
 }


computeConnectorY(connectorIndex) {
		return this.nodeNameHeight + (connectorIndex * this.connectorHeight);
	}

	//
	// Compute the position of a connector in the graph.
	//
	computeConnectorPos(node, connectorIndex, inputConnector) {
		return {
			x: node.x() + (inputConnector ? 0 : node.width ? node.width() : this.defaultNodeWidth),
			y: node.y() + this.computeConnectorY(connectorIndex),
		};
	};

	//
	// View model for a connector.
	//
	ConnectorViewModel(connectorDataModel, x, y, parentNode) {

		this.data = connectorDataModel;
		this._parentNode = parentNode;
		this._x = x;
		this._y = y;

		//
		// The name of the connector.
		//
		this.name=this.data.name;


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


	};

	//
	// Create view model for a list of data models.
	createConnectorsViewModel(connectorDataModels, x, parentNode) {
		var viewModels = [];

		if (connectorDataModels) {
			for (var i = 0; i < connectorDataModels.length; ++i) {
				var connectorViewModel =this.ConnectorViewModel(connectorDataModels[i], x, this.computeConnectorY(i), parentNode);
				viewModels.push(connectorViewModel);
			}
		}

		return viewModels;
	};


}
