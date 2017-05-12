(function() {
    'use strict';    
    /**
     * Lenders Factory
     * Created by: Kapil Chhabra (SIPL)
     * Created On: 14-04-2017
     */
    /**
     * Associate lenders factory, lenders info factory with MM Street module
     */
	angular
		.module('mmstreet')
		.factory('LendersDetailsFactory', LendersDetailsFactory);
		//Inject required modules to factory method
    	LendersDetailsFactory.$inject = ['$http', '$q', 'CONST', 'NotificationFactory','UtilsFactory'];
    	/**
	     * @name LendersDetailsFactory
	     * @desc Lenders data
	     * @returns {{lenders: Array, lendersInfo: object}}
	     * @constructor
	     */
		function LendersDetailsFactory($http, $q, CONST, NotificationFactory,UtilsFactory){
			var lendersObj = {				
				lenders:           [],
	            lendersInfo:       [],
	                /**
             * @name deleteLoanQuestions
             * @desc deleteLoanQuestions
             * @returns {*}
             */

            deleteLender: function(formData, id) {
                return $http.put(CONST.CONFIG.BASE_URL + 'webservices/v1/lenders/' + id + '/?format=json', angular.toJson(formData))
                .then(function(result) {
                     var response = result;
                    if (response.status == "ERROR") {
                        NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');

                    } else {
                        if (response) {
                            lendersObj.lenderResponse = response.data;
                            NotificationFactory.showMessage(CONST.MSG.SUCCESS_RECORD_DELETED, 'success');
                        }
                    }

                }, function(response) {
                    NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');
                })
            },

            /**
             * @name updateLoanQuestions
             * @desc updateLoanQuestions
             * @returns {*}
             */

            updateLender: function(formData, id) {
                return $http.put(CONST.CONFIG.BASE_URL + 'webservices/v1/lenders/' + id + '/?format=json', angular.toJson(formData))
                .then(function(result) {
                     var response = result;
                    if (response.status == "ERROR") {
                        NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');

                    } else {
                        if (response) {
                            lendersObj.lenderResponse = response.data;
                            NotificationFactory.showMessage(CONST.MSG.SUCCESS_RECORD_UPDATED, 'success');
                        }
                    }

                }, function(response) {
                    NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');
                })
            },
            /**
             * @name getLoanPurpose
             * @desc getloan purpose
             * @returns {*}
             */
            getLenders: function() {

                return $http.get(CONST.CONFIG.BASE_URL + 'webservices/v1/lenders/?format=json', {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    })
                    .then(function(result) {
                        var response = UtilsFactory.checkHTTPResponse(result);
                        if (response.results.length > 0) {
                            lendersObj.lenders = response.results;

                        }

                    }, function(response) {
                        NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');

                    })
            }

}
		return lendersObj;
	}
})();