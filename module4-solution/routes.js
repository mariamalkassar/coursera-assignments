(function () {
    'use strict';

    angular.module('MyApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider
        // Home page
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.template.html'
            })

            .state('categories', {
                url: '/categories',
                templateUrl: 'templates/categories.template.html',
                controller: 'CategoriesController as categoriesList',
                resolve: {
                    items: ['RestaurantService', function (RestaurantService) {
                        var promise = RestaurantService.getAllCategories ();
                        return promise;
                    }]
                }
            })
            .state('items_list', {
                url: '/items_list/{shortName}',
                templateUrl: 'templates/items_list.template.html',
                controller: 'ItemListController as itemList',
                resolve: {
                    itemsForCategory: ['$stateParams', 'RestaurantService', function ($stateParams, RestaurantService) {
                        var promise = RestaurantService.getItemsForCategory($stateParams.shortName);
                        return promise;
                    }]
                }
            });

    }

})();
