(function() {
    'use strict';
    /**
     * Users Controller
     * Created by: Kapil Chhabra (SIPL)
     * Created On: 14-04-2017
     */
    angular
        .module('mmstreet')
        .controller('UsersListCtrl', UsersListCtrl)
        .controller('ManageUserCtrl', ManageUserCtrl)
    //Inject required stuff as parameters to factories controller function
    UsersListCtrl.$inject = ['$scope','UsersDetailsFactory', 'UtilsFactory','$window','ngDialog','CONST'];
    /**
     * @name UsersListCtrl
     * @param $scope
     * @param $uibModal
     * @param UsersDetailsFactory
     * @param UtilsFactory
     */
    function UsersListCtrl($scope,UsersDetailsFactory,UtilsFactory,$window,ngDialog,CONST)
    {
        //Assign controller scope pointer to a variable
        var vm = this;
        //Methods
        vm.getListing = getListing;
        vm.getUserInfo = getUserInfo;
        vm.closeModel = closeModel;

        UsersDetailsFactory.isLoggedIn();
        /**
         * @name getListing
         * @desc Retrieve users listing from factory
         * @returns {*}
         */
        function getListing() {

            UsersDetailsFactory.getListing()
                .then(function() {

                //Call user details factory get all users data
                vm.users = UsersDetailsFactory.users;
                vm.mmstreetTableParams = UtilsFactory.mmstreetTableOptions(vm.users);

                })

            }
                /**
         * @name logout
         * @description logout
         * @param ev
         */
        vm.logout = function() {
            UsersDetailsFactory.logout();
        }

                     /**
         * @name delete
         * @description delete
         * @param ev
         */              //delete questions
        vm.delete = function(data) {
                    ngDialog.openConfirm({
                template: '<div align="center">' +CONST.MSG.CONFIRM_RECORD_DELETE +
                        '<br><br><div align="center"><input type="button" value="No " ng-click="closeThisDialog(0)"/> &nbsp;&nbsp;&nbsp; <input type="button" value="Yes" ng-click="confirm()"/>' +
                        '</div></div>',
                plain: true,
                scope: $scope
            }).then(function (value) {
                 data.is_active = false;
                //Call Question details factory get all Questions update data
                UsersDetailsFactory.deleteUser(data,data.id)
                    .then(function() {
                        //Call user details factory get all users data
                        if(UsersDetailsFactory.userResponse)
                        {
                        ngDialog.close();
                        getListing();
                        }

                    })
            })

        }
        /**
         * @name getUserInfo
         * @desc Get details of selected user from factory.
         */
        function getUserInfo(){
            //Call users details factory get factory data
            vm.userInfo = UsersDetailsFactory.getUserInfo();

            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/users/info.html',
                size: 'lg',
                scope: $scope
            });
        }
        /**
         * @name closeModal
         * @desc Close pop up
         */
        function closeModel(){
            $scope.modalInstance.dismiss();
        }
        /* Call getListing method to show the users data list */
        vm.getListing();
    }
    //Inject required stuff as parameters to factories controller function
    ManageUserCtrl.$inject = ['$scope', 'UtilsFactory'];
    /**
     * @name ManageFactoryCtrl
     */
    function ManageUserCtrl($scope, UtilsFactory){
        var vm = this;
        //Form validation messages
        vm.validationMsg = {
            required: 'Required',
            invalid: 'Invalid Input',
            email:   'Invalid Email'
        }
    }

})();