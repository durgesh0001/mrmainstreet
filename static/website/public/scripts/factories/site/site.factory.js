(function() {
    'use strict';
    /**
     * Superadmin Factory
     * Created by: Pankaj Birle (SIPL)
     * Created On: 08-August-2016
     */

    angular
            .module('mrmainstreet')
            .factory('SiteFactory', SiteFactory);
    /* Inject required modules to factory method */
    SiteFactory.$inject = ['$http', 'CONST', 'mrmainstreetFactory', '$location', '$resource'];
    /**
     * @name SuperadminFactory
     * @desc Contains logic to store, retrieve, update and delete data of settings in DB
     * @param $http
     * @param CONST
     * @param mrmainstreetFactory
     * @param $location
     * @param $resource
     * @returns {{settingsObj: object}}
     * @constructor
     */
    function SiteFactory($http, CONST, mrmainstreetFactory, $location, $resource)
    {
        
        var SuperadminObj = {
            dashboardDetails: [],
            Subscriptions: [],
            allClients: [],
            clientDetails: '',
            reportData: [],
        }
        return SuperadminObj;
    }
})();