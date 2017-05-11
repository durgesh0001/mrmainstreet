(function() {
    'use strict';
    /**
     * mrmainstreet Factory
     * Created by: Pankaj Birle (SIPL)
     * Created On: 27-07-2016
     */

    angular
        .module('mrmainstreet')
        .factory('mrmainstreetFactory', mrmainstreetFactory);
    //Inject required modules to factory method
    mrmainstreetFactory.$inject = ['$http', 'CONST', '$location', '$rootScope', 'ngNotify', 'SweetAlert', '$window'];
    /**
     * @name mrmainstreetFactory
     * @desc Contains all methods to used for all application
     * @param $http
     * @param CONST
     * @param $location
     * @param $mdToast
     * @constructor
     */
    function mrmainstreetFactory($http, CONST, $location, $rootScope, ngNotify, SweetAlert, $window) {
        var mrmainstreetObj = {
            /**
             * @name isLoggedIn
             * @desc Methods to check user is authenticated or not
             * @returns {*}
             */
            isLoggedIn: function() {
                if ($window.localStorage.getItem("token")) {
                    mrmainstreetObj.isLogin = true;
                    if($location.path() == "/how-it-works")
                    {
                    }
                    else
                    {
                     $location.path('/user-dashboard');
                    }

                } else {
                    mrmainstreetObj.isLogin = false;
                }
            },

            logout: function() {
                $window.localStorage.removeItem('token');
                $window.localStorage.removeItem('id');
                $window.localStorage.removeItem('loginUserRecord');
                $window.localStorage.removeItem('firstName');
                $location.path('/');
            },

            /**
             * @name checkHTTPResponse
             * @desc checkHTTPResponse
             * @returns {*}
             */
            checkHTTPResponse: function(response) {

                if (response.status == 200 && typeof response.data === 'object') {
                    /* Show error messages  */
                    if (response.data.status == false && typeof response.data.error != 'undefined' && response.data.error.length > 0) {
                        var errorMsg = '';
                        angular.forEach(response.data.error, function(val) {
                            errorMsg += val + " <br />";
                        })
                        mrmainstreetObj.showMessage(errorMsg, 'error');
                    }
                    return response.data

                } else {
                    mrmainstreetObj.showMessage(CONST.COMMON_ERROR, 'error');

                }
            },
            /**
             * @name isSuperadminLoggedIn
             * @desc Methods to check user is authenticated or not
             * @returns {*}
             */
            isSuperadminLoggedIn: function() {

            },

            /**
             * @name getLoanPurpose
             * @desc getloan purpose
             * @returns {*}
             */
            getLoanPurpose: function() {

                return $http.get(CONST.CONFIG.BASE_URL + 'webservices/v1/loanpurpose/?format=json', {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    })
                    .then(function(result) {
                        var response = mrmainstreetObj.checkHTTPResponse(result);
                        if (response.results.length > 0) {
                            mrmainstreetObj.loanPurpose = response.results;

                        }

                    }, function(response) {
                        mrmainstreetObj.showMessage(CONST.MSG.COMMON_ERROR, 'error');

                    })
            },
                       /**
             * @name getLoanPurpose
             * @desc getloan purpose
             * @returns {*}
             */
            getLoanQuestions: function() {

                return $http.get(CONST.CONFIG.BASE_URL + 'webservices/v1/questions/?format=json', {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    })
                    .then(function(result) {
                        var response = mrmainstreetObj.checkHTTPResponse(result);
                        if (response.results.length > 0) {
                            mrmainstreetObj.loanQuestions = response.results;

                        }

                    }, function(response) {
                        mrmainstreetObj.showMessage(CONST.MSG.COMMON_ERROR, 'error');

                    })
            },

            /**
             * @name userRegistration
             * @desc Methods for userRegistration
             * @returns {*}
             */

            userRegistration: function(formData) {
                return $http({
                    url: CONST.CONFIG.BASE_URL + 'webservices/v1/userregistration/',
                    method: "POST",
                    data: $.param(formData)
                }).then(function(result) {
                    var response = mrmainstreetObj.checkHTTPResponse(result);
                    if (response.status == "ERROR") {
                        mrmainstreetObj.showMessage(response.message, 'error');
                    } else {
                        if (response.data) {
                            mrmainstreetObj.loginData = response.data;
                            $window.localStorage.setItem("loginUserRecord", response.data);
                            $window.localStorage.setItem("firstName", response.data.first_name);
                            $window.localStorage.setItem("token", response.data.token);
                            $window.localStorage.setItem("id", response.data.id);
                            mrmainstreetObj.showMessage(response.message, 'success');
                            $location.path('/user-dashboard');
                        }
                    }

                }, function(response) {
                    mrmainstreetObj.showMessage(CONST.MSG.COMMON_ERROR, 'error');
                })

            },
            /**
             * @name userRegistration
             * @desc Methods for userRegistration
             * @returns {*}
             */

            login: function(formData) {
                return $http({
                    url: CONST.CONFIG.BASE_URL + 'webservices/v1/login/',
                    method: "POST",
                    data: $.param(formData)
                }).then(function(result) {
                    var response = mrmainstreetObj.checkHTTPResponse(result);
                    if (response.status == "ERROR") {
                        mrmainstreetObj.showMessage(response.message, 'error');
                    } else {
                        if (response.data) {
                            mrmainstreetObj.loginData = response.data;
                            $window.localStorage.setItem("loginUserRecord", response.data);
                            $window.localStorage.setItem("firstName", response.data.first_name);
                            $window.localStorage.setItem("token", response.data.token);
                            $window.localStorage.setItem("id", response.data.id);
                            $location.path('/user-dashboard');
                            mrmainstreetObj.showMessage(response.message, 'success');
                        }
                    }

                }, function(response) {
                    mrmainstreetObj.showMessage(CONST.MSG.COMMON_ERROR, 'error');
                })

            },

            /**
             * @name showMessage
             * @desc Methods to show common error messages
             * type: md-toast-succes, md-toast-error
             * @returns {*}
             */
            showMessage: function(message, type) {
                ngNotify.set(message, {
                    position: 'bottom',
                    duration: 3000,
                    type: type,
                    sticky: false
                });
            },


            /**
             * @name popupshow
             * @description
             * @param ev
             */
            popupShow: function(title, msg) {
                SweetAlert.confirm(msg, {
                        title: title
                    })
                    .then(function(p) {
                            console.log(p);
                        },
                        function(p) {
                            console.log("fail");
                        }
                    );
            },


        }
        return mrmainstreetObj;
    }
})();