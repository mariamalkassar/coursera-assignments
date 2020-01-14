(function () {
    var myapp = angular.module('myApp', []);
    myapp.controller('LunchCheckController', LunchCheckController);
    myapp.filter('removeEmptyItems', removeEmptyItems);

    function removeEmptyItems() {
        return function (array) {
            var filteredArray = [];
            angular.forEach(array, function (item) {
                if ((item !== '') && (item !== ' ')) filteredArray.push(item);
            });
            return filteredArray;
        };
    }

    LunchCheckController.$inject = ['$scope', '$filter'];

    function LunchCheckController($scope, $filter) {
        $scope.items = '';
        $scope.message = '';
        $scope.hint = '';
        $scope.color = '';
        $scope.bordercolor = '';

        // Lunch dishes do not have an empty items
        function NoneEmpty(arr) {
            return arr.indexOf("") === -1 && arr.indexOf(" ") === -1;
        }

        // Lunch dishes contain at list one item
        function contain_items(arr) {
            for (var i = 0; i < arr.length; i++) {
                if ((arr[i] != '') && (arr[i] != ' ')) {
                    return true;
                }

            }
            return false;
        }
// , , , , ,,  ,, , , ,
        $scope.check_items_number = function () {
            var items = $scope.items.split(',');
            var none_empty_items = NoneEmpty(items);
            var contain_at_least_one_item = contain_items(items);
            if ($scope.items === '') {
                $scope.message = "Please enter data first";
                $scope.hint = '';
                $scope.color = '#ff0000';
                $scope.bordercolor = '#ff0000';
            } else if ((!none_empty_items) && (!contain_at_least_one_item)) { //If there is an empty item (and) there is no items at all
                $scope.message = 'We do NOT consider an empty item. Please try again';
                $scope.hint = '';
                $scope.color = '#ff0000';
                $scope.bordercolor = '#ff0000';
            } else if ((!none_empty_items) && (contain_at_least_one_item)) { // If there is an empty item (and) there is at least one item
                var filtered_items = $filter('removeEmptyItems')(items);
                var filtered_items_len = filtered_items.length;
                if (filtered_items_len <= 3) {
                    $scope.message = 'Enjoy!';
                    $scope.hint = "we did NOT consider the empty items.";
                    $scope.color = '#00ff00';
                    $scope.bordercolor = '#00ff00';
                } else if (filtered_items_len > 3) {
                    $scope.message = 'Too much!';
                    $scope.hint = "we did NOT consider the empty items.";
                    $scope.color = '#00ff00';
                    $scope.bordercolor = '#00ff00';
                }
            } else if (none_empty_items) { // If Lunch dishes do Not contain any empty item
                var items_len = items.length;
                if (items_len <= 3) {
                    $scope.message = 'Enjoy!. ';
                    $scope.hint = '';
                    $scope.color = '#00ff00';
                    $scope.bordercolor = '#00ff00';
                } else if (items_len > 3) {
                    $scope.message = 'Too much!. ';
                    $scope.hint = '';
                    $scope.color = '#00ff00';
                    $scope.bordercolor = '#00ff00';
                }
            }
        }
    }
})();



