define([
  'angular',
  'lodash',
],
function (angular) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('OrgEditMachine', function($http,$scope, $routeParams, backendSrv, $location,contextSrv) {

     $scope.init = function() {
        $scope.getMachine($routeParams.machineId);


    };

    $scope.getMachine = function(machineId) {
          backendSrv.get('/api/org/machine/edit/' + machineId).then(function(machine) {
            $scope.machine = machine;
           $scope.machine_id = machineId;


          });
        };




      $scope.updateMachine = function() {
           if (!$scope.updateMachineForm.$valid) { return; }

           backendSrv.patch('/api/org/machine/' + $scope.machine_id, $scope.machine).then(function() {
             $location.path('/org/process');
           });
         };

    $scope.init();

  });
});
