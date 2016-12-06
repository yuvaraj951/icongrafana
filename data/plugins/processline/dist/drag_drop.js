'use strict';

System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      angular.module('grafana.directives').directive('ngDraggable', function ($document) {
        return {
          restrict: 'A',
          //templateUrl:'public/plugins/grafana-processline-panel/node.html',
          scope: {
            dragOptions: '=ngDraggable',
            chart: '=chart'
          },
          link: function link(scope, elem, attr) {

            var startX,
                startY,
                x = scope.chart.x,
                y = scope.chart.y,
                start,
                stop,
                drag,
                container;

            var width = elem[0].offsetWidth,
                height = elem[0].offsetHeight;

            // Obtain drag options
            if (scope.dragOptions) {
              start = scope.dragOptions.start;
              drag = scope.dragOptions.drag;
              stop = scope.dragOptions.stop;
              var id = scope.dragOptions.container;
              if (id) {
                container = document.getElementById(id).getBoundingClientRect();
              }
            }

            // Bind mousedown event
            elem.on('mousedown', function (e) {
              e.preventDefault();
              startX = e.clientX - elem[0].offsetLeft;
              startY = e.clientY - elem[0].offsetTop;
              $document.on('mousemove', mousemove);
              $document.on('mouseup', mouseup);
              if (start) start(e);
            });

            // Handle drag event
            function mousemove(e) {
              y = e.clientY - startY;
              x = e.clientX - startX;

              setPosition();
              if (drag) drag(e);
              scope.chart.x = x;
              scope.chart.y = y;
            }

            // Unbind drag events
            function mouseup(e) {
              $document.unbind('mousemove', mousemove);
              $document.unbind('mouseup', mouseup);
              scope.chart.x = x;
              scope.chart.y = y;
              if (stop) stop(e);
            }

            // Move element, within container if provided
            function setPosition() {
              if (container) {
                if (x < container.left) {
                  x = container.left;
                  scope.chart.x = x;
                } else if (x > container.right - width) {
                  x = container.right - width;
                  scope.chart.x = x;
                }
                if (y < container.top) {
                  y = container.top;
                  scope.chart.y = y;
                } else if (y > container.bottom - height) {
                  y = container.bottom - height;
                  scope.chart.y = y;
                }
              }

              elem.css({

                top: y + 'px',
                left: x + 'px'
              });
            }
          }
        };
      });
    }
  };
});
//# sourceMappingURL=drag_drop.js.map
