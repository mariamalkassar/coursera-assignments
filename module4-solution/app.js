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
        var list = this;

        list.cookiesInList = function () {
            for (var i = 0; i < list.items.length; i++) {
                var name = list.items[i].name;
                if (name.toLowerCase().indexOf("cookie") !== -1) {
                    return true;
                }
            }

            return false;
        };
    }


    ShoppingListController.$inject = ['ShoppingListservice'];

    function ShoppingListController(ShoppingListservice) {
        var list = this;
        list.getMatchedMenuItems = function () {
            console.log("22222")
            list.founded = ShoppingListservice.getItems();
            console.log(list.founded);
        }


        list.removeItem = function (itemIndex) {
            alert("rrrrrrrrrrrrrrrrrr");
            ShoppingListservice.removeItem(itemIndex);
        };
    }

    function ShoppingListservice() {
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
