(function () {
    'use strict';
    angular.module('MyApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('itemsList', foundItemsDirective);

    function foundItemsDirective() {
        return {
            templateUrl: "foundItems.html",
            scope: {
                items: '<',
                myTitle: '@title'
            },

        };
    }


    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var items = this;
        items.searchTerm = '';
        // Items.foundItems = [];
        items.getMatchedMenuItems = function (searchTerm) {
             items.foundItems = [
                {name: "cookies", short_name: 10},
                {name: "Apple", short_name: 5},
                {name: "Milk", short_name: 4},
                {name: "Lemon", short_name: 15},
                {name: "Tomato", short_name: 20},
            ];
             console.log("foundItems = ", items.foundItems);
            // var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
            //
            // promise.then(function (foundItems) {
            //     Items.foundItems = foundItems;
            //     console.log("foundItems = ", foundItems);
            // }).catch(function (error) {
            //     console.log("Something went terribly wrong.");
            // });
        }

    }

    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function (result) {
                var menu_items = result.data.menu_items;

                var foundItems = [];
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



