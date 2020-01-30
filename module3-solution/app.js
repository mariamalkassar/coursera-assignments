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
                itemsFound: '<'
            },
            controller: NarrowItDownDirectiveController,
            controllerAs: 'Items',
            bindToController: true,
        };


    }


    function NarrowItDownDirectiveController() {
        var Items = this;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var Items = this;
        Items.searchTerm = '';
        Items.foundItems = [];
        Items.getMatchedMenuItems = function (searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            promise.then(function (foundItems) {
                Items.foundItems = foundItems;
                console.log("foundItems = ", foundItems);
            }).catch(function (error) {
                console.log("Something went terribly wrong.");
            });
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



