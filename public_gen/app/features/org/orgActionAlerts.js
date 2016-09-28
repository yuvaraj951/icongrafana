define([
  'angular',
  'lodash',
],
function (angular) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('OrgActionAlerts', function($http,$scope, $routeParams, backendSrv, $location,contextSrv) {

     $scope.init = function() {
        $scope.getAlerts($routeParams.Id);


    };

    $scope.getAlerts = function(id) {
          backendSrv.get('/api/org/alerts/pending/action/' +id).then(function(pendingActionAlert) {
            $scope.pendingActionAlert = pendingActionAlert;
           $scope.pendingActionAlert_id = id;


          });
        };




      $scope.updateAlertAction = function() {
           if (!$scope.updateAlertActionForm.$valid) { return; }

           backendSrv.patch('/api/org/alerts/pending/' + $scope.pendingActionAlert_id, $scope.pendingActionAlert).then(function() {
             $location.path('/org/alerts');
           });
         };

    $scope.init();

  });
});
