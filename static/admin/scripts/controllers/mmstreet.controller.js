(function() {
    'use strict';

    /**
     * Common Controller
     * Created by: Kapil Chhabra (SIPL)
     * Created On: 12-04-2017
     */

    angular
        .module('mmstreet')
        .controller('DatepickerCtrl', DatepickerCtrl)
    
    //Inject required stuff as parameters to DatepickerCtrl controller function
    DatepickerCtrl.$inject = ['$scope'];

    /**
     * @name DatepickerCtrl
     * @param $scope
     * @constructor
     */
    function DatepickerCtrl($scope) {
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['MMMM-dd-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
    }

})();