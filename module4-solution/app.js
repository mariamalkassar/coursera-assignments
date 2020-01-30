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
                onRemove: '&',
                emptyList: '<'
            },
            controller: NarrowItDownDirectiveController,
            controllerAs: 'ctrl',
            bindToController: true,
        };

        return ddo;
    }


    function NarrowItDownDirectiveController() {

    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var items = this;
        items.searchTerm = '';
        items.foundItems = [];
        items.getMatchedMenuItems = function () {

            if (items.searchTerm !== '') {
                var promise = MenuSearchService.getMatchedMenuItems(items.searchTerm);
                promise.then(function (foundItems) {
                    items.foundItems = foundItems;
                    if (items.foundItems.length !== 0) {
                        items.empty_list = false;
                    } else {
                        items.empty_list = true;
                    }
                    console.log('items.foundItems=', items.foundItems);
                }).catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
            } else {
                items.foundItems = [];
                items.empty_list = true;
            }

        };

        items.remove = function (itemIndex) {
            items.foundItems.splice(itemIndex, 1);
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



