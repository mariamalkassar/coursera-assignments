(function () {
    'use strict';

    angular.module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .service('ShoppingListService', ShoppingListService)
        .directive('shoppingList', ShoppingListDirective);


    function ShoppingListDirective() {
        var ddo = {
            templateUrl: 'shoppingList.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }


    function ShoppingListDirectiveController() {
        var list = this;
    }


    ShoppingListController.$inject = ['ShoppingListService'];

    function ShoppingListController(ShoppingListService) {
        var list = this;

        list.searchTerm = '';
        list.foundItems = [];
        list.getMatchedMenuItems = function () {
            var promise = ShoppingListService.getMatchedMenuItems(list.searchTerm);
            promise.then(function (foundItems) {
                list.foundItems = foundItems;
                console.log("foundItems = ", list.foundItems);
            }).catch(function (error) {
                console.log("Something went terribly wrong.");
            });
        };

        list.removeItem = function (itemIndex) {
            alert("HHHHHHHHHHHHHHHHHHHHHHHi ");
            list.foundItems.splice(itemIndex, 1);
        };


    }


    ShoppingListService.$inject = ['$http'];

    function ShoppingListService($http) {
        var service = this;
        var foundItems = [];
        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function (result) {
                var menu_items = result.data.menu_items;
                for (var i = 0; i < menu_items.length; i++) {
                    // console.log(menu_items[i].description);
                    var description = menu_items[i].description;
                    if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                        foundItems.push(menu_items[i]);
                    }
                }
                return foundItems;
            });
        };
    }


})();
