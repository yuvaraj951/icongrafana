import {PanelCtrl} from 'app/plugins/sdk';
import {MetricsPanelCtrl, alertTab} from 'app/plugins/sdk';
import {QueryCtrl} from 'app/features/panel/query_ctrl';
import moment from 'moment';

export class ProcessLineCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector) {
   super($scope, $injector);
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.updateClock();

  }
 onInitEditMode() {

    this.addEditorTab('Node Options', 'public/plugins/grafana-processline-panel/editor.html', 3);
  }
  updateClock() {
    this.CompanyName = "Process Line Montoring";
    this.url="https://gimco-my.sharepoint.com/personal/chaitanyay_gogimco_com/_layouts/15/guestaccess.aspx?guestaccesstoken=NCfzMlyRyNvBjSG7hlX%2fclMAINAe5%2b3itYOFzQpOxu0%3d&docid=176da5d1bb15e433892bec03a4c9c7deb&rev=1";

  }

}

ProcessLineCtrl.templateUrl = 'module.html';
