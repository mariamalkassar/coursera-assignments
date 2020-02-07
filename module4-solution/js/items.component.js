(function () {
    'use strict';
    angular.module('MenuApp')
        .component('itemsOfCategory', {
            templateUrl: 'templates/display_categories_items.template.html',
            bindings: {
                itemsList: '<'
            }
        });
})();



