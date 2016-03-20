'use strict';
angular.module('app', [])

.controller('MainCtrl', function($scope, $http) {
    $http.get('data.json').then(function(resp) {
        $scope.data = {};
        Object.keys(resp.data).forEach(function(key) {
            $scope.data[key] = resp.data[key].map(function(text) {
                return {text: text};
            });
        });
    });
})

.directive('combobox', function() {
    return {
        scope: {
            placeholder: '@',
            items: '='
        },
        restrict: 'C',
        templateUrl: 'combobox.tpl.html',
        link: function(scope) {
            scope.selectItem = null;

            scope.select = function(item) {
                scope.selectedItem = item;
            };

            scope.keydown = function(e) {
                console.log(e);
                if (e.code === 'ArrowUp') {
                    selectNext(-1, scope.items.length);
                } else if (e.code === 'ArrowDown') {
                    selectNext(+1, 0);
                } else if (e.code === 'Enter' || e.code === 'Escape') {
                    e.target.blur();
                }
            };

            function selectNext(dir, defaultIndex) {
                var index = scope.items.indexOf(scope.selectedItem);
                var nextIndex = index === -1 ? defaultIndex : (index + dir + scope.items.length) % scope.items.length;
                scope.select(scope.items[nextIndex]);
            }
        }
    };
});
