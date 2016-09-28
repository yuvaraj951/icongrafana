///<reference path="../../headers/common.d.ts" />
System.register(['../../core/core_module'], function(exports_1) {
    var core_module_1;
    var OrgUsersCtrl;
    return {
        setters:[
            function (core_module_1_1) {
                core_module_1 = core_module_1_1;
            }],
        execute: function() {
            OrgUsersCtrl = (function () {
                /** @ngInject */
                function OrgUsersCtrl($scope, $http, backendSrv,$location,$routeParams) {
                    this.$scope = $scope;
                    this.$http = $http;
                    this.backendSrv = backendSrv;
                    this.$location=$location;
                    this.$routeParams=$routeParams;
                    this.user = {
                        loginOrEmail: '',
                        role: 'Viewer',

                    };

                    this.get();
                    this.editor = { index: 0 };

                }
                OrgUsersCtrl.prototype.get = function () {
                    var _this = this;
                    this.backendSrv.get('/api/org/users')
                        .then(function (users) {
                        _this.users = users;
                    });
                    this.backendSrv.get('/api/org/invites')
                        .then(function (pendingInvites) {
                        _this.pendingInvites = pendingInvites;
                    });
                    this.backendSrv.get('/api/org/process')
                         .then(function (process) {
                          _this.process = process;
                                        });
                    this.backendSrv.get('/api/org/machine')
                                             .then(function (machines) {
                                              _this.machines = machines;
                                                            });
                    this.backendSrv.get('/api/org/maintenance')
                        .then(function (maintenances) {
                           _this.maintenances = maintenances;
                                  });
                    this.backendSrv.get('/api/org/subprocess')
                                            .then(function (subprocess) {
                                               _this.subprocess = subprocess;
                                                      });
                    this.backendSrv.get('/api/org/alerts/pending')
                     .then(function (pendingAlerts) {
                       _this.pendingAlerts = pendingAlerts;
                          });
                    this.backendSrv.get('/api/org/alerts/completed')
                       .then(function (completedAlerts) {
                          _this.completedAlerts = completedAlerts;
                            });
                    /*this.backendSrv.get('/api/org/maintenanceAlerts')
                     .then(function (maintenanceAlerts) {
                       _this.maintenanceAlerts = maintenanceAlerts;
                            });
                     this.backendSrv.get('/api/org/maintenanceHistory')
                                                 .then(function (maintenanceHistory) {
                                                   _this.maintenanceHistory = maintenanceHistory;
                                                        });
                    this.backendSrv.get('/api/org/maintenanceActivity')
                                                                     .then(function (maintenanceActivity) {
                                                                       _this.maintenanceActivity = maintenanceActivity;
                                                                            });*/
                };
                OrgUsersCtrl.prototype.updateOrgUser = function (user) {
                    this.backendSrv.patch('/api/org/users/' + user.userId, user);
                };
                OrgUsersCtrl.prototype.updateMachine = function (machine) {
                                    this.backendSrv.patch('/api/org/machine/' + machine.machineId, machine);
                                };
                OrgUsersCtrl.prototype.removeUser = function (user) {
                    var _this = this;
                    this.$scope.appEvent('confirm-modal', {
                        title: 'Delete',
                        text: 'Are you sure you want to delete user ' + user.login + '?',
                        yesText: "Delete",
                        icon: "fa-warning",
                        onConfirm: function () {
                            _this.removeUserConfirmed(user);
                        }
                    });
                };
                OrgUsersCtrl.prototype.removeUserConfirmed = function (user) {
                    var _this = this;
                    this.backendSrv.delete('/api/org/users/' + user.userId)
                        .then(function () {
                        _this.get();
                    });
                };


                //delete the process
                 OrgUsersCtrl.prototype.removeProcess = function (p) {
                                    var _this = this;
                                    this.$scope.appEvent('confirm-modal', {
                                        title: 'Delete',
                                        text: 'Are you sure you want to delete user ' + p.processName + '?',
                                        yesText: "Delete",
                                        icon: "fa-warning",
                                        onConfirm: function () {
                                            _this.removeProcess1Confirmed(p);
                                        }
                                    });
                                };
                                OrgUsersCtrl.prototype.removeProcess1Confirmed = function (p) {
                                    var _this = this;
                                    this.backendSrv.delete('/api/org/process/' + p.processId)
                                        .then(function () {
                                        _this.get();
                                    });
                                };
 OrgUsersCtrl.prototype.removeSubProcess = function (p) {
                                    var _this = this;
                                    this.$scope.appEvent('confirm-modal', {
                                        title: 'Delete',
                                        text: 'Are you sure you want to delete user ' + p.subProcessName + '?',
                                        yesText: "Delete",
                                        icon: "fa-warning",
                                        onConfirm: function () {
                                            _this.removeSubProcessConfirmed(p);
                                        }
                                    });
                                };
                                OrgUsersCtrl.prototype.removeSubProcessConfirmed = function (p) {
                                    var _this = this;
                                    this.backendSrv.delete('/api/org/subprocess/' + p.subProcessId)
                                        .then(function () {
                                        _this.get();
                                    });
                                };
             // delete the machine
              OrgUsersCtrl.prototype.removeMachine = function (machine) {
                                                 var _this = this;
                                                 this.$scope.appEvent('confirm-modal', {
                                                     title: 'Delete',
                                                     text: 'Are you sure you want to delete Machine ' + machine.machineName + '?',
                                                     yesText: "Delete",
                                                     icon: "fa-warning",
                                                     onConfirm: function () {
                                                         _this.removeProcessConfirmed(machine);
                                                     }
                                                 });
                                             };
                                             OrgUsersCtrl.prototype.removeProcessConfirmed = function (machine) {
                                                 var _this = this;
                                                 this.backendSrv.delete('/api/org/machine/' + machine.machineId)
                                                     .then(function () {
                                                     _this.get();
                                                 });
                                             };
               // delete the maintenance plans
               OrgUsersCtrl.prototype.removeMaintenance = function (maintenance) {
                                                                var _this = this;
                                                                this.$scope.appEvent('confirm-modal', {
                                                                    title: 'Delete',
                                                                    text: 'Are you sure you want to delete Machine ' + maintenance.componentName + '?',
                                                                    yesText: "Delete",
                                                                    icon: "fa-warning",
                                                                    onConfirm: function () {
                                                                        _this.removeMaintenanceConfirmed(maintenance);
                                                                    }
                                                                });
                                                            };
      OrgUsersCtrl.prototype.removeMaintenanceConfirmed = function (maintenance) {
        var _this = this;
         this.backendSrv.delete('/api/org/maintenance/' + maintenance.id)
          .then(function () {
            _this.get();
                });
            };
                OrgUsersCtrl.prototype.revokeInvite = function (invite, evt) {
                    var _this = this;
                    evt.stopPropagation();
                    this.backendSrv.patch('/api/org/invites/' + invite.code + '/revoke')
                        .then(function () {
                        _this.get();
                    });
                };
                OrgUsersCtrl.prototype.copyInviteToClipboard = function (evt) {
                    evt.stopPropagation();
                };
                OrgUsersCtrl.prototype.openInviteModal = function () {
                    var modalScope = this.$scope.$new();
                    modalScope.invitesSent = function () {
                        this.get();
                    };
                    this.$scope.appEvent('show-modal', {
                        src: 'public/app/features/org/partials/invite.html',
                        modalClass: 'invite-modal',
                        scope: modalScope
                    });
                };
                OrgUsersCtrl.prototype.openProcessModal = function () {
                                    var modalScope = this.$scope.$new();
                                    modalScope.processSent = function () {
                                       this.get();
                                    };
                                    this.$scope.appEvent('show-modal', {
                                        src: 'public/app/features/org/partials/addProcess.html',
                                        modalClass: 'invite-modal',
                                        scope: modalScope

                                    });
                                };
             OrgUsersCtrl.prototype.openParentModal = function () {
                                                 var modalScope = this.$scope.$new();
                                                 modalScope.subProcessSent = function () {
                                                     this.get();
                                                 };
                                                 this.$scope.appEvent('show-modal', {
                                                     src: 'public/app/features/org/partials/addParentProcess.html',
                                                     modalClass: 'invite-modal',
                                                     scope: modalScope

                                                 });
                                             };
             OrgUsersCtrl.prototype.openMachineModal = function () {
                                                 var modalScope = this.$scope.$new();
                                                 modalScope.machineSent = function () {
                                                     this.get();
                                                 };
                                                 this.$scope.appEvent('show-modal', {
                                                     src: 'public/app/features/org/partials/addMachine.html',
                                                     modalClass: 'invite-modal',
                                                     scope: modalScope

                                                 });
                                             };
              OrgUsersCtrl.prototype.openMaintenanceModal = function () {
                                                               var modalScope = this.$scope.$new();
                                                               modalScope.maintenanceSent = function () {
                                                                   this.get();
                                                               };
                                                               this.$scope.appEvent('show-modal', {
                                                                   src: 'public/app/features/org/partials/addMaintenance.html',
                                                                   modalClass: 'invite-modal',
                                                                   scope: modalScope

                                                               });
                                                           };

OrgUsersCtrl.prototype.openPendingAlertModal = function (pendingAlert) {
     var modalScope = this.$scope.$new();
          this.$scope.appEvent('show-modal', {
          src: 'public/app/features/org/partials/addAction.html',
            modalClass: 'invite-modal',
             scope: modalScope
   });
        };

 OrgUsersCtrl.prototype.maintenanceAlertsSent = function (mAlert) {
         this.backendSrv.patch('/api/org/maintenanceAlerts/' + mAlert.id)
            };

OrgUsersCtrl.prototype.updateProcess = function (p) {
      var modalScope = this.$scope.$new(true);
         modalScope.process = p;
            this.$scope.appEvent('show-modal', {
            src: 'public/app/features/org/partials/update.html',

                      scope: modalScope

                         });
                          };

OrgUsersCtrl.prototype.getAlerts = function (alerts) {
var _this=this;
                    this.backendSrv.get('/api/org/maintenanceAlerts/get/' + alerts.interval)
                     .then(function (maintenanceAlert) {
                     _this.maintenanceAlert = maintenanceAlert;
                      });
                };


OrgUsersCtrl.prototype.openMaintenanceHistoryModal = function (mHistory) {
this.maintenanceHistorySent(mHistory);
     var modalScope = this.$scope.$new();
    this.$scope.alert =mHistory;

         this.$scope.appEvent('show-modal', {
          src: 'public/app/features/org/partials/addMaintenanceActivity.html',
            modalClass: 'invite-modal',
             scope: modalScope
   });
        };

 OrgUsersCtrl.prototype.maintenanceHistorySent = function (mHistory) {
         this.backendSrv.patch('/api/org/maintenanceHistory/' + mHistory.id)
            };

OrgUsersCtrl.prototype.getMaintenaneHistory = function (mHistory) {
var _this=this;
                    this.backendSrv.get('/api/org/maintenanceHistory/get/' + mHistory.interval)
                     .then(function (maintenanceHistoryByInterval) {
                     _this.maintenanceHistoryByInterval = maintenanceHistoryByInterval;
                      });
                };

                return OrgUsersCtrl;
            })();
            exports_1("OrgUsersCtrl", OrgUsersCtrl);
            core_module_1.default.controller('OrgUsersCtrl', OrgUsersCtrl);

        }
    }
});
//# sourceMappingURL=org_users_ctrl.js.map
