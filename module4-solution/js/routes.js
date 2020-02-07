(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.template.html'
            })

            .state('categories', {
                url: '/categories',
                templateUrl: 'templates/categories.template.html',
                controller: 'CategoriesController as categoriesList',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        var promise = MenuDataService.getAllCategories ();
                        return promise;
                    }]
                }
            })
            .state('items_list', {
                url: '/items_list/{shortName}',
                templateUrl: 'templates/items_list.template.html',
                controller: 'ItemListController as itemList',
                resolve: {
                    itemsForCategory: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        var promise = MenuDataService.getItemsForCategory($stateParams.shortName);
                        return promise;
                    }]
                }
            });

    }

})();
