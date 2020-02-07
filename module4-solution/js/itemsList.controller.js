(function () {
    'use strict';
    angular.module('MenuApp')
        .controller('ItemListController', ItemListController);

    ItemListController.$inject = ['itemsForCategory'];

    function ItemListController(itemsForCategory) {
        var itemDetails = this;
        itemDetails.itemCatergory = itemsForCategory.data;
    }

})();



