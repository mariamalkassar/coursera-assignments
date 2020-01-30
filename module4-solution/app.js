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
                lines: '<',
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
            console.log("22222")
            list.lines1 = ShoppingListservice.getItems();
            console.log(list.lines);
        }


        list.removeItem = function (itemIndex) {
            alert("rrrrrrrrrrrrrrrrrr");
            ShoppingListservice.removeItem(itemIndex);
        };
    }

    function ShoppingListservice() {
        var service = this;

        // List of shopping items
        var lines1 = [
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
        ];


        service.removeItem = function (itemIndex) {
            lines1.splice(itemIndex, 1);
        };

        service.getItems = function () {
            return lines1;
        };
    }

})();
