(function() {
    'use strict';
    /**
     * Users Controller
     * Created by: Durgesh Ahirwar (SIPL)
     * Created On: 08-05-2017
     */
    angular
        .module('mmstreet')
        .controller('UsersAuthCtrl', UsersAuthCtrl)
    //Inject required stuff as parameters to factories controller function
    UsersAuthCtrl.$inject = ['$scope','UsersDetailsFactory', 'UtilsFactory','$window'];
    /**
     * @name UsersListCtrl
     * @param $scope
     * @param $uibModal
     * @param UsersDetailsFactory
     * @param UtilsFactory
     */
    function UsersAuthCtrl($scope,UsersDetailsFactory,UtilsFactory,$window)
    {
        //Assign controller scope pointer to a variable
        var vm = this;
        vm.loginUserFirstName = $window.localStorage.getItem("firstName");
        vm.loginUserLastName = $window.localStorage.getItem("lastName");

        UsersDetailsFactory.isLoggedIn();
         /**
         * @name logout
         * @description logout
         * @param ev
         */
        vm.logout = function() {
            UsersDetailsFactory.logout();
        }

    }


})();