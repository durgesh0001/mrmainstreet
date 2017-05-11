(function() {
    'use strict';
    /**
     * Superadmin Controller
     * Created by: Durgesh Ahirwar
     * Created On: 05-05-2017
     */

    angular
        .module('mrmainstreet')
        .controller('HomeCtrl', HomeCtrl)
    /* Inject required stuff as parameters to client controller function */
    HomeCtrl.$inject = ['SiteFactory', '$rootScope', 'mrmainstreetFactory', 'SweetAlert', '$scope', 'ngDialog', '$state', '$window', '$base64'];
    /**
     * @name DashboardCtrl
     * @param SuperadminFactory
     * @constructor
     */
    function HomeCtrl(SiteFactory, $rootScope, mrmainstreetFactory, SweetAlert, $scope, ngDialog, $state, $window, $base64) {
        var vm = this;
        $rootScope.bodylayout = '';
        vm.isShow = true;
        vm.isDailog = false;
        mrmainstreetFactory.isLoggedIn();
        vm.isUserLogin = mrmainstreetFactory.isLogin
        vm.loginUserName = $window.localStorage.getItem("firstName");
        $scope.$state = $state;
        vm.loginData = {
            "useremail": "",
            "password": ""
        }

        vm.rememberMe = false;
        //get rememberMe
        getRememberMe();

        $rootScope.currentPage = 'home';
        var path = $state;
        vm.routeName = path.current.name;


        vm.user = {
            "firstname": "",
            "lastname": "",
            "email": "",
            "mobile": "",
            "password": "",

        }


        vm.loadAmount = "";
        vm.questions = [{
                "question": "Desired Loan Amount",
                "number": 0,
                "is_show": false,
                "value": $rootScope.loadAmount,
                "display_text": "",
                "data": [],
            },
            {
                "question": "When did you start your business?",
                "number": 1,
                "is_show": true,
                "display_text": "",
                "data": [
                    "Just Starting Up",
                    "3-6 months",
                    "6-12 months",
                    "1-2 years",
                    "2-3 years",
                    "3-4 years",
                    "4-5 years",
                    "5+ years"
                ],
                "value": ""
            },
            {
                "question": "Loan Purpose",
                "number": 2,
                "display_text": "",
                "is_show": false,
                "data": [],
                "value": "",
            },
            {
                "question": "Credit Score",
                "number": 3,
                "is_show": false,
                "display_text": "",
                "data": [
                    "Excellent (700+)",
                    "Excellent (660-699)",
                    "Good (640-659)",
                    "Good (620-639)",
                    "Fair (580-619)",
                    "Fair (550-579)",
                    "Challenged (Below 550)"
                ],
                "value": "",
            },
            {
                "question": "What were your total sales last year?",
                "number": 4,
                "is_show": false,
                "display_text": "",
                "data": [],
                "value": "",
            },
            {
                "question": "What was your average monthly sales over the last three months?",
                "number": 5,
                "is_show": false,
                "display_text": "",
                "data": [],
                "value": "",
            },
            {
                "question": "Do you invoice your business customers?",
                "number": 6,
                "is_show": false,
                "display_text": "",
                "data": [],
                "value": "",
            },
            {
                "title": "Loading page",
               "question": "",
                "display_text": "",
                "number": 7,
                "is_show": false
            },
            {
                "title": "userRegistration",
                 "question": "",
                "display_text": "",
                "number": 8,
                "is_show": false
            }

        ];
        //get loan questions
        getLoanQuestions();

        /**
         * @name getLoanPurpose
         * @description Confirm Box
         * @param ev
         */
        vm.getLoanPurpose = function() {
            mrmainstreetFactory.getLoanPurpose()
                .then(function() {
                    vm.questions[2].data = mrmainstreetFactory.loanPurpose;

                })
        }
        /**
         * @name setLoanQuestions
         * @description setLoanQuestions
         * @param ev
         */
        function setLoanQuestions(questions) {
            if (questions.length > 0) {
                for (var i = 0; i < 7; i++) {
                    vm.questions[i].question = questions[i].question_text;
                    vm.questions[i].number = questions[i].question_order;
                    vm.questions[i].display_text = questions[i].display_text;
                }
            }
        }
        /**
         * @name getLoanQuestions
         * @description getLoanQuestions
         * @param ev
         */
        function getLoanQuestions() {
            mrmainstreetFactory.getLoanQuestions()
                .then(function() {
                    setLoanQuestions(mrmainstreetFactory.loanQuestions);
                })
        }

        /**
         * @name logout
         * @description logout
         * @param ev
         */
        vm.logout = function() {
            mrmainstreetFactory.logout();
        }
        /**
         * @name isRememberMe
         * @description isRememberMe
         * @param ev
         */
        vm.setRememberMe = function(isRemember) {
            if (vm.rememberMe == true) {
                $window.localStorage.setItem("isRememberMe", true);

            } else {
                $window.localStorage.removeItem("isRememberMe");
                $window.localStorage.removeItem("rememberMeToken");

            }

        }
        /**
         * @name setRememberMe
         * @description setRememberMe
         * @param ev
         */
        function getRememberMe() {
            if (($window.localStorage.getItem("isRememberMe")) == "true") {
                if ($window.localStorage.getItem("rememberMeToken")) {
                    vm.rememberMe = true;
                    var tokenRememberMe = $base64.decode($window.localStorage.getItem("rememberMeToken"))
                    var splitData = tokenRememberMe.split(":");
                    vm.loginData = {
                        "useremail": splitData[0],
                        "password": splitData[1]
                    }

                }
            }

        }



        /**
         * @name signUp
         * @description signUp
         * @param ev
         */
        function signUp(data) {
            mrmainstreetFactory.userRegistration(data)
                .then(function() {
                    ngDialog.close();
                    $rootScope.loadAmount = "";

                })
        }

        /**
         * @name login
         * @description login
         * @param ev
         */
        vm.login = function(data) {

            mrmainstreetFactory.login(data)
                .then(function() {
                    if (vm.rememberMe == true) {

                        var rememberMeToken = $base64.encode(data.useremail + ":" + data.password);
                        $window.localStorage.setItem("rememberMeToken", rememberMeToken);
                    }
                    ngDialog.close();
                })
        }

        vm.getLoanPurpose();

        /**
         * @description
         */

        if (vm.routeName == "applyNow") {
            vm.questions[0].is_show = true;
            vm.questions[1].is_show = false;
        }
        /**
         * @name nextStep
         * @description Confirm Box
         * @param ev
         */
        vm.nextStep = function(number) {
            if (number <= 7) {

                if (number == 3) {
                    if ((vm.questions[1].value == "3-6 months") || (vm.questions[1].value == "6-12 months")) {
                        vm.questions[number].is_show = false;
                        vm.questions[number + 1].is_show = false;
                        vm.questions[number + 2].is_show = true;
                    } else {
                        vm.questions[number].is_show = false;
                        vm.questions[number + 1].is_show = true;
                    }
                } else {
                    vm.questions[number].is_show = false;
                    vm.questions[number + 1].is_show = true;

                }

            }

            if (number == 8) {
                signUp(vm.user);
            }
            if(number == 7 || number == 6 )
            {
                vm.isShow = false;
            }

        };


        /**
         * @name previousStep
         * @description Confirm Box
         * @param ev
         */
        vm.previousStep = function(number) {

            if (number != 0) {
                if (number == 5) {
                    if ((vm.questions[1].value == "3-6 months") || (vm.questions[1].value == "6-12 months")) {
                       vm.questions[number].is_show = false;
                       vm.questions[number - 1].is_show = false;
                       vm.questions[number - 2].is_show = true;
                    } else {
                        vm.questions[number].is_show = false;
                        vm.questions[number - 1].is_show = true;
                    }
                } else {
                    vm.questions[number].is_show = false;
                    vm.questions[number - 1].is_show = true;
                }


            }

        };

        // function to open popup for Add Patient form
        vm.openQuestionsModel = function openQuestionsModel() {
            vm.isDailog = true;
            $rootScope.loadAmount = vm.loadAmount;
            ngDialog.open({
                template: 'static/website/resources/userQuestions.html',
                scope: $scope,
                width: '50%'
            });
        }

    }


})();