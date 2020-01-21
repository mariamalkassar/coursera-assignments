(function () {
    'use strict';
    angular.module('MyApp', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var itemsToBuy = this;
        itemsToBuy.items_to_buy_list = ShoppingListCheckOffService.grtToBuyItems();
        itemsToBuy.buyItemNow = function (item_index) {
            try {
                ShoppingListCheckOffService.buyItemNow(item_index);
            } catch (error) {
                itemsToBuy.errorMessageLC = error.message;
            }

        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var itemsBought = this;
        itemsBought.items_bought_list = ShoppingListCheckOffService.grtItemsBought();
        itemsBought.checkItemsBoughtList = function () {
            return ShoppingListCheckOffService.checkItemsBoughtList();
        };


    }

    function ShoppingListCheckOffService() {
        var service = this;
        var items_bought_list = [];
        var items_to_buy_list = [
            {name: "cookies", quantity: 10},
            {name: "Apple", quantity: 5},
            {name: "Milk", quantity: 4},
            {name: "Lemon", quantity: 15},
            {name: "Tomato", quantity: 20},
        ];
        service.grtToBuyItems = function () {
            return items_to_buy_list;
        };
        service.grtItemsBought = function () {
            return items_bought_list;
        };

        service.buyItemNow = function (item_index) {
            items_bought_list.push(items_to_buy_list[item_index]);
            items_to_buy_list.splice(item_index, 1);
            if (items_to_buy_list.length == 0) {
                throw new Error("Everything is bought!");
            }
        };

        service.checkItemsBoughtList = function () {
            if (items_bought_list.length == 0) {
                return true;
            }
            return false;
        };
    }
})();



