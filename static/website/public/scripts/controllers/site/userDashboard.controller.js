(function () {
    'use strict';
    /**
     * Dashboard Controller
     * Created by: durgesh ahirwar
     * Created On: 05-05-2017
     */

    angular
        .module('mrmainstreet')
        .controller('DashboardCtrl', DashboardCtrl)
    /* Inject required stuff as parameters to client controller function */
    DashboardCtrl.$inject = ['SiteFactory','userDashboardFactory', '$rootScope', 'mrmainstreetFactory', 'SweetAlert','$scope','ngDialog','$state','$window'];
    /**
     * @name DashboardCtrl
     * @param SuperadminFactory
     * @constructor
     */
    function DashboardCtrl(SiteFactory,userDashboardFactory, $rootScope, mrmainstreetFactory, SweetAlert,$scope,ngDialog,$state,$window) {
        var vm = this;
       userDashboardFactory.isLoggedIn();
    }


})();