define([
  'angular',
  'lodash',
],
function (angular) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('OrgEditMaintenance', function($http,$scope, $routeParams, backendSrv, $location,contextSrv) {

     $scope.init = function() {
        $scope.getMaintenance($routeParams.Id);


    };

    $scope.getMaintenance= function(Id) {
          backendSrv.get('/api/org/maintenance/edit/' + Id).then(function(maintenance) {
            $scope.maintenance = maintenance;
           $scope.maintenance_id = Id;


          });
        };




      $scope.updateMaintenance= function() {
           if (!$scope.updateMaintenanceForm.$valid) { return; }

           backendSrv.patch('/api/org/maintenance/' + $scope.maintenance_id, $scope.maintenance).then(function() {
             $location.path('/org/process');
           });
         };

    $scope.init();

  });
});
