(function() {
    'use strict';

    /**
     * Login Controller
     * Created by: Kapil Chhabra (SIPL)
     * Created On: 12-04-2017
     */

    angular
        .module('mmstreet')
        .controller('LoginCtrl', LoginCtrl);

    //Inject required stuff as parameters to factories controller function
    LoginCtrl.$inject = ['$scope','$rootScope','$state','$location','LoginFactory','$window','$base64'];

    /**
     * @name LoginCtrl
     */
    function LoginCtrl($scope,$rootScope,$state, $location,LoginFactory,$window,$base64){
    	var vm = this;
        vm.create = create;
                var vm = this;
        LoginFactory.isLoggedIn();
        vm.isUserLogin = LoginFactory.isLogin

        vm.loginData = {
            "useremail": "",
            "password": ""
        }

        vm.rememberMe = false;
        //set rememberMe
        getRememberMe();

        $rootScope.currentPage = 'login';
        var path = $state;
        vm.routeName = path.current.name;

        /**
         * @name logout
         * @description logout
         * @param ev
         */
        vm.logout = function() {
            LoginFactory.logout();
        }
        /**
         * @name isAdminRememberMe
         * @description isAdminRememberMe
         * @param ev
         */
        vm.setRememberMe = function(isRemember) {
            if (vm.rememberMe == true) {
                $window.localStorage.setItem("isAdminRememberMe", true);

            } else {
                $window.localStorage.removeItem("isAdminRememberMe");
                $window.localStorage.removeItem("rememberMeAdminToken");

            }

        }
        /**
         * @name setRememberMe
         * @description setRememberMe
         * @param ev
         */
        function getRememberMe() {
            if (($window.localStorage.getItem("isAdminRememberMe")) == "true") {
            if($window.localStorage.getItem("rememberMeAdminToken"))
            {
                    vm.rememberMe = true;
                var tokenRememberMe = $base64.decode($window.localStorage.getItem("rememberMeAdminToken"))
                var splitData = tokenRememberMe.split(":");
                vm.loginData = {
                    "useremail": splitData[0],
                    "password": splitData[1]
                }

            }
            }

        }

        vm.login = function(data,isValid) {
           if(isValid){
                LoginFactory.login(data)
                .then(function() {
                    if (vm.rememberMe == true) {

                        var rememberMeAdminToken = $base64.encode(data.useremail + ":" + data.password);
                        $window.localStorage.setItem("rememberMeAdminToken", rememberMeAdminToken);
                    }
                })
            }


        }

        
        //Form validation messages
        vm.validationMsg = {
            required: 'Required',
            invalid: 'Invalid Input',
            email:   'Invalid Email'
        }
        function create(isValid){
            if(isValid){
                //alert($location.path());
                $location.path('users/list')
            }
        }
    }
    

})();