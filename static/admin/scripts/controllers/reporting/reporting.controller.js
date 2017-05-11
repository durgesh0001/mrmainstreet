(function() {
    'use strict';
    /**
     * Reporting Controller
     * Created by: Kapil Chhabra (SIPL)
     * Created On: 14-04-2017
     */
    angular
        .module('mmstreet')
        .controller('ReportingListCtrl', ReportingListCtrl)
        .controller('ManageReportingCtrl', ManageReportingCtrl)
    //Inject required stuff as parameters to factories controller function
    ReportingListCtrl.$inject = ['$scope','ReportingDetailsFactory', 'UtilsFactory'];
    /**
     * @name ReportingListCtrl
     * @param $scope
     * @param $uibModal
     * @param ReportingDetailsFactory
     * @param UtilsFactory
     */
    function ReportingListCtrl($scope,ReportingDetailsFactory,UtilsFactory) 
    {
        //Assign controller scope pointer to a variable
        var vm = this;
        //Methods
        vm.getListing = getListing;
        vm.getReportingInfo = getReportingInfo;
        vm.closeModel = closeModel;
        /**
         * @name getListing
         * @desc Retrieve Reporting listing from factory
         * @returns {*}
         */
        function getListing() {
                //Call Reporting details factory get all Reporting data
                vm.reporting = ReportingDetailsFactory.getListing();
                vm.mmstreetTableParams = UtilsFactory.mmstreetTableOptions(vm.reporting);       
            }
        /**
         * @name getReportingInfo
         * @desc Get details of selected Reporting from factory.
         */
        function getReportingInfo(){
            //Call reporting details factory get factory data
            vm.reportingInfo = ReportingDetailsFactory.getReportingInfo();

            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/reporting/info.html',
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
        /* Call getListing method to show the reporting data list */
        vm.getListing();
    }
    //Inject required stuff as parameters to factories controller function
    ManageReportingCtrl.$inject = ['$scope', 'UtilsFactory'];
    /**
     * @name ManageReportingCtrl
     */
    function ManageReportingCtrl($scope, UtilsFactory){
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