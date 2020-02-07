(function () {
    'use strict';
    angular.module('MenuApp')
        .controller('CategoriesController', CategoriesController);
    CategoriesController.$inject = ['items'];

    function CategoriesController(items) {
        var list = this;
        list.c_items = items.data;
    }
})();



