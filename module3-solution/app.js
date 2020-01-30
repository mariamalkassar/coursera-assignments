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
                lists: '<',
                onRemove: '&'
            }
        };

        return ddo;
    }


    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var items = this;
        items.searchTerm = '';
        items.foundItems = [];
        items.getMatchedMenuItems = function (searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            promise.then(function (foundItems) {
                items.foundItems = foundItems;
                console.log("foundItems = ", items.foundItems);
            }).catch(function (error) {
                console.log("Something went terribly wrong.");
            });
        };

        items.removeItem = function () {
            alert("HHHHHHHHHHHHHHHHHHHHHHHi ");
            console.log("Remove item index ==");
            // this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
            // MenuSearchService.removeItem(itemIndex);

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



