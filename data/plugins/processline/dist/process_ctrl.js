'use strict';

System.register(['app/plugins/sdk', 'app/features/panel/query_ctrl', 'moment'], function (_export, _context) {
  "use strict";

  var PanelCtrl, MetricsPanelCtrl, alertTab, QueryCtrl, moment, _createClass, ProcessLineCtrl;

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
    setters: [function (_appPluginsSdk) {
      PanelCtrl = _appPluginsSdk.PanelCtrl;
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
      alertTab = _appPluginsSdk.alertTab;
    }, function (_appFeaturesPanelQuery_ctrl) {
      QueryCtrl = _appFeaturesPanelQuery_ctrl.QueryCtrl;
    }, function (_moment) {
      moment = _moment.default;
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

      _export('ProcessLineCtrl', ProcessLineCtrl = function (_MetricsPanelCtrl) {
        _inherits(ProcessLineCtrl, _MetricsPanelCtrl);

        function ProcessLineCtrl($scope, $injector) {
          _classCallCheck(this, ProcessLineCtrl);

          var _this = _possibleConstructorReturn(this, (ProcessLineCtrl.__proto__ || Object.getPrototypeOf(ProcessLineCtrl)).call(this, $scope, $injector));

          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.updateClock();

          return _this;
        }

        _createClass(ProcessLineCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {

            this.addEditorTab('Node Options', 'public/plugins/grafana-processline-panel/editor.html', 3);
          }
        }, {
          key: 'updateClock',
          value: function updateClock() {
            this.CompanyName = "Process Line Montoring";
            this.url = "https://gimco-my.sharepoint.com/personal/chaitanyay_gogimco_com/_layouts/15/guestaccess.aspx?guestaccesstoken=NCfzMlyRyNvBjSG7hlX%2fclMAINAe5%2b3itYOFzQpOxu0%3d&docid=176da5d1bb15e433892bec03a4c9c7deb&rev=1";
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
