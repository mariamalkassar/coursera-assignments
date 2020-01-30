(function () {
    'use strict';
    angular.module('MyApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItemsTemplate.html',
            scope: {
                items: '<',
                onRemove: '&',
            },
            controller: NarrowItDownDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function NarrowItDownDirectiveController() {
        var list = this;


    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var list = this;
        list.searchTerm = '';
        list.foundItems = [];
        list.getMatchedMenuItems = function (searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            promise.then(function (foundItems) {
                list.foundItems = foundItems;
                console.log("foundItems = ", list.foundItems);
            }).catch(function (error) {
                console.log("Something went terribly wrong.");
            });
        };

        list.removeItem = function (itemIndex) {
            console.log("Remove item index ==", itemIndex);
            // this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
            MenuSearchService.removeItem(itemIndex);

        };

    }

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



