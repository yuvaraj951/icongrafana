define([
  'angular',
  'lodash',
],
function (angular) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('OrgEditSubProcess', function($http,$scope, $routeParams, backendSrv, $location,contextSrv) {

     $scope.init = function() {
        $scope.getSubProcess($routeParams.subProcessId);
        $scope.getAllProcess();
        $scope.getAllSubProcess();


    };

    $scope.getProcess = function(processId) {
          backendSrv.get('/api/org/process/edit/' + processId).then(function(process) {
            $scope.process = process;
           $scope.process_id = processId;


          });
        };

$scope.getSubProcess = function(subProcessId) {
          backendSrv.get('/api/org/subprocess/edit/' + subProcessId).then(function(subprocess) {
            $scope.subprocess = subprocess;
           $scope.sub_process_id = subProcessId;


          });
        };
$scope.getAllProcess = function() {
          backendSrv.get('/api/org/process').then(function(allprocess) {
            $scope.allprocess = allprocess;



          });
        };
$scope.getAllSubProcess = function() {
          backendSrv.get('/api/org/subprocess').then(function(allsubprocess) {
            $scope.allsubprocess = allsubprocess;

          });
        };
      $scope.updateSubProcess = function() {
           if (!$scope.updateSubForm.$valid) { return; }

           backendSrv.patch('/api/org/subprocess/' + $scope.sub_process_id, $scope.subprocess).then(function() {
             $location.path('/org/process');
           });
         };
     $scope.editSubProcess = function() {
                if (!$scope.editSubProcessForm.$valid) { return; }

                backendSrv.patch('/api/org/subprocess/' + $scope.sub_process_id, $scope.subprocess).then(function() {
                  $location.path('/org/process');
                });
              };
    $scope.init();

  });
});
