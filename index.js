'use strict';
angular.module('app', [])

.controller('MainCtrl', function($scope, $http) {
    $http.get('data.json').then(function(resp) {
        $scope.data = {};
        $scope.selected = {};

        Object.keys(resp.data).forEach(function(key) {
            $scope.data[key] = resp.data[key].map(function(text, index) {
                return {index: index, text: text};
            });
        });
    });
})

.directive('combobox', function() {
    return {
        scope: {
            placeholder: '@',
            items: '=',
            selectedItem: '=ngModel'
        },
        require: 'ngModel',
        restrict: 'C',
        templateUrl: 'combobox.tpl.html',
        link: function(scope) {
            scope.select = function(item, e) {
                e.preventDefault();
                scope.selectedItem = item;
                scope.active = false;
            };

            scope.keydown = function(e) {
                if (e.keyCode === 38/*ArrowUp*/) {
                    selectNext(-1, scope.items.length - 1);
                } else if (e.keyCode === 40/*ArrowDown*/) {
                    selectNext(+1, 0);
                } else if (e.keyCode === 27/*Escape*/) {
                    scope.active = false;
                }
            };

            function selectNext(dir, defaultIndex) {
                var index = scope.items.indexOf(scope.selectedItem);
                var nextIndex = index === -1 ? defaultIndex : (index + dir + scope.items.length) % scope.items.length;
                scope.selectedItem = scope.items[nextIndex];
                scope.active = true;
            }
        }
    };
});
