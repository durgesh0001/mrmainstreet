
/**
 * Associate configurations and constants with angular application
 */
angular
    .module('mrmainstreet')
    .config(configState)
    .config(commonHeaders)
    .constant("CONST", {
        CONFIG: {
            BASE_URL: BASE_PATH,
            GRID_SHOW_LIMIT: 10,
        },
        MSG: {
            COMMON_ERROR: 'Something is wrong. Please try again later.',
            CONFIRM_RECORD_DELETE: 'Are you sure you want to delete this?',
            SUCCESS_RECORD_ADDED: 'Record added successfully.',
            SUCCESS_RECORD_UPDATED: 'Record updated successfully.',
            SUCCESS_RECORD_DELETED: 'Record deleted successfully.',
            ERROR_INVALID_PARAMETERS_GIVEN: 'It seems, you have given invalid parameters.',
            WAITING_DATA_RETRIEVAL: 'Please wait, data is being retrieved.',
            SUCCESS_RESEND_ACTIVATION_EMAIL_SEND : 'Resend activation mail send successfully.',
        },
    })
    .run(['$rootScope', '$state', 'mrmainstreetFactory', '$timeout', 'defaultErrorMessageResolver','ngNotify','$stateParams', function($rootScope, $state, mrmainstreetFactory, $timeout, defaultErrorMessageResolver,ngNotify,$stateParams) {
            ngNotify.config({
    theme: 'pure',
    position: 'bottom',
    duration: 3000,
    type: 'info',
    sticky: false,
    button: true,
    html: false
});
         $rootScope.$state = $state;
         $rootScope.$stateParams = $stateParams;
         $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                /* Check user in session for each Routing */
                mrmainstreetFactory.isSuperadminLoggedIn();

            });


        /* Display common error messages */
        defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
            errorMessages['number'] = "Loan amount is not valid";
            errorMessages['min'] = "Loan amount must be between $5,000 and $5,000,000";
            errorMessages['max'] = "Loan amount must be between $5,000 and $5,000,000";
            errorMessages['brPhoneNumber'] = "Please add valid phone number";
            errorMessages['pattern'] = "Password must contain at least 1 number";
        });
    }])


/**
 * @name configState
 * @desc Set all the routes
 * @param $stateProvider
 * @param $urlRouterProvider
 * @param $compileProvider
 */
function configState($stateProvider,$urlRouterProvider, $compileProvider,$locationProvider) {
    // Optimize load start with remove binding information inside the DOM element
    $compileProvider.debugInfoEnabled(true);
//    $locationProvider.html5Mode(true);

    //RIf user is not logged in, redirect back to website root
    // $urlRouterProvider.when('/', function() {
    //     window.location.href = '/';
    // });

    // Set default state
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "static/website/resources/home.html",
            data: {
                pageTitle: 'Home',
                bodyClasses: ''
            }
        })
           .state('howItWorks', {
            url: "/how-it-works",
            templateUrl: "static/website/resources/how-it-works.html",
            data: {
                pageTitle: 'how-it-works',
                bodyClasses: ''
            }
        })
               .state('login', {
            url: "/login",
            templateUrl: "static/website/resources/login.html",
            data: {
                pageTitle: 'Login',
                bodyClasses: 'login'
            }
        })
                   .state('applyNow', {
            url: "/apply-now",
            templateUrl: "static/website/resources/apply-now.html",
            data: {
                pageTitle: 'apply-now',
                bodyClasses: 'apply-now'
            }
        })

               .state('useDashboard', {
            url: "/user-dashboard",
            templateUrl: "static/website/resources/user-dashboard.html",
            data: {
                pageTitle: 'useDashboard',
                bodyClasses: 'db-container'

            }
        })

                    .state('updateYourApplication', {
            url: "/update-your-application",
            templateUrl: "static/website/resources/update-your-application.html",
            data: {
                pageTitle: 'updateYourApplication',
                bodyClasses: 'db-container'
            }
        })


}

/**
 * @name commonHeaders
 * @desc Set common headers to passed with every angular request
 * @param $httpProvider
 */
function commonHeaders($httpProvider,$base64) {
//dGVzdGluZ0BnbWFpbC5jb210ZXN0
    //Headers to detect ajax request
//    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
       var auth = $base64.encode("admin@admin.com:admin");
        $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + auth;
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

}