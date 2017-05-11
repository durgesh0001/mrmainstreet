(function() {
    'use strict';

    /**
     * Questions Factory
     * Created by: Kapil Chhabra (SIPL)
     * Created On: 14-04-2017
     */

    /**
     * Associate questions factory, questions info factory with MM Street module
     */
    angular
        .module('mmstreet')
        .factory('QuestionsDetailsFactory', QuestionsDetailsFactory);

    //Inject required modules to factory method
    QuestionsDetailsFactory.$inject = ['$http', '$q', 'CONST', 'NotificationFactory', 'UtilsFactory','$location'];

    /**
     * @name QuestionsDetailsFactory
     * @desc Questions data
     * @returns {{questions: Array, questionsInfo: object}}
     * @constructor
     */
    function QuestionsDetailsFactory($http, $q, CONST, NotificationFactory, UtilsFactory,$location) {
        var questionsObj = {
            questions: [],
            questionsInfo: [],

            /**
             * @name addLoanQuestions
             * @desc addLoanQuestions
             * @returns {*}
             */

            addLoanQuestions: function(formData) {
                return $http({
                    url: CONST.CONFIG.BASE_URL + 'webservices/v1/questions/?format=json',
                    method: "POST",
                    data: $.param(formData)
                }).then(function(result) {
//

                    var response = result;
                    if (response.status == "ERROR") {
                        NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');

                    } else {
                        if (response) {

                            questionsObj.loanQuestionsResponse = response.data;
                            NotificationFactory.showMessage(CONST.MSG.SUCCESS_RECORD_ADDED, 'success');
                        }
                    }

                }, function(response) {
                    NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');
                })
            },
    /**
             * @name deleteLoanQuestions
             * @desc deleteLoanQuestions
             * @returns {*}
             */

            deleteLoanQuestions: function(formData, id) {
                return $http.put(CONST.CONFIG.BASE_URL + 'webservices/v1/questions/' + id + '/?format=json', angular.toJson(formData))
                .then(function(result) {
                     var response = result;
                    if (response.status == "ERROR") {
                        NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');

                    } else {
                        if (response) {
                            questionsObj.loanQuestionsResponse = response.data;
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

            updateLoanQuestions: function(formData, id) {
                return $http.put(CONST.CONFIG.BASE_URL + 'webservices/v1/questions/' + id + '/?format=json', angular.toJson(formData))
                .then(function(result) {
                     var response = result;
                    if (response.status == "ERROR") {
                        NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');

                    } else {
                        if (response) {
                            questionsObj.loanQuestionsResponse = response.data;
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
            getLoanQuestions: function() {

                return $http.get(CONST.CONFIG.BASE_URL + 'webservices/v1/questions/?format=json', {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    })
                    .then(function(result) {
                        var response = UtilsFactory.checkHTTPResponse(result);
                        if (response.results.length > 0) {
                            questionsObj.loanQuestions = response.results;

                        }

                    }, function(response) {
                        NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');

                    })
            },
            /**
             * @name getLoanQuestionById
             * @desc getLoanQuestionById
             * @returns {*}
             */
            getLoanQuestionById: function() {

                return $http.get(CONST.CONFIG.BASE_URL + 'webservices/v1/questions/' + id + '?format=json', {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    })
                    .then(function(result) {
                        var response = UtilsFactory.checkHTTPResponse(result);
                        if (response.results.length > 0) {
                            questionsObj.loanQuestionsById = response.results;

                        }

                    }, function(response) {
                        NotificationFactory.showMessage(CONST.MSG.COMMON_ERROR, 'error');

                    })
            },
            getListing: function() {

            },

            getQuestionsInfo: function() {
                return questionsObj.questionsInfo = {
                    category: "Main Flow",
                    order: "1",
                    questions: "How old is your bussiness?",
                    display_text: "Select Here",
                    response_type: "Discrete",
                    response: "Yes/No",
                    status: "Active"
                }
            }

        }

        return questionsObj;
    }
})();