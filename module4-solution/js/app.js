(function () {
    'use strict';
    angular.module('MyApp', ['ui.router','Spinner'])
        .controller('CategoriesController', CategoriesController)
        .controller('ItemListController', ItemListController)
        .service('RestaurantService', RestaurantService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .component('categories', {
            templateUrl: '../templates/display_categories.template.html',
            bindings: {
                items: '<'
            }
        })
        .component('itemsOfCategory', {
            templateUrl: '../templates/display_categories_items.template.html',
            bindings: {
                itemsList: '<'
            }
        });

    CategoriesController.$inject = ['items'];

    function CategoriesController(items) {
        var list = this;
        list.c_items = items.data;
    }

    ItemListController.$inject = ['itemsForCategory'];

    function ItemListController(itemsForCategory) {
        var itemDetails = this;
        itemDetails.itemCatergory = itemsForCategory.data;
    }


    RestaurantService.$inject = ['$http', 'ApiBasePath'];

    function RestaurantService($http, ApiBasePath) {
        var service = this;
        var categories = [];
        //
        service.getAllCategories = function () {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            });
        };

        service.getItemsForCategory = function (shortName) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
                params: {category: shortName}
            });


        }

    }
})();



