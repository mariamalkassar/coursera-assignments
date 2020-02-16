(function () {
        "use strict";

        angular.module('public')
            .service('UserService', UserService);

        UserService.$inject = ['$http', 'ApiPath'];

        function UserService($http, ApiPath) {
            var service = this;
            var user;

            service.setUser = function (current_user) {
                return $http({
                    method: "GET",
                    url: (ApiPath + '/menu_items/' + current_user.favItem + ".json")
                }).then(function (response) {
                    current_user.message = "Your information has been saved.";
                    user = current_user;
                })
                    .catch(function (errorResponse) {
                        user = undefined;
                        current_user.itemNotFound = "Unfortunately, this item [" + current_user.favItem + "] is not found";
                    });
            };
            service.getUser = function () {
                return user;
            };

            service.getUserInfo = function () {
                if (user !== undefined) {
                    return $http({
                        method: "GET",
                        url: (ApiPath + '/menu_items/' + user.favItem + ".json")
                    }).then(function (response) {
                        user = service.getUser();
                        user.menuItem = response.data;
                        // console.log("nNNNN",user);
                        return user;
                    });

                } else {
                    return undefined;
                }
            };

        }


    }

)();