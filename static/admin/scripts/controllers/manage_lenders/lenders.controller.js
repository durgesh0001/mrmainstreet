(function() {
    'use strict';
    /**
     * Lenders Controller
     * Created by: Kapil Chhabra (SIPL)
     * Created On: 14-04-2017
     */
    angular
        .module('mmstreet')
        .controller('LendersListCtrl', LendersListCtrl)
        .controller('ManageLendersCtrl', ManageLendersCtrl)
    //Inject required stuff as parameters to factories controller function
    LendersListCtrl.$inject = ['$scope','LendersDetailsFactory', 'UtilsFactory'];
    /**
     * @name LendersListCtrl
     * @param $scope
     * @param $uibModal
     * @param LendersDetailsFactory
     * @param UtilsFactory
     */
    function LendersListCtrl($scope,LendersDetailsFactory,UtilsFactory) 
    {
        //Assign controller scope pointer to a variable
        var vm = this;
        //Methods
        vm.getListing = getListing;
        vm.getLendersInfo = getLendersInfo;
        vm.closeModel = closeModel;
        /**
         * @name getListing
         * @desc Retrieve Lenders listing from factory
         * @returns {*}
         */
        function getListing() {
                //Call lender details factory get all lenders data

                LendersDetailsFactory.getLenders()
                .then(function() {
                    //Call user details factory get all users data
                        vm.lenders = LendersDetailsFactory.lenders;
                        console.log(vm.lenders);
                        vm.mmstreetTableParams = UtilsFactory.mmstreetTableOptions(vm.lenders);

                })

            }
        /**
         * @name getLendersInfo
         * @desc Get details of selected lender from factory.
         */
        function getLendersInfo(){
            //Call users details factory get factory data
            vm.lendersInfo = LendersDetailsFactory.getLendersInfo();

            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/manage_lenders/info.html',
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
        /* Call getListing method to show the lender data list */
        vm.getListing();
    }
    //Inject required stuff as parameters to factories controller function
    ManageLendersCtrl.$inject = ['$scope', 'UtilsFactory'];
    /**
     * @name ManageLendersCtrl
     */
    function ManageLendersCtrl($scope, UtilsFactory){
        var vm = this;        
        //Form validation messages
        vm.validationMsg = {
            required: 'Required',
            invalid: 'Invalid Input',
            email:   'Invalid Email'
        }
        function create(isValid){
            if(isValid){
                $location.path('dashboard')
            }
        }
    }
})();