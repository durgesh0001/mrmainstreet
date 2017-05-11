(function() {
    'use strict';

    /**
     * mrmainstreet Controller
     * Created by: Durgesh Ahirwar (SIPL)
     * Created On: 11-May-2017
     */

    angular
        .module('mrmainstreet')
        .controller('mrmainstreetCtrl', mrmainstreetCtrl)

    /* Inject required stuff as parameters to mrmainstreetCtrl controller function */
    mrmainstreetCtrl.$inject = ['$scope', 'CONST', '$location', '$state', '$window'];

    /**
     * @name mrmainstreetCtrl
     * @param $scope
     * @const CONST
     * @param $location
     * @param AuthFactory
     * @constructor
     */
    function mrmainstreetCtrl($scope, CONST, $location, $state, $window) {

        var vm = this;
        /**
         * @name scrollUp
         * @description scrollUp
         * @param *
         */
        vm.scrollUp = function() {
            new WOW().init();
            $window.scrollTo(0, 0);
        }
        var vm = this;
        vm.bodyClasses = '';

        // this'll be called on every state change in the app
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.bodyClasses)) {
                vm.bodyClasses = toState.data.bodyClasses;
                return;
            }

            vm.bodyClasses = '';
        });

    }


})();