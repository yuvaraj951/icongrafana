define([
  'angular',
  'lodash',
],
function (angular, _) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('UserInviteCtrl', function($scope, $routeParams,backendSrv) {

    $scope.invites = [
      {name: '', email: '', role: 'Editor'},
    ];
    $scope.process = [
          {processName: '', parentProcessName: '', updatedBy: ''},
        ];
        $scope.machines = [
                  {machineName: '', description: '', updatedBy: '',vendor:''},
                ];
         $scope.maintenances = [
                           {component: '', parameter: '', message: '', interval: ''},
                         ];
$scope.subprocess = [
          {processName: '', subProcessName: '', updatedBy: ''},
        ];
        $scope.malfunalert_activity = [
                  {name: '', message: ''},
                ];
         $scope.maintenance_activity = [
                          {name: '', message: ''},
                        ];
    $scope.options = {skipEmails: false};
    $scope.init = function() {
       $scope.getProcess();

    };

 $scope.getProcess = function() {
           backendSrv.get('/api/org/parent' ).then(function(parent) {
             $scope.parent = parent;

           });
         };

    $scope.addInvite = function() {
      $scope.invites.push({name: '', email: '', role: 'Editor'});
    };
    $scope.addProcess = function() {
          $scope.process.push({processName: '', updatedBy: ''});
        };
        $scope.addMachine = function() {
                  $scope.machines.push({machineName: '', description: '', updatedBy: '',vendor:''});
                };
     $scope.addMaintenance = function() {
                       $scope.maintenances.push({machineId: '', instruction: '', component: ''});
                     };
    $scope.removeInvite = function(invite) {
      $scope.invites = _.without($scope.invites, invite);
    };

    $scope.sendInvites = function() {
      if (!$scope.inviteForm.$valid) { return; }
      $scope.sendSingleInvite(0);
    };
    $scope.sendSingleInvite = function(index) {
      var invite = $scope.invites[index];
      invite.skipEmails = $scope.options.skipEmails;

      return backendSrv.post('/api/org/invites', invite).finally(function() {
        index += 1;

        if (index === $scope.invites.length) {
          $scope.invitesSent();
          $scope.dismiss();
        } else {
          $scope.sendSingleInvite(index);
        }
      });

     };

      $scope.sendProcess = function(p) {
      if (!$scope.processForm.$valid) { return; }
      $scope.sendSingleInvite1(0);
      };
     $scope.sendSingleInvite1 = function(index1) {
      var process = $scope.process[index1];
      process.skipEmails = $scope.options.skipEmails;

      return backendSrv.post('/api/org/process', process).then(function() {

        index1 += 1;

        if (index1 === $scope.process.length) {
          $scope.processSent();
          $scope.dismiss();

        } else {
          $scope.sendSingleInvite1(index1);
        }
      });

    };
      $scope.sendMachine = function() {
           if (!$scope.machineForm.$valid) { return; }
           $scope.sendSingleInvite2(0);
           };
          $scope.sendSingleInvite2 = function(index2) {
           var machines = $scope.machines[index2];
           machines.skipEmails = $scope.options.skipEmails;

           return backendSrv.post('/api/org/machine', machines).finally(function() {
             index2 += 1;

             if (index2 === $scope.machines.length) {
               $scope.machineSent();
               $scope.dismiss();
             } else {
               $scope.sendSingleInvite2(index2);
             }
           });

         };



$scope.sendMaintenance = function() {
           if (!$scope.maintenanceForm.$valid) { return; }
           $scope.sendSingleInvite3(0);
           };
          $scope.sendSingleInvite3 = function(index3) {
           var maintenances = $scope.maintenances[index3];
           maintenances.skipEmails = $scope.options.skipEmails;

           return backendSrv.post('/api/org/maintenance', maintenances).finally(function() {
             index3 += 1;

             if (index3 === $scope.maintenances.length) {
               $scope.maintenanceSent();
               $scope.dismiss();
             } else {
               $scope.sendSingleInvite3(index3);
             }
           });

         };

$scope.sendUpdate = function() {
           if (!$scope.updateForm.$valid) { return; }
           $scope.sendSingleInvite4(0);
           };
          $scope.sendSingleInvite4 = function(index4) {
           var process = $scope.process[index4];
           process.skipEmails = $scope.options.skipEmails;

             backendSrv.put('/api/org/process/' + process.processId,process).finally(function() {
             index += 1;

             if (index === $scope.process.length) {
               $scope.processSent();
               $scope.dismiss();
             } else {
               $scope.sendSingleInvite4(index4);
             }
           });

         };

  $scope.sendParentProcess = function(sp) {
      if (!$scope.parentProcessForm.$valid) { return; }
      $scope.sendSingleInvite4(0);
      };
     $scope.sendSingleInvite4 = function(index4) {
      var subprocess = $scope.subprocess[index4];
      subprocess.skipEmails = $scope.options.skipEmails;

      return backendSrv.post('/api/org/subprocess', subprocess).finally(function() {
        index4 += 1;

        if (index4 === $scope.subprocess.length) {
          $scope.subProcessSent();
          $scope.dismiss();
        } else {
          $scope.sendSingleInvite4(index4);
        }
      });

    };
 $scope.sendMaintenanceUpdate = function() {
               if (!$scope.userActionForm.$valid) { return; }
               $scope.sendSingleInvite5(0);
               };
              $scope.sendSingleInvite5 = function(index5) {
               var malfunalert_activity = $scope.malfunalert_activity[index5];
               malfunalert_activity.skipEmails = $scope.options.skipEmails;
               var id=malfunalert_activity.id;

               return backendSrv.post('/api/org/maintenanceAlertsUser', malfunalert_activity).finally(function() {
                  $scope.maintenanceAlertsSent();
                });
             };

$scope.sendMaintenanceActivity = function() {
               if (!$scope.maintenanceActionForm.$valid) { return; }
               $scope.sendSingleInvite6(0);
               };
              $scope.sendSingleInvite6 = function(index6) {
               var maintenance_activity= $scope.maintenance_activity[index6];
               maintenance_activity.skipEmails = $scope.options.skipEmails;

               return backendSrv.post('/api/org/maintenanceActivity', maintenance_activity).finally(function() {
                  $scope.maintenanceHistorySent();
                });
             };
  });
});
