(function () {
    'use strict';

    angular.module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .service('ShoppingListservice', ShoppingListservice)
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

    }


    ShoppingListController.$inject = ['ShoppingListservice'];

    function ShoppingListController(ShoppingListservice) {
        var list = this;
        list.getMatchedMenuItems = function () {
            list.founded = ShoppingListservice.getItems();
        }


        list.removeItem = function (itemIndex) {
            alert("rrrrrrrrrrrrrrrrrr");
            ShoppingListservice.removeItem(itemIndex);
        };
    }


// If not specified, maxItems assumed unlimited
    ShoppingListservice.$inject = ['$http'];

    function ShoppingListservice($http) {
        var service = this;

        // List of shopping items
        var founded = [
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
        ];


        service.removeItem = function (itemIndex) {
            founded.splice(itemIndex, 1);
        };

        service.getItems = function () {
            return founded;
        };
    }

})();
