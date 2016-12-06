'use strict';

System.register(['angular', 'lodash', 'jquery', 'app/core/app_events', 'app/core/utils/kbn', 'app/core/config', 'app/core/time_series2', 'app/plugins/sdk', 'app/features/panel/query_ctrl', './flowchart/ChartViewModel', 'moment', './mydirective', './drag_drop', './node-directive'], function (_export, _context) {
  "use strict";

  var angular, _, $, appEvents, kbn, config, TimeSeries, PanelCtrl, MetricsPanelCtrl, alertTab, QueryCtrl, ChartViewModel, moment, _createClass, panelDefaults, ProcessLineCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_appCoreApp_events) {
      appEvents = _appCoreApp_events.default;
    }, function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }, function (_appCoreConfig) {
      config = _appCoreConfig.default;
    }, function (_appCoreTime_series) {
      TimeSeries = _appCoreTime_series.default;
    }, function (_appPluginsSdk) {
      PanelCtrl = _appPluginsSdk.PanelCtrl;
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
      alertTab = _appPluginsSdk.alertTab;
    }, function (_appFeaturesPanelQuery_ctrl) {
      QueryCtrl = _appFeaturesPanelQuery_ctrl.QueryCtrl;
    }, function (_flowchartChartViewModel) {
      ChartViewModel = _flowchartChartViewModel.ChartViewModel;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_mydirective) {}, function (_drag_drop) {}, function (_nodeDirective) {}],
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

      panelDefaults = {
        deleteKeyCode: '46',
        ctrlKeyCode: '17',
        ctrlDown: false,
        aKeyCode: '65',
        escKeyCode: '27',
        nextNodeID: '10',
        bgColor: null,
        thresholds: '0,10',
        colors: ['rgba(50, 172, 45, 1)', 'rgba(241, 255, 0, 1)', 'rgba(245, 54, 54, 1)'],
        Name: 'Node',
        chartDataModel: {
          nodes: []

        }
      };

      _export('ProcessLineCtrl', ProcessLineCtrl = function (_MetricsPanelCtrl) {
        _inherits(ProcessLineCtrl, _MetricsPanelCtrl);

        function ProcessLineCtrl($scope, $injector, $window) {
          _classCallCheck(this, ProcessLineCtrl);

          var _this = _possibleConstructorReturn(this, (ProcessLineCtrl.__proto__ || Object.getPrototypeOf(ProcessLineCtrl)).call(this, $scope, $injector, $window));

          _this.$scope = $scope;
          _.defaults(_this.panel, panelDefaults);
          _this.CompanyName = "Process Line Montoring";

          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          //this.events.on('init-edit-mode', this.updateClock.bind(this));
          _this.chartModel = new ChartViewModel(_this.panel.chartDataModel);
          //this.updateClock();
          // this.update();
          _this.document = document;

          return _this;
        }

        _createClass(ProcessLineCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            // this.addEditorTab('Metrics', 'public/plugins/grafana-processline-panel/metrics.html');
            this.addEditorTab('Node Options', 'public/plugins/grafana-processline-panel/editor.html', 3);
            this.events.on('data-received', this.onDataReceived.bind(this));
            this.events.on('data-error', this.onDataError.bind(this));
            this.unitFormats = kbn.getUnitFormats();
          }
        }, {
          key: 'updateClock',
          value: function updateClock() {
            this.time = 10;
            //var e1=document.getElementById("shape");
            //this.align = e1.getAttribute("nodeX");
          }
        }, {
          key: 'addNewNode',
          value: function addNewNode(data) {

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
              Data: []

            };

            //newNodeDataModel.Data.push(data)
            this.chartModel.addNode(newNodeDataModel);
            return 0;
          }
        }, {
          key: 'onDataReceived',
          value: function onDataReceived(dataList) {
            this.series = dataList.map(this.seriesHandler.bind(this));
            var data = {};
            this.setValues(data);
            this.data = data;
            console.log(this.data);
            this.updateNode(this.data);
            this.render();
          }
        }, {
          key: 'seriesHandler',
          value: function seriesHandler(seriesData) {

            var series = new TimeSeries({
              datapoints: seriesData.datapoints,
              alias: seriesData.target,
              unit: false
            });
            series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);

            return series;
          }
        }, {
          key: 'setValues',
          value: function setValues(data) {
            if (this.series && this.series.length > 0) {
              for (var i = 0; i < this.series.length; i++) {
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
        }, {
          key: 'applyOverrides',
          value: function applyOverrides(seriesItemAlias) {
            var seriesItem = {},
                colorData = {},
                overrides = {};
            console.info('applying overrides for seriesItem');
            console.debug(seriesItemAlias);
            console.debug(this.panel.chartDataModel.nodes);
            for (var i = 0; i <= this.panel.chartDataModel.nodes.length; i++) {
              console.debug('comparing:');
              console.debug(this.panel.chartDataModel.nodes[i]);
              if (this.panel.chartDataModel.nodes[i] && this.panel.chartDataModel.nodes[i].alias == seriesItemAlias) {
                overrides = this.panel.chartDataModel.nodes[i];
              }
            }

            seriesItem.Name = overrides.Name || this.panel.Name;

            return seriesItem;
          }
        }, {
          key: 'updateNode',
          value: function updateNode(nodeData) {

            console.log(nodeData);

            for (var i = 0; i <= this.panel.chartDataModel.nodes.length; i++) {
              var nodeDetails = this.panel.chartDataModel.nodes;

              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = nodeDetails[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var singleName = _step.value;

                  if (singleName.name == this.metricsNodeName) {

                    singleName.Data.pop();

                    singleName.Data.push(nodeData);
                    console.log(this.panel.chartDataModel.nodes);
                  }
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            }
          }
        }, {
          key: 'UpdateNodeMetrics',
          value: function UpdateNodeMetrics(nodename) {

            this.metricsNodeName = nodename;

            console.log(this.metricsNodeName);
          }
        }, {
          key: 'DeleteNode',
          value: function DeleteNode(node) {
            var nodeDelete = this.panel.chartDataModel.nodes;
            //for(var i=0;i<=nodeDelete.length;i++){

            var index = nodeDelete.findIndex(function (o) {
              return o.name === node;
              console.log(index);
            });
            nodeDelete.splice(index, 1);
          }
        }]);

        return ProcessLineCtrl;
      }(MetricsPanelCtrl));

      _export('ProcessLineCtrl', ProcessLineCtrl);

      ProcessLineCtrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=process_ctrl.js.map
