(function() {
    'use strict';
    /**
     * Questions Controller
     * Created by: Kapil Chhabra (SIPL)
     * Created On: 14-04-2017
     */
    angular
        .module('mmstreet')
        .controller('QuestionsListCtrl', QuestionsListCtrl)
    //Inject required stuff as parameters to factories controller function
    QuestionsListCtrl.$inject = ['$scope', 'QuestionsDetailsFactory', 'UtilsFactory','ngDialog','CONST','$location','$state'];
    /**
     * @name QuestionsListCtrl
     * @param $scope
     * @param $uibModal
     * @param QuestionsDetailsFactory
     * @param UtilsFactory
     */
    function QuestionsListCtrl($scope, QuestionsDetailsFactory, UtilsFactory,ngDialog,CONST,$location,$state) {

        //Assign controller scope pointer to a variable
        var vm = this;
        //Methods
        vm.getListing = getListing;
        vm.getQuestionsInfo = getQuestionsInfo;
        vm.closeModel = closeModel;
        vm.buttonAction = "Add";
        $scope.question = {};
        /**
         * @name getListing
         * @desc Retrieve Questions listing from factory
         * @returns {*}
         */
        function getListing() {
            //Call Question details factory get all Questions data
            QuestionsDetailsFactory.getLoanQuestions()
                .then(function() {
                    //Call user details factory get all users data
                    setLoanQuestions(QuestionsDetailsFactory.loanQuestions);

                })
        }
        /**
         * @name setLoanQuestions
         * @desc setLoanQuestions
         * @returns {*}
         */
        function setLoanQuestions(questions) {
            if (questions.length > 0) {
                for (var i = 0; i < questions.length; i++) {
                    questions[i].question_orderDisplay = questions[i].question_order + 1;
                    if (questions[i].categorytype) {
                        if (questions[i].categorytype == "1") {
                            questions[i].categorytypeDisplay = "Non - Startup"
                        } else if (questions[i].categorytype == "2") {
                            questions[i].categorytypeDisplay = "Credit Products";

                        }
                    }
                    if (questions[i].response) {
                        questions[i].responseDisplay = "Yes";
                    } else {
                        questions[i].responseDisplay = "No";
                    }
                    if (questions[i].is_active == true) {
                        questions[i].is_activeDisplay = "Active";
                    } else {
                        questions[i].is_activeDisplay = "InActive";

                    }
                    if (questions[i].question_type == "1") {
                        questions[i].question_typeDisplay = "Open Ended";
                    } else if (questions[i].question_type == "2") {
                        questions[i].question_typeDisplay = "Discrete";
                    } else if (questions[i].question_type == "3") {
                        questions[i].question_typeDisplay = "Ratio";
                    }
                }
                vm.questions = questions;
                vm.mmstreetTableParams = UtilsFactory.mmstreetTableOptions(vm.questions);

            }
        }

        /**
         * @name getQuestionsInfo
         * @desc Get details of selected Question from factory.
         */
        function getQuestionsInfo() {
            //Call questions details factory get factory data
            vm.questionsInfo = QuestionsDetailsFactory.getQuestionsInfo();

            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/manage_questions/info.html',
                size: 'lg',
                scope: $scope
            });
        }
        /**
         * @name closeModal
         * @desc Close pop up
         */
        function closeModel() {
            $scope.modalInstance.dismiss();
        }
        /* Call getListing method to show the questions data list */
        vm.getListing();

        //Form validation messages
        vm.validationMsg = {
            required: 'Required',
            invalid: 'Invalid Input',
            email: 'Invalid Email'
        }


         //manageUpdate questions
        $scope.manageUpdate = function(isValid, data) {
          if (isValid) {
                //Call Question details factory get all Questions update data
                QuestionsDetailsFactory.updateLoanQuestions(data,data.id)
                    .then(function() {
                        //Call user details factory get all users data
                        if(QuestionsDetailsFactory.loanQuestionsResponse)
                        {
                        ngDialog.close();
                        getListing();
                        }

                    })
            }
        }

               //delete questions
        vm.delete = function(data) {
                    ngDialog.openConfirm({
                template: '<div align="center">' +CONST.MSG.CONFIRM_RECORD_DELETE +
                        '<br><br><div align="center"><input type="button" value="No " ng-click="closeThisDialog(0)"/> &nbsp;&nbsp;&nbsp; <input type="button" value="Yes" ng-click="confirm()"/>' +
                        '</div></div>',
                plain: true,
                scope: $scope
            }).then(function (value) {
                 data.is_active = false;
                //Call Question details factory get all Questions update data
                QuestionsDetailsFactory.deleteLoanQuestions(data,data.id)
                    .then(function() {
                        //Call user details factory get all users data
                        if(QuestionsDetailsFactory.loanQuestionsResponse)
                        {
                        ngDialog.close();
                        getListing();
                        }

                    })
            })

        }

        //manage questions
        vm.manage = function(isValid, data) {
            data.question_order = vm.questions.length;
            data.modify_date = "2017-05-04 07:23:37";
            data.is_active = true;

            if (data.question_type == '2') {

            } else {
                data.response = '';

            }
            if (isValid) {
                //Call Question details factory get all Questions data
                QuestionsDetailsFactory.addLoanQuestions(data)
                    .then(function() {
                        //Call user details factory get all users data
                        $state.go('questions.list');

                    })
            }
        }

             // function to open popup for Add Patient form
        vm.openEditModel = function(data) {
            $scope.question = {};
            $scope.question = data;
            ngDialog.open({
                template: '/static/admin/views/manage_questions/updateQuestionView.html',
                scope: $scope,
                width: '100%',
                showClose: false
            });
        }

        //close dailog
        $scope.close = function()
        {
         getListing();
         ngDialog.close();
        }
    }
})();