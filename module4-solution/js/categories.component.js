(function () {
    'use strict';
    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'templates/display_categories.template.html',
            bindings: {
                items: '<'
            }
        });
})();



