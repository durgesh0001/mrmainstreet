(function() {
    'use strict';
    /**
     * Users Factory
     * Created by: Kapil Chhabra (SIPL)
     * Created On: 14-04-2017
     */
    /**
     * Associate users factory, user info factory with MM Street module
     */
	angular
		.module('mmstreet')
		.factory('LoginFactory', LoginFactory);
		//Inject required modules to factory method
    	LoginFactory.$inject = ['$http', '$q', 'CONST', 'NotificationFactory','$window','$location'];
    	/**
	     * @name UsersDetailsFactory
	     * @desc Users data
	     * @returns {{users: Array, userInfo: object}}
	     * @constructor
	     */
		function LoginFactory($http, $q, CONST, NotificationFactory,$window,$location){
			var loginObj = {
				users:           [],
	            userInfo:        [],
	            /**
             * @name isLoggedIn
             * @desc Methods to check user is authenticated or not
             * @returns {*}
             */
            isLoggedIn: function() {
                if ($window.localStorage.getItem("adminToken")) {
                    loginObj.isLogin = true;
                    $location.path('/users/list');

                } else {
                    loginObj.isLogin = false;
                }
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
                       NotificationFactory.showMessage(errorMsg, 'error');

                    }
                    return response.data

                } else {
                       NotificationFactory.showMessage(errorMsg, 'error');

                }
            },


    
            /**
             * @name Login
             * @desc Methods for admin userLogin
             * @returns {*}
             */

            login: function(formData) {
                return $http({
                    url: CONST.CONFIG.BASE_URL + 'webservices/v1/adminlogin/',
                    method: "POST",
                    data: $.param(formData)
                }).then(function(result) {
                    var response = loginObj.checkHTTPResponse(result);
                    if (response.status == "ERROR") {
                       NotificationFactory.showMessage(response.message, 'error');

                    } else {
                        if (response.data) {
                            loginObj.loginData = response.data;
                            $window.localStorage.setItem("loginUserRecord", response.data);
                            $window.localStorage.setItem("firstName", response.data.first_name);
                            $window.localStorage.setItem("lastName", response.data.last_name);
                            $window.localStorage.setItem("adminToken", response.data.token);
                            $location.path('/users/list');
                            NotificationFactory.showMessage(response.message, 'success');
                        }
                    }

                }, function(response) {
                       NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');
                })

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
		return loginObj;
	}
})();