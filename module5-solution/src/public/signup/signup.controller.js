(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['UserService'];

    function SignUpController(UserService) {
        var signUpCtrl = this;
        signUpCtrl.submit = function () {
            signUpCtrl.user.message = "";
            signUpCtrl.user.itemNotFound = "";
            UserService.setUser(signUpCtrl.user);
        };
    }
})();