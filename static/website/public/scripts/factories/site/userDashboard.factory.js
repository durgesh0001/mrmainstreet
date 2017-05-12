(function() {
    'use strict';
    /**
     * mrmainstreet Factory
     * Created by:durgesh ahirwar
     * Created On: 05-05-2017
     */

    angular
        .module('mrmainstreet')
        .factory('userDashboardFactory', userDashboardFactory);
    //Inject required modules to factory method
    userDashboardFactory.$inject = ['$http', 'CONST', '$location', '$rootScope', 'ngNotify', 'SweetAlert', '$window', 'mrmainstreetFactory'];
    /**
     * @name mrmainstreetFactory
     * @desc Contains all methods to used for all application
     * @param $http
     * @param CONST
     * @param $location
     * @param $mdToast
     * @constructor
     */
    function userDashboardFactory($http, CONST, $location, $rootScope, ngNotify, SweetAlert, $window, mrmainstreetFactory) {
        var userDashboardObj = {
            /**
             * @name isLoggedIn
             * @desc Methods to check user is authenticated or not
             * @returns {*}
             */
            isLoggedIn: function() {
                if ($window.localStorage.getItem("token")) {
                    userDashboardObj.isLogin = true;
                    userDashboardObj.isValidUser();

                } else {
                    $location.path('/');
                    userDashboardObj.isLogin = false;
                }
            },
            isValidUser: function() {
                return $http.get(CONST.CONFIG.BASE_URL + 'webservices/v1/users/' + $window.localStorage.getItem('id') + '/?format=json', {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    })

                    .then(function(result) {
                        var response = mrmainstreetFactory.checkHTTPResponse(result);

                    }, function(response) {
                        mrmainstreetFactory.logout();

                    })
            }


        }
        return userDashboardObj;
    }
})();