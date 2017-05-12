(function() {
    'use strict';

    /**
     * Reset Password & Change Password Controller
     * Created by: Kapil Chhabra (SIPL)
     * Created On: 12-04-2017
     */

    angular
        .module('mmstreet')
        .controller('RestPasswordCtrl', RestPasswordCtrl)
        .controller('ChangePasswordCtrl', ChangePasswordCtrl);

    //Inject required stuff as parameters to reset password controller function
    RestPasswordCtrl.$inject = ['$scope', '$location'];

    /**
     * @name RestPasswordCtrl
     */
    function RestPasswordCtrl($scope, $location){
        var vm = this;
        vm.reset = reset;
        
        /**
         * @name create
         * @desc New customer form, method call after form submit
         */
        function reset(reset_form) {
            UtilsFactory.successBox('Reset Password', 'We have sent password reset link to your email address, ', function(isSuccess) {
                if (isSuccess) {
                    $location.path('login')
                }
            });
        };
    }

    //Inject required stuff as parameters to change password controller function
    ChangePasswordCtrl.$inject = ['$scope', 'UtilsFactory', '$location'];

    /**
     * @name ChangePasswordCtrl
     */
    function ChangePasswordCtrl($scope, UtilsFactory,$location){
        var vm = this;
        vm.create = create;
        
        //Form validation messages
        vm.validationMsg = {
            required: 'Required',
            invalid: 'Invalid Input'
        }
        function create(isValid){
            if(isValid){
                $location.path('login')
            }
        }
    }

})();