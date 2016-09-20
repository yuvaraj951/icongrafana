define([
  'angular',
],
function (angular) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('OrgAlertsCtrl', function($scope, $http, backendSrv) {

    $scope.init = function() {
      $scope.getMaintenanceAlerts();
    };

    $scope.getMaintenanceAlerts = function() {
      backendSrv.get('/api/org/maintenanceAlerts').then(function(maintenanceAlerts) {
        $scope.maintenanceAlerts = maintenanceAlerts;
      });
    };
     $scope.updateUserAction = function() {
               if (!$scope.userActionForm.$valid) { return; }
               $scope.sendSingleInvite2(0);
               };
              $scope.sendSingleInvite2 = function(index2) {
               var alerts = $scope.alerts[index2];
               alerts.skipEmails = $scope.options.skipEmails;

               return backendSrv.post('/api/org/maintenanceAlertsUser', alerts).finally(function() {
                 index2 += 1;

                 if (index2 === $scope.alerts.length) {
                   $scope.machineSent();
                   $scope.dismiss();
                 } else {
                   $scope.sendSingleInvite2(index2);
                 }
               });

             };

    $scope.init();
  });
});
