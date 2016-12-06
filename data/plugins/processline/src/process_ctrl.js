import angular from 'angular';
import _ from 'lodash';
import $ from 'jquery';
import appEvents from 'app/core/app_events';
//import coreModule from '../../core/core_module';
import kbn from 'app/core/utils/kbn';
import config from 'app/core/config';
import TimeSeries from 'app/core/time_series2';
//import 'public/plugins/grafana-processline-panel/css/style1.css'
import {PanelCtrl} from 'app/plugins/sdk';
import {MetricsPanelCtrl, alertTab} from 'app/plugins/sdk';
import {QueryCtrl} from 'app/features/panel/query_ctrl';
import {ChartViewModel} from './flowchart/ChartViewModel';
import moment from 'moment';
//import {Draggable} from './dragging_service';
import './mydirective';
import  './drag_drop';
import './node-directive'
//import {top,left} from './drag_drop';
const panelDefaults = {
      deleteKeyCode: '46',
      ctrlKeyCode: '17',
      ctrlDown: false,
      aKeyCode:'65',
      escKeyCode:'27',
      nextNodeID:'10',
      bgColor: null,
      thresholds: '0,10',
      colors: ['rgba(50, 172, 45, 1)', 'rgba(241, 255, 0, 1)', 'rgba(245, 54, 54, 1)'],
      Name:'Node',
      chartDataModel: {
        nodes:[



        ]

      },
    };
export class ProcessLineCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector,$window) {
   super($scope, $injector,$window);
   this.$scope=$scope;
   _.defaults(this.panel, panelDefaults);
    this.CompanyName = "Process Line Montoring";

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    //this.events.on('init-edit-mode', this.updateClock.bind(this));
    this.chartModel=new ChartViewModel(this.panel.chartDataModel)
    //this.updateClock();
   // this.update();
    this.document=document;

 }
 onInitEditMode() {
    // this.addEditorTab('Metrics', 'public/plugins/grafana-processline-panel/metrics.html');
     this.addEditorTab('Node Options', 'public/plugins/grafana-processline-panel/editor.html', 3);
     this.events.on('data-received', this.onDataReceived.bind(this));
     this.events.on('data-error', this.onDataError.bind(this));
     this.unitFormats = kbn.getUnitFormats();
   }


  updateClock() {
       this.time=10;
     //var e1=document.getElementById("shape");
     //this.align = e1.getAttribute("nodeX");
     }

   addNewNode(data) {

   		var nodeName = prompt("Enter a node name:", "New node");
   		if (!nodeName) {
   			return;
   		}

   		//
   		// Template for a new node.
   		//
   		var newNodeDataModel = {
   			name: nodeName,
   			id: this.panel.nextNodeID++,
   			x: 0,
   			y: 0,
   			Data: [


   			]

   		};

        //newNodeDataModel.Data.push(data)
   		this.chartModel.addNode(newNodeDataModel);
   		return 0;
   	};





     onDataReceived(dataList) {
         this.series = dataList.map(this.seriesHandler.bind(this));
         var data={};
         this.setValues(data);
        this.data=data;
         console.log(this.data);
         this.updateNode(this.data);
         this.render();
     }

     seriesHandler(seriesData) {

         var series = new TimeSeries({
           datapoints: seriesData.datapoints,
           alias: seriesData.target,
           unit: false,
         });
         series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);

         return series;
     }
     setValues(data){
     if (this.series && this.series.length > 0) {
     			for(var i = 0; i < this.series.length; i++){
     				var seriesItem = this.series[i];
     				console.debug('setting values for series');
     				console.debug(seriesItem);
     				data[seriesItem.alias] = this.applyOverrides(seriesItem.alias);
     				var lastPoint = _.last(seriesItem.datapoints);
     			    var lastValue = _.isArray(lastPoint) ? lastPoint[0] : null;
     			console.log(lastPoint);
     			console.log(lastValue);
     			if (this.panel.valueName === 'name') {
                					data[seriesItem.alias].value = 0;
                			        data[seriesItem.alias].valueRounded = lastValue;
                			        data[seriesItem.alias].valueFormated = seriesItem.alias;
                				} else if (_.isString(lastValue)) {
                			        data[seriesItem.alias].value = lastValue;
                			        data[seriesItem.alias].valueFormated = _.escape(lastValue);
                			        data[seriesItem.alias].valueRounded = 0;
                				} else {
                					data[seriesItem.alias].value = lastValue;
                			        //data[seriesItem.alias].flotpairs = seriesItem.flotpairs;


                				}

     }
     }
     }
     applyOverrides(seriesItemAlias){
     var seriesItem = {}, colorData = {}, overrides = {};
     		console.info('applying overrides for seriesItem');
     		console.debug(seriesItemAlias);
     		console.debug(this.panel.chartDataModel.nodes);
     		for(var i=0; i<=this.panel.chartDataModel.nodes.length; i++){
     			console.debug('comparing:');
     			console.debug(this.panel.chartDataModel.nodes[i]);
     			if (this.panel.chartDataModel.nodes[i] && this.panel.chartDataModel.nodes[i].alias == seriesItemAlias){
     				overrides = this.panel.chartDataModel.nodes[i];
     			}
     		}


     		seriesItem.Name = overrides.Name || this.panel.Name;

     		return seriesItem;


     }
/*
     setValues(){
     var data={};

     var id1=this.series[0].datapoints;
     var len = id1.length;


        for(var i = 0; i<=len; i++)
       {
            for(var key in id1[i])
            {

                if(key==0){
               console.log(id1[i][key]);
               var ElaspedTime=id1[i][key];
               this.addNewNode(ElaspedTime);
               console.log(data.ElaspedTime)
               //console.log(key);
                     }
            }

       }


     }
*/
updateNode(nodeData){

console.log(nodeData);




for(var i=0;i<=this.panel.chartDataModel.nodes.length;i++){
var nodeDetails=this.panel.chartDataModel.nodes;

for(var singleName of nodeDetails){
 if(singleName.name==this.metricsNodeName){

    singleName.Data.pop();

 singleName.Data.push(nodeData);
 console.log(this.panel.chartDataModel.nodes);

 }

}

}


}
   UpdateNodeMetrics(nodename){

   this.metricsNodeName=nodename;

   console.log(this.metricsNodeName);


   }


    DeleteNode(node){
    var nodeDelete=this.panel.chartDataModel.nodes;
    //for(var i=0;i<=nodeDelete.length;i++){

    var index = nodeDelete.findIndex(function(o){
     return o.name === node;
     console.log(index);
    })
    nodeDelete.splice(index, 1);
}

}

ProcessLineCtrl.templateUrl = 'module.html';