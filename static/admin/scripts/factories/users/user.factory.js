(function() {
    'use strict';    
    /**
     * Users Factory
     * Created by: Kapil Chhabra (SIPL)
     * Created On: 14-04-2017
     */
    /**
     * Associate users factory, user info factory with MM Street module
     */
	angular
		.module('mmstreet')
		.factory('UsersDetailsFactory', UsersDetailsFactory);
		//Inject required modules to factory method
    	UsersDetailsFactory.$inject = ['$http', '$q', 'CONST', 'NotificationFactory','$location','$window'];
    	/**
	     * @name UsersDetailsFactory
	     * @desc Users data
	     * @returns {{users: Array, userInfo: object}}
	     * @constructor
	     */
		function UsersDetailsFactory($http, $q, CONST, NotificationFactory,$location,$window){
			var userObj = {				
				users:           [],
	            userInfo:        [],
	                /**
             * @name isLoggedIn
             * @desc Methods to check user is authenticated or not
             * @returns {*}
             */
            isLoggedIn: function() {
             if($window.localStorage.getItem("adminToken"))
             {
               userObj.isLogin = true;

             }
             else
             {
              $location.path('/');
              userObj.isLogin = false;
             }
            },
                      /**
             * @name logout
             * @desc logout
             * @returns {*}
             */

                   logout: function() {
                $window.localStorage.removeItem('adminToken');
                $window.localStorage.removeItem('loginUserRecord');
                $window.localStorage.removeItem('firstName');
                $window.localStorage.removeItem('lastName');
                $location.path('/');
            },
               /**
             * @name deleteLoanQuestions
             * @desc deleteLoanQuestions
             * @returns {*}
             */

            deleteUser: function(formData, id) {
                return $http.put(CONST.CONFIG.BASE_URL + 'webservices/v1/users/' + id + '/?format=json', angular.toJson(formData))
                .then(function(result) {
                     var response = result;
                    if (response.status == "ERROR") {
                        NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');

                    } else {
                        if (response) {
                            userObj.userResponse = response.data;
                            NotificationFactory.showMessage(CONST.MSG.SUCCESS_RECORD_DELETED, 'success');
                        }
                    }

                }, function(response) {
                    NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');
                })
            },
                     /**
             * @name checkHTTPResponse
             * @desc checkHTTPResponse
             * @returns {*}
             */
            checkHTTPResponse: function(response) {

                if (response.status == 200 && typeof response.data === 'object') {
                    /* Show error messages  */
                    if (response.data.status == false && typeof response.data.error != 'undefined' && response.data.error.length > 0) {
                        var errorMsg = '';
                        angular.forEach(response.data.error, function(val) {
                            errorMsg += val + " <br />";
                        })
                       NotificationFactory.showMessage(errorMsg, 'error');


                    }
                    return response.data

                } else {
                       NotificationFactory.showMessage(errorMsg, 'error');

                }
            },
	            /**
	             * @name getListing
	             * @desc Retrieve users listing from db
	             * @returns {*}
	             */
	            getListing : function() {
	            return $http.get(CONST.CONFIG.BASE_URL + 'webservices/v1/users/?format=json', {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    })
                    .then(function(result) {
                        var response = userObj.checkHTTPResponse(result);
                        if (response.results.length > 0) {
                            userObj.users = response.results;

                        }

                    }, function(response) {
                        NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');

                    })

	                /*return $http.get(CONST.CONFIG.API_URL + 'users')
	                    .then(function(response) {
	                        if (response.status == 200 && typeof response.data === 'object') {
	                        	userObj.users = response.data; 
	                        }else {
	                            NotificationFactory.error(response.data);
	                        }

	                    }, function(response) {
	                        //return $q.reject(response.data);
	                        NotificationFactory.error(false);
	                    });*/
//	                    return userObj.users = [
//	                    // {
//	                    // 	department: "TCEB",
//	                    // 	name: 'tesco Boys Europe',
//	                    // 	contact_person: "Mike",
//	                    // 	designation: 'Director',
//	                    // 	email:'tesco@hotmail.com',
//	                    // 	contact_no: '+44 20 8962 1234'
//	                    // },
//	                    // {
//	                    // 	department: "ZL",
//	                    // 	name: 'Zen Ling',
//	                    // 	contact_person: "Zenlin",
//	                    // 	designation: 'Manager',
//	                    // 	email:'zen@hotmail.com',
//	                    // 	contact_no: '+44 20 9845 4574'
//	                    // },
//	                    // {
//	                    // 	department: "RL",
//	                    // 	name: 'Roland Lagase',
//	                    // 	contact_person: "Brain",
//	                    // 	designation: 'Manager',
//	                    // 	email:'roland@hotmail.com',
//	                    // 	contact_no: '+44 20 1235 4512'
//	                    // },
//	                    // {
//	                    // 	department: "Britt",
//	                    // 	name: 'Brit Int. Ltd.',
//	                    // 	contact_person: "Susane",
//	                    // 	designation: 'Director',
//	                    // 	email:'britt@hotmail.com',
//	                    // 	contact_no: '+44 20 1574 8456'
//	                    // },
//	                    // {
//	                    // 	department: "TCEB",
//	                    // 	name: 'tesco Boys Europe',
//	                    // 	contact_person: "Mike",
//	                    // 	designation: 'Director',
//	                    // 	email:'tesco@hotmail.com',
//	                    // 	contact_no: '+44 20 8962 1234'
//	                    // },
//	                    // {
//	                    // 	department: "ZL",
//	                    // 	name: 'Zen Ling',
//	                    // 	contact_person: "Zenlin",
//	                    // 	designation: 'Manager',
//	                    // 	email:'zen@hotmail.com',
//	                    // 	contact_no: '+44 20 9845 4574'
//	                    // },
//	                    // {
//	                    // 	department: "RL",
//	                    // 	name: 'Roland Lagase',
//	                    // 	contact_person: "Brain",
//	                    // 	designation: 'Manager',
//	                    // 	email:'roland@hotmail.com',
//	                    // 	contact_no: '+44 20 1235 4512'
//	                    // },
//	                    // {
//	                    // 	department: "Britt",
//	                    // 	name: 'Brit Int. Ltd.',
//	                    // 	contact_person: "Susane",
//	                    // 	designation: 'Director',
//	                    // 	email:'britt@hotmail.com',
//	                    // 	contact_no: '+44 20 1574 8456'
//	                    // }
////	                    {	landing_page:'https://www.mrmainstreet.com',
//							landing_time:'442342343',
//							signup_time:'20-Jan-17',
//							client_first_name:'Matthew',
//							client_last_name:'Wang',
//							mobile_phone:'8365958623',
//							client_email:'matt@gmail.com',
//							primary_QA:{
//								one:'TRUE',
//							  	two:'TRUE',
//							  	three:'TRUE',
//							  	four:'TRUE',
//							  	five:"NA",
//							  	six:"NA",
//							  	seven:"NA",
//							},
//							opt_In:{
//								credit_repair: "15-Jun-16",
//								debt_relief:"25-Mar-16",
//							},
//							qualified_sent:{
//								seek:'21-Apr-16',
//							  	torro:'20-Jan-17',
//							  	fund_grow:'21-Apr-16',
//							  	funding_circle:'21-Apr-16',
//							  	on_deck:'21-Apr-16',
//							  	bv_loc:'21-Apr-16',
//							  	bv_fact:'21-Apr-16',
//							  	rapid_adv:'21-Apr-16',
//							  	national:'21-Apr-16',
//							  	bfs:'21-Apr-16',
//							  	sfs:'21-Apr-16',
//							  	yellow_stone:'21-Apr-16',
//							  	pearl:'21-Apr-16',
//							  	everest:'21-Apr-16',
//							  	cresthill:'21-Apr-16'
//							}
//						},
//						{	landing_page:'https://www.mrmainstreet.com',
//							landing_time:'789465489',
//							signup_time:'21-Jan-17',
//							client_first_name:'Josh',
//							client_last_name:'Peterson',
//							mobile_phone:'8365958623',
//							client_email:'matt@gmail.com',
//							primary_QA:{
//								one:'TRUE',
//							  	two:'TRUE',
//							  	three:'TRUE',
//							  	four:'TRUE',
//							  	five:"NA",
//							  	six:"NA",
//							  	seven:"NA",
//							},
//							opt_In:{
//								credit_repair: "15-Jun-16",
//								debt_relief:"25-Mar-16",
//							},
//							qualified_sent:{
//								seek:'21-Apr-16',
//							  	torro:'20-Jan-17',
//							  	fund_grow:'21-Apr-16',
//							  	funding_circle:'21-Apr-16',
//							  	on_deck:'21-Apr-16',
//							  	bv_loc:'21-Apr-16',
//							  	bv_fact:'21-Apr-16',
//							  	rapid_adv:'21-Apr-16',
//							  	national:'21-Apr-16',
//							  	bfs:'21-Apr-16',
//							  	sfs:'21-Apr-16',
//							  	yellow_stone:'21-Apr-16',
//							  	pearl:'21-Apr-16',
//							  	everest:'21-Apr-16',
//							  	cresthill:'21-Apr-16'
//							}
//						},
//						{	landing_page:'https://www.mrmainstreet.com',
//							landing_time:'654242343',
//							signup_time:'22-Jan-17',
//							client_first_name:'Ernie',
//							client_last_name:'Doe',
//							mobile_phone:'8365958623',
//							client_email:'matt@gmail.com',
//							primary_QA:{
//								one:'TRUE',
//							  	two:'TRUE',
//							  	three:'TRUE',
//							  	four:'TRUE',
//							  	five:"NA",
//							  	six:"NA",
//							  	seven:"NA",
//							},
//							opt_In:{
//								credit_repair: "15-Jun-16",
//								debt_relief:"25-Mar-16",
//							},
//							qualified_sent:{
//								seek:'21-Apr-16',
//							  	torro:'20-Jan-17',
//							  	fund_grow:'21-Apr-16',
//							  	funding_circle:'21-Apr-16',
//							  	on_deck:'21-Apr-16',
//							  	bv_loc:'21-Apr-16',
//							  	bv_fact:'21-Apr-16',
//							  	rapid_adv:'21-Apr-16',
//							  	national:'21-Apr-16',
//							  	bfs:'21-Apr-16',
//							  	sfs:'21-Apr-16',
//							  	yellow_stone:'21-Apr-16',
//							  	pearl:'21-Apr-16',
//							  	everest:'21-Apr-16',
//							  	cresthill:'21-Apr-16'
//							}
//						},
//						{	landing_page:'https://www.mrmainstreet.com',
//							landing_time:'442342343',
//							signup_time:'23-Jan-17',
//							client_first_name:'Krentz',
//							client_last_name:'Jong',
//							mobile_phone:'8365958623',
//							client_email:'matt@gmail.com',
//							primary_QA:{
//								one:'TRUE',
//							  	two:'TRUE',
//							  	three:'TRUE',
//							  	four:'TRUE',
//							  	five:"NA",
//							  	six:"NA",
//							  	seven:"NA",
//							},
//							opt_In:{
//								credit_repair: "15-Jun-16",
//								debt_relief:"25-Mar-16",
//							},
//							qualified_sent:{
//								seek:'21-Apr-16',
//							  	torro:'20-Jan-17',
//							  	fund_grow:'21-Apr-16',
//							  	funding_circle:'21-Apr-16',
//							  	on_deck:'21-Apr-16',
//							  	bv_loc:'21-Apr-16',
//							  	bv_fact:'21-Apr-16',
//							  	rapid_adv:'21-Apr-16',
//							  	national:'21-Apr-16',
//							  	bfs:'21-Apr-16',
//							  	sfs:'21-Apr-16',
//							  	yellow_stone:'21-Apr-16',
//							  	pearl:'21-Apr-16',
//							  	everest:'21-Apr-16',
//							  	cresthill:'21-Apr-16'
//							}
//						},
//						{	landing_page:'https://www.mrmainstreet.com',
//							landing_time:'442342343',
//							signup_time:'23-Jan-17',
//							client_first_name:'Hayden',
//							client_last_name:'Young',
//							mobile_phone:'9856958623',
//							client_email:'matt@gmail.com',
//							primary_QA:{
//								one:'TRUE',
//							  	two:'TRUE',
//							  	three:'TRUE',
//							  	four:'TRUE',
//							  	five:"NA",
//							  	six:"NA",
//							  	seven:"NA",
//							},
//							opt_In:{
//								credit_repair: "15-Jun-16",
//								debt_relief:"25-Mar-16",
//							},
//							qualified_sent:{
//								seek:'21-Apr-16',
//							  	torro:'20-Jan-17',
//							  	fund_grow:'21-Apr-16',
//							  	funding_circle:'21-Apr-16',
//							  	on_deck:'21-Apr-16',
//							  	bv_loc:'21-Apr-16',
//							  	bv_fact:'21-Apr-16',
//							  	rapid_adv:'21-Apr-16',
//							  	national:'21-Apr-16',
//							  	bfs:'21-Apr-16',
//							  	sfs:'21-Apr-16',
//							  	yellow_stone:'21-Apr-16',
//							  	pearl:'21-Apr-16',
//							  	everest:'21-Apr-16',
//							  	cresthill:'21-Apr-16'
//							}
//						}
//					];
	            },
	            getUserInfo: function(){
	            	/*return $http.get(CONST.CONFIG.API_URL + 'users')
	                    .then(function(response) {
	                        if (response.status == 200 && typeof response.data === 'object') {
	                        	userObj.userInfo = response.data[0]; 
	                        }else {
	                            NotificationFactory.error(response.data);
	                        }

	                    }, function(response) {
	                        //return $q.reject(response.data);
	                        NotificationFactory.error(false);
	                    });*/
	                    return userObj.userInfo = {
	                    	landing_page:'https://www.mrmainstreet.com',
							landing_time:'442342343',
							signup_time:'20-Jan-17',
							client_first_name:'Matthew',
							client_last_name:'Wang',
							mobile_phone:'8365958623',
							client_email:'matt@gmail.com',
							primary_QA:{
								one:'TRUE',
							  	two:'TRUE',
							  	three:'TRUE',
							  	four:'TRUE',
							  	five:"NA",
							  	six:"NA",
							  	seven:"NA",
							},
							opt_In:{
								credit_repair: "15-Jun-16",
								debt_relief:"25-Mar-16",
							},
							qualified_sent:{
								seek:'21-Apr-16',
							  	torro:'20-Jan-17',
							  	fund_grow:'21-Apr-16',
							  	funding_circle:'21-Apr-16',
							  	on_deck:'21-Apr-16',
							  	bv_loc:'21-Apr-16',
							  	bv_fact:'21-Apr-16',
							  	rapid_adv:'21-Apr-16',
							  	national:'21-Apr-16',
							  	bfs:'21-Apr-16',
							  	sfs:'21-Apr-16',
							  	yellow_stone:'21-Apr-16',
							  	pearl:'21-Apr-16',
							  	everest:'21-Apr-16',
							  	cresthill:'21-Apr-16'
							}						
						}
	            }
		}		
		return userObj;
	}
})();