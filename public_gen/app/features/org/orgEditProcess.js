define([
  'angular',
  'lodash',
],
function (angular) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('OrgEditProcess', function($http,$scope, $routeParams, backendSrv, $location,contextSrv) {

     $scope.init = function() {
        $scope.getProcess($routeParams.processId);
        $scope.getSubProcess($routeParams.subProcessId);
        $scope.getAllProcess();


    };

    $scope.getProcess = function(processId) {
          backendSrv.get('/api/org/process/edit/' + processId).then(function(process) {
            $scope.process = process;
           $scope.process_id = processId;
           $scope.getSubProcessByName(process.processName);

          });
        };

$scope.getSubProcess = function(subProcessId) {
          backendSrv.get('/api/org/subprocess/edit/' + subProcessId).then(function(subprocess) {
            $scope.subprocess = subprocess;
           $scope.sub_process_id = subProcessId;


          });
        };

        $scope.getSubProcessByName = function(processName) {
                  backendSrv.get('/api/org/subprocess/get/' + processName).then(function(subprocesses) {
                    $scope.subprocesses = subprocesses;
                   $scope.processName = processName;


                  });
                };
$scope.getAllProcess = function() {
          backendSrv.get('/api/org/process').then(function(allprocess) {
            $scope.allprocess = allprocess;



          });
        };

      $scope.update = function() {
           if (!$scope.updateForm.$valid) { return; }

           backendSrv.patch('/api/org/process/' + $scope.process_id, $scope.process).then(function() {
             $location.path('/org/process');
           });
         };

    $scope.init();

  });
});
