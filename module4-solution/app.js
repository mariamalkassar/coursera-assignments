(function () {
    'use strict';

    angular.module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .service('MenuSearchService', MenuSearchService)
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


    ShoppingListController.$inject = ['MenuSearchService'];

    function ShoppingListController(MenuSearchService) {
        var items = this;
        items.searchTerm = '';
        items.foundItems = [];
        items.getMatchedMenuItems = function () {
            items.foundItems = [
                {name: 'mimi', short_name: "11", describtion: "tyryrty"},
                {name: 'mimi', short_name: "11", describtion: "tyryrty"},
                {name: 'mimi', short_name: "11", describtion: "tyryrty"},
                {name: 'mimi', short_name: "11", describtion: "tyryrty"},
            ]
            // var promise = MenuSearchService.getMatchedMenuItems(items.searchTerm);
            //
            // promise.then(function (foundItems) {
            //     items.foundItems = foundItems;
            //     console.log("foundItems = ", items.foundItems);
            // }).catch(function (error) {
            //     console.log("Something went terribly wrong.");
            // });
        };

        items.removeItem = function (itemIndex) {
            alert("HHHHHHHHHHHHHHHHHHHHHHHi ");
            items.foundItems.splice(itemIndex, 1);
        };
    }


// If not specified, maxItems assumed unlimited
    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
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
        service.removeItem = function (itemIndex) {
            foundItems.splice(itemIndex, 1);
        };


    }

})();
