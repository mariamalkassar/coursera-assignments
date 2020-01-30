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
                founditems: '<',
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
        list.getMatchedMenufounditems = function () {
            console.log("22222")
            list.founditems = ShoppingListservice.getfounditems();
            console.log(list.founditems);
        }


        list.removeItem = function (itemIndex) {
            alert("rrrrrrrrrrrrrrrrrr");
            ShoppingListservice.removeItem(itemIndex);
        };
    }

    function ShoppingListservice() {
        var service = this;

        // List of shopping founditems
        var founditems = [
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
            {name: 'mariam', short_name: 'AA', describtion: '21321'},
        ];


        service.removeItem = function (itemIndex) {
            founditems.splice(itemIndex, 1);
        };

        service.getfounditems = function () {
            return founditems;
        };
    }

})();
