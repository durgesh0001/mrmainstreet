(function() {
    'use strict';
    
    /**
     * Reporting Factory
     * Created by: Kapil Chhabra (SIPL)
     * Created On: 14-04-2017
     */

    /**
     * Associate Reporting factory, reporting info factory with MM Street module
     */
	angular
		.module('mmstreet')
		.factory('ReportingDetailsFactory', ReportingDetailsFactory);

		//Inject required modules to factory method
    	ReportingDetailsFactory.$inject = ['$http', '$q', 'CONST', 'NotificationFactory'];

    	/**
	     * @name ReportingDetailsFactory
	     * @desc Reporting data
	     * @returns {{reporting: Array, reportingInfo: object}}
	     * @constructor
	     */
		function ReportingDetailsFactory($http, $q, CONST, NotificationFactory){
			
			var reportingObj = {
				
				reporting:           [],
	            reportingInfo:        [],	            

	            /**
	             * @name getListing
	             * @desc Retrieve reporting listing from db
	             * @returns {*}
	             */
	            getListing : function() {
	                /*return $http.get(CONST.CONFIG.API_URL + 'reporting')
	                    .then(function(response) {
	                        if (response.status == 200 && typeof response.data === 'object') {
	                        	reportingObj.reporting = response.data; 
	                        }else {
	                            NotificationFactory.error(response.data);
	                        }

	                    }, function(response) {
	                        //return $q.reject(response.data);
	                        NotificationFactory.error(false);
	                    });*/
	                    return reportingObj.reporting = [
	                    {
	                    	sign_up_date:'21-Jan-17',
							client_first_name:'Matthew',
							client_last_name:'Wang',
							mobile_phone:"8356958644",
							client_email:'matt@gmail.com',
							primary_QA:{
									one:'TRUE',
									two:'TRUE',
									three:'TRUE',
									four:'TRUE',
									five:'NA',
									six:'NA',
									seven:'NA',
								},
							opt_In:{
									credit_repair:'15-Jun-16',
									debt_relief:'25-Apr-16',
								},
							qualified_sent:{
									seek:'21-Apr-16',
									torro:'20-Jan-17',
									fundandgrow:'21-Apr-16',
									funding_circle:'21-Apr-16',
									ondeck:'21-Apr-16',
									bvloc:'21-Apr-16',
									bvfact:'21-Apr-16',
									rapidadv:'21-Apr-16',
									bfs:'21-Apr-16',
									sfs:'21-Apr-16',
									yellowstone:'21-Apr-16',
									pearl:'21-Apr-16',
									everest:'21-Apr-16',
									cresthill:'21-Apr-16'
							}
						},
						{
	                    	sign_up_date:'22-Jan-17',
							client_first_name:'Vipin',
							client_last_name:' Hayden',
							mobile_phone:"9956958623",
							client_email:'matt@gmail.com',
							primary_QA:{
									one:'TRUE',
									two:'TRUE',
									three:'TRUE',
									four:'TRUE',
									five:'NA',
									six:'NA',
									seven:'NA',
								},
							opt_In:{
									credit_repair:'15-Jun-16',
									debt_relief:'25-Apr-16',
								},
							qualified_sent:{
									seek:'21-Apr-16',
									torro:'20-Jan-17',
									fundandgrow:'21-Apr-16',
									funding_circle:'21-Apr-16',
									ondeck:'21-Apr-16',
									bvloc:'21-Apr-16',
									bvfact:'21-Apr-16',
									rapidadv:'21-Apr-16',
									bfs:'21-Apr-16',
									sfs:'21-Apr-16',
									yellowstone:'21-Apr-16',
									pearl:'21-Apr-16',
									everest:'21-Apr-16',
									cresthill:'21-Apr-16'
							}
						},
						{
	                    	sign_up_date:'23-Jan-17',
							client_first_name:'Alex',
							client_last_name:'Stewart',
							mobile_phone:"1234958623",
							client_email:'matt@gmail.com',
							primary_QA:{
									one:'TRUE',
									two:'TRUE',
									three:'TRUE',
									four:'TRUE',
									five:'NA',
									six:'NA',
									seven:'NA',
								},
							opt_In:{
									credit_repair:'15-Jun-16',
									debt_relief:'25-Apr-16',
								},
							qualified_sent:{
									seek:'21-Apr-16',
									torro:'20-Jan-17',
									fundandgrow:'21-Apr-16',
									funding_circle:'21-Apr-16',
									ondeck:'21-Apr-16',
									bvloc:'21-Apr-16',
									bvfact:'21-Apr-16',
									rapidadv:'21-Apr-16',
									bfs:'21-Apr-16',
									sfs:'21-Apr-16',
									yellowstone:'21-Apr-16',
									pearl:'21-Apr-16',
									everest:'21-Apr-16',
									cresthill:'21-Apr-16'
							}
						},
						{
	                    	sign_up_date:'24-Jan-17',
							client_first_name:'Stew',
							client_last_name:'Krentz',
							mobile_phone:"8356586623",
							client_email:'matt@gmail.com',
							primary_QA:{
									one:'TRUE',
									two:'TRUE',
									three:'TRUE',
									four:'TRUE',
									five:'NA',
									six:'NA',
									seven:'NA',
								},
							opt_In:{
									credit_repair:'15-Jun-16',
									debt_relief:'25-Apr-16',
								},
							qualified_sent:{
									seek:'21-Apr-16',
									torro:'20-Jan-17',
									fundandgrow:'21-Apr-16',
									funding_circle:'21-Apr-16',
									ondeck:'21-Apr-16',
									bvloc:'21-Apr-16',
									bvfact:'21-Apr-16',
									rapidadv:'21-Apr-16',
									bfs:'21-Apr-16',
									sfs:'21-Apr-16',
									yellowstone:'21-Apr-16',
									pearl:'21-Apr-16',
									everest:'21-Apr-16',
									cresthill:'21-Apr-16'
							}
						},
						{
	                    	sign_up_date:'25-Jan-17',
							client_first_name:'Ernie',
							client_last_name:'Smith',
							mobile_phone:"83569698563",
							client_email:'matt@gmail.com',
							primary_QA:{
									one:'TRUE',
									two:'TRUE',
									three:'TRUE',
									four:'TRUE',
									five:'NA',
									six:'NA',
									seven:'NA',
								},
							opt_In:{
									credit_repair:'15-Jun-16',
									debt_relief:'25-Apr-16',
								},
							qualified_sent:{
									seek:'21-Apr-16',
									torro:'20-Jan-17',
									fundandgrow:'21-Apr-16',
									funding_circle:'21-Apr-16',
									ondeck:'21-Apr-16',
									bvloc:'21-Apr-16',
									bvfact:'21-Apr-16',
									rapidadv:'21-Apr-16',
									bfs:'21-Apr-16',
									sfs:'21-Apr-16',
									yellowstone:'21-Apr-16',
									pearl:'21-Apr-16',
									everest:'21-Apr-16',
									cresthill:'21-Apr-16'
							}
						}
					];
	            },

	            getReportingInfo: function(){
	            	/*return $http.get(CONST.CONFIG.API_URL + 'reporting')
	                    .then(function(response) {
	                        if (response.status == 200 && typeof response.data === 'object') {
	                        	reportingObj.reportingInfo = response.data[0]; 
	                        }else {
	                            NotificationFactory.error(response.data);
	                        }

	                    }, function(response) {
	                        //return $q.reject(response.data);
	                        NotificationFactory.error(false);
	                    });*/

	                    return reportingObj.reportingInfo = {
	                    	sign_up_date:'20-Jan-17',
							client_first_name:'Matthew',
							client_last_name:'Wang',
							mobile_phone:"8356958623",
							client_email:'matt@gmail.com',
							primary_QA:{
									one:'TRUE',
									two:'TRUE',
									three:'TRUE',
									four:'TRUE',
									five:'NA',
									six:'NA',
									seven:'NA',
								},
							opt_In:{
									credit_repair:'15-Jun-16',
									debt_relief:'25-Apr-16',
								},
							qualified_sent:{
									seek:'21-Apr-16',
									torro:'20-Jan-17',
									fundandgrow:'21-Apr-16',
									funding_circle:'21-Apr-16',
									ondeck:'21-Apr-16',
									bvloc:'21-Apr-16',
									bvfact:'21-Apr-16',
									rapidadv:'21-Apr-16',
									bfs:'21-Apr-16',
									sfs:'21-Apr-16',
									yellowstone:'21-Apr-16',
									pearl:'21-Apr-16',
									everest:'21-Apr-16',
									cresthill:'21-Apr-16'
							}
						}
	            }

		}
		
		return reportingObj;
	}
})();