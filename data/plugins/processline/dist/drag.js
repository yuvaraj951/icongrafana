'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var app;
  return {
    setters: [],
    execute: function () {
      app = angular.module('myApp', []);


      app.controller('myController', function ($scope) {});

      app.directive('ngDraggable', function ($document, $window) {
        function makeDraggable(scope, element, attr) {
          var startX = 0;
          var startY = 0;

          // Start with a random pos
          var x = Math.floor(Math.random() * 500 + 40);
          var y = Math.floor(Math.random() * 360 + 40);

          element.css({
            position: 'absolute',
            cursor: 'pointer',
            top: y + 'px',
            left: x + 'px'
          });

          element.on('mousedown', function (event) {
            event.preventDefault();

            startX = event.pageX - x;
            startY = event.pageY - y;

            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
          });

          function mousemove(event) {
            y = event.pageY - startY;
            x = event.pageX - startX;

            element.css({
              top: y + 'px',
              left: x + 'px'
            });
          }

          function mouseup() {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
          }
        }
        return {
          link: makeDraggable
        };
      });

      _export('default', myApp);
    }
  };
});
//# sourceMappingURL=drag.js.map
